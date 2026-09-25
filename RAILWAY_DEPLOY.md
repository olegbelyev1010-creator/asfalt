# Быстрый деплой на Railway

Для быстрого запуска используйте один сервис из корня репозитория. Корневой `Dockerfile` сначала собирает React, затем запускает FastAPI и раздаёт frontend с того же домена. Поэтому `REACT_APP_BACKEND_URL` и база данных не требуются.

## Быстрый сценарий

1. В Railway выберите **Deploy from GitHub repo**.
2. Выберите репозиторий `olegbelyev1010-creator/asfalt` и ветку `railway-deploy`.
3. Оставьте Root Directory пустым (`/`). Railway использует корневой `Dockerfile` и `railway.json`.
4. Добавьте переменные SMTP в сервис приложения:

## Переменные Railway

В сервис приложения добавьте:

```text
CORS_ORIGINS=*
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=asfaltkamen@gmail.com
SMTP_PASSWORD=<Gmail App Password>
NOTIFY_EMAIL=asfaltkamen@gmail.com
```

5. Нажмите **Deploy** и сгенерируйте публичный домен в настройках сервиса.

После деплоя:

- сайт будет доступен на `https://<railway-domain>/`;
- проверка backend: `https://<railway-domain>/api/`;
- форма отправляет заявки на тот же домен: `/api/contact`.

## Альтернативный вариант

В репозитории также оставлены отдельные конфигурации `frontend/railway.json` и `backend/railway.json`, если понадобится разнести frontend и backend на два Railway-сервиса. Для быстрого старта используйте корневой вариант выше.

Секреты не добавляйте в Git — храните их в Variables Railway.
