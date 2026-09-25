#!/bin/bash
# ===========================================
# Asphalt Moscow - Полная установка на VPS
# Ubuntu 20.04 / 22.04 / 24.04
# ===========================================

set -e

# --- НАСТРОЙКИ (ИЗМЕНИТЕ ПОД СЕБЯ) ---
DOMAIN="asfaltmoscow.ru"
EMAIL="asfaltkamen@gmail.com"
APP_DIR="/var/www/asfaltmoscow"
# --------------------------------------

echo "========================================="
echo "  Asphalt Moscow - Установка на VPS"
echo "========================================="

# 1. Обновление системы
echo "[1/8] Обновление системы..."
apt update && apt upgrade -y

# 2. Установка Node.js 20
echo "[2/8] Установка Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g yarn

# 3. Установка Python 3 + pip
echo "[3/8] Установка Python..."
apt install -y python3 python3-pip python3-venv

# 4. Установка MongoDB
echo "[4/8] Установка MongoDB..."
apt install -y gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod

# 5. Установка Nginx + Certbot
echo "[5/8] Установка Nginx и Certbot..."
apt install -y nginx certbot python3-certbot-nginx

# 6. Создание папки проекта
echo "[6/8] Настройка проекта..."
mkdir -p $APP_DIR
echo "Скопируйте папки frontend/ и backend/ в $APP_DIR"
echo "Например: scp -r ./asfaltmoscow-full/* user@server:$APP_DIR/"

# 7. Настройка backend
echo "[7/8] Настройка backend..."
cd $APP_DIR/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
echo "Отредактируйте $APP_DIR/backend/.env - укажите SMTP пароль"
deactivate

# 8. Сборка frontend
echo "[8/8] Сборка frontend..."
cd $APP_DIR/frontend
yarn install
yarn build

echo ""
echo "========================================="
echo "  Установка завершена!"
echo "========================================="
echo ""
echo "Далее:"
echo "1. Скопируйте nginx конфиг:  cp $APP_DIR/deploy/nginx.conf /etc/nginx/sites-available/$DOMAIN"
echo "2. Включите сайт:            ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
echo "3. Удалите дефолт:           rm /etc/nginx/sites-enabled/default"
echo "4. Скопируйте systemd:       cp $APP_DIR/deploy/asfaltmoscow-backend.service /etc/systemd/system/"
echo "5. Запустите backend:         systemctl enable --now asfaltmoscow-backend"
echo "6. Перезапустите nginx:       systemctl restart nginx"
echo "7. Получите SSL:              certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos"
echo ""
