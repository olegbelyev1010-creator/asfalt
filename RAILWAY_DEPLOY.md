# Деплой на Railway

Проект состоит из двух изолированных Railway-сервисов: `frontend` и `backend`.

## 1. Создайте сервисы

Подключите GitHub-репозиторий `olegbelyev1010-creator/asfalt` к Railway два раза:

- Frontend: Root Directory `/frontend`
- Backend: Root Directory `/backend`

Railway найдёт `railway.json` в каждой папке. Если конфигурация не подхватилась автоматически, укажите вручную команды:

- Frontend build: `yarn build`
- Frontend start: `yarn railway:start`
- Backend start: `uvicorn server:app --host 0.0.0.0 --port $PORT`

## 2. Backend variables

В Backend добавьте:

```text
MONGO_URL=<MongoDB connection string>
DB_NAME=asfaltmoscow
CORS_ORIGINS=https://<frontend-domain>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=asfaltkamen@gmail.com
SMTP_PASSWORD=<Gmail App Password>
NOTIFY_EMAIL=asfaltkamen@gmail.com
```

MongoDB можно подключить отдельным сервисом/плагином Railway или использовать внешний MongoDB Atlas. Секреты не добавляйте в Git.

## 3. Frontend variables

После генерации публичного домена Backend добавьте во Frontend переменную:

```text
REACT_APP_BACKEND_URL=https://<backend-domain>
```

Она нужна во время сборки React-приложения. После изменения переменной выполните redeploy Frontend.

## 4. Проверка

- Backend healthcheck: `https://<backend-domain>/api/`
- Frontend: `https://<frontend-domain>/`
- В форме заявки проверьте отправку после настройки MongoDB и SMTP.

Railway использует Root Directory для отдельных сервисов monorepo: https://docs.railway.com/deployments/monorepo
