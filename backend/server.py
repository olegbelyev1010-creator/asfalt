from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


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

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    email_sent = send_email_notification(contact)

    if not email_sent:
        raise HTTPException(
            status_code=503,
            detail="Не удалось отправить заявку. Попробуйте ещё раз позже."
        )

    logger.info(f"Contact request emailed: {contact.name} / {contact.phone}")

    return ContactResponse(
        success=True,
        message="Заявка принята! Мы свяжемся с вами в ближайшее время."
    )

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# In the Railway single-service deployment the React build is copied next to
# this package and served from the same origin as the API. During local backend
# development the build may not exist, so the API still starts normally.
FRONTEND_BUILD_DIR = ROOT_DIR.parent / "frontend" / "build"
if FRONTEND_BUILD_DIR.is_dir():
    app.mount("/", StaticFiles(directory=FRONTEND_BUILD_DIR, html=True), name="frontend")
