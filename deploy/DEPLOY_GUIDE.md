# =============================================
# Asphalt Moscow - Инструкция деплоя на VPS
# =============================================

## Требования
- VPS с Ubuntu 20.04/22.04/24.04 (минимум 1 ГБ RAM)
- Домен (например asfaltmoscow.ru)
- DNS записи направлены на IP сервера

## Рекомендуемые VPS хостинги
- Timeweb Cloud — от 199 руб/мес
- Selectel — от 300 руб/мес
- reg.ru VPS — от 250 руб/мес

---

## Шаг 1: Настройка DNS

В панели управления доменом добавьте:
```
A    asfaltmoscow.ru      → IP_вашего_сервера
A    www.asfaltmoscow.ru  → IP_вашего_сервера
```

---

## Шаг 2: Подключение к серверу

```bash
ssh root@IP_вашего_сервера
```

---

## Шаг 3: Загрузка проекта на сервер

С вашего компьютера:
```bash
scp asfaltmoscow-full.tar.gz root@IP_сервера:/root/
```

На сервере:
```bash
tar -xzf /root/asfaltmoscow-full.tar.gz
mkdir -p /var/www/asfaltmoscow
cp -r /root/asfaltmoscow-full/* /var/www/asfaltmoscow/
```

---

## Шаг 4: Автоматическая установка

```bash
chmod +x /var/www/asfaltmoscow/deploy/install.sh
bash /var/www/asfaltmoscow/deploy/install.sh
```

Скрипт установит: Node.js, Python, MongoDB, Nginx, Certbot

---

## Шаг 5: Настройка backend

```bash
cd /var/www/asfaltmoscow/backend
cp /var/www/asfaltmoscow/deploy/.env.production .env
nano .env
```

Укажите ваш SMTP_PASSWORD (App Password от Gmail)

---

## Шаг 6: Настройка Nginx

```bash
cp /var/www/asfaltmoscow/deploy/nginx.conf /etc/nginx/sites-available/asfaltmoscow.ru
ln -s /etc/nginx/sites-available/asfaltmoscow.ru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

---

## Шаг 7: Запуск backend

```bash
cp /var/www/asfaltmoscow/deploy/asfaltmoscow-backend.service /etc/systemd/system/
chown -R www-data:www-data /var/www/asfaltmoscow
systemctl daemon-reload
systemctl enable --now asfaltmoscow-backend
systemctl status asfaltmoscow-backend
```

---

## Шаг 8: SSL сертификат (HTTPS)

```bash
chmod +x /var/www/asfaltmoscow/deploy/ssl-setup.sh
bash /var/www/asfaltmoscow/deploy/ssl-setup.sh
```

---

## Шаг 9: Проверка

Откройте в браузере: https://asfaltmoscow.ru

---

## Полезные команды

```bash
# Статус backend
systemctl status asfaltmoscow-backend

# Логи backend
journalctl -u asfaltmoscow-backend -f

# Перезапуск backend
systemctl restart asfaltmoscow-backend

# Перезапуск nginx
systemctl restart nginx

# Логи nginx
tail -f /var/log/nginx/asfaltmoscow.error.log

# Статус MongoDB
systemctl status mongod

# Обновление SSL
certbot renew --dry-run
```

---

## Обновление сайта

```bash
cd /var/www/asfaltmoscow/frontend
yarn build
systemctl restart asfaltmoscow-backend
```
