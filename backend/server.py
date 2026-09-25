from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import json
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
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


def send_telegram_notification(contact: ContactRequest):
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '').strip()

    if not bot_token or not chat_id:
        logger.warning("Telegram not configured (missing token or chat id).")
        return False

    text = f"""Новая заявка с сайта asfaltmoscow!

Имя: {contact.name}
Телефон: {contact.phone}
Email: {contact.email or 'не указан'}
Сообщение: {contact.message or 'не указано'}

Дата: {datetime.now(timezone.utc).strftime('%d.%m.%Y %H:%M')} UTC"""

    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
    }).encode('utf-8')
    request = Request(
        f"https://api.telegram.org/bot{bot_token}/sendMessage",
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST',
    )

    try:
        with urlopen(request, timeout=15) as response:
            result = json.loads(response.read().decode('utf-8'))
        if not result.get('ok'):
            logger.error("Telegram send failed: API returned an error")
            return False
        logger.info("Telegram notification sent")
        return True
    except (HTTPError, URLError, TimeoutError, OSError, json.JSONDecodeError) as error:
        logger.error(f"Telegram send failed: {error}")
        return False


# --- Routes ---

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    telegram_sent = send_telegram_notification(contact)

    if not telegram_sent:
        raise HTTPException(
            status_code=503,
            detail="Не удалось отправить заявку в Telegram. Проверьте настройки бота."
        )

    logger.info(f"Contact request delivered to Telegram: {contact.name} / {contact.phone}")

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
