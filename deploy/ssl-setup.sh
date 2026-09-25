#!/bin/bash
# Получение SSL сертификата Let's Encrypt
# Запускать ПОСЛЕ настройки Nginx и DNS

DOMAIN="asfaltmoscow.ru"
EMAIL="asfaltkamen@gmail.com"

echo "Получение SSL сертификата для $DOMAIN..."

certbot --nginx \
  -d $DOMAIN \
  -d www.$DOMAIN \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  --redirect

echo ""
echo "SSL установлен!"
echo "Автообновление уже настроено через certbot.timer"
echo "Проверка: certbot renew --dry-run"
