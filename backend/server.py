from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# --- Models ---

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactRequest(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    message: Optional[str] = ""

class ContactResponse(BaseModel):
    success: bool
    message: str


# --- Email helper ---

def send_email_notification(contact: ContactRequest):
    smtp_host = os.environ.get('SMTP_HOST', '')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    notify_email = os.environ.get('NOTIFY_EMAIL', '')

    if not smtp_password or not smtp_user:
        logger.warning("SMTP not configured (no password). Email not sent.")
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = notify_email
        msg['Subject'] = f"Новая заявка с сайта от {contact.name}"

        body = f"""Новая заявка с сайта asfaltmoscow!

Имя: {contact.name}
Телефон: {contact.phone}
Email: {contact.email or 'не указан'}
Сообщение: {contact.message or 'не указано'}

Дата: {datetime.now(timezone.utc).strftime('%d.%m.%Y %H:%M')} UTC
"""
        msg.attach(MIMEText(body, 'plain', 'utf-8'))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)

        logger.info(f"Email sent to {notify_email}")
        return True
    except Exception as e:
        logger.error(f"Email send failed: {e}")
        return False


# --- Routes ---

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "name": contact.name,
        "phone": contact.phone,
        "email": contact.email or "",
        "message": contact.message or "",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "email_sent": False
    }

    await db.contact_requests.insert_one(doc)
    logger.info(f"Contact request saved: {contact.name} / {contact.phone}")

    email_sent = send_email_notification(contact)

    if email_sent:
        await db.contact_requests.update_one(
            {"id": doc["id"]},
            {"$set": {"email_sent": True}}
        )

    return ContactResponse(
        success=True,
        message="Заявка принята! Мы свяжемся с вами в ближайшее время."
    )

@api_router.get("/contacts", response_model=list)
async def get_contacts():
    contacts = await db.contact_requests.find({}, {"_id": 0}).to_list(1000)
    return contacts


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
