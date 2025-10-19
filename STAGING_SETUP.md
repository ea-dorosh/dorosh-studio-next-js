# 🚀 Staging Deployment Setup - Dorosh Studio

## 📋 Overview

Этот Next.js проект настроен для автоматического деплоя на два окружения:

- **Production** (master) → `18.195.52.51` → `moodbeauty.de`
- **Staging** (staging) → `18.156.173.14` → `staging.moodbeauty.de`

---

## 🔐 GitHub Secrets для Staging

Перед первым деплоем на staging нужно добавить следующие secrets в GitHub:

### Для репозитория `dorosh-studio-next-js`:

1. Перейди в **Settings** → **Secrets and variables** → **Actions**
2. Нажми **New repository secret**
3. Добавь следующие secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `STUDIO_EC2_STAGING_HOST` | `18.156.173.14` | IP staging сервера |
| `STUDIO_EC2_STAGING_USER` | `ubuntu` | SSH пользователь |
| `STUDIO_EC2_STAGING_SSH_KEY` | `<твой SSH ключ>` | Приватный SSH ключ для доступа к staging |
| `STUDIO_STAGING_API_URL` | `https://crm-staging.moodbeauty.de/` | API URL для Next.js |

---

## 🌿 Workflow - Как работать с ветками

### 1. Разработка новой фичи:

```bash
# Создай feature ветку
git checkout -b feature/new-design

# Разработка...
git add .
git commit -m "Add new design"
git push origin feature/new-design

# ❌ Деплой НЕ происходит
```

### 2. Тестирование на staging:

```bash
# Переключись на staging
git checkout staging

# Merge твоей feature ветки
git merge feature/new-design

# Push в staging
git push origin staging

# ✅ Автоматический деплой на staging (18.156.173.14)
```

**После деплоя проверь:**
- Next.js Staging: https://staging.moodbeauty.de/

### 3. Релиз в production:

```bash
# После успешного тестирования на staging
git checkout master

# Merge staging в master
git merge staging

# Push в master
git push origin master

# ✅ Автоматический деплой на production (18.195.52.51)
```

---

## ⚙️ Staging конфигурация

### Next.js:
- **PM2 процесс:** `dorosh-studio-staging`
- **Порт:** `3501`
- **ENV переменная:** `REACT_APP_API_URL=https://crm-staging.moodbeauty.de/`
- **Домен:** `staging.moodbeauty.de`
- **Путь:** `/var/www/dorosh-studio`

### Nginx:
- **Config:** `/etc/nginx/sites-available/staging-nextjs`
- Проксирует все запросы на `localhost:3501`
- Кеширует `/_next/static/` и `/public/`

---

## 🔍 Проверка статуса

### На staging сервере (SSH):

```bash
# Подключение
ssh -i ~/.ssh/eu-central-t3.small.pem ubuntu@18.156.173.14

# Проверка PM2 процессов
pm2 list

# Логи Next.js staging
pm2 logs dorosh-studio-staging

# Проверка nginx
sudo nginx -t
sudo systemctl status nginx
```

### Через curl:

```bash
# Проверка Next.js staging
curl https://staging.moodbeauty.de/
```

---

## 🔄 Создание ветки staging (первый раз)

```bash
# В репозитории dorosh-studio-next-js
git checkout master
git pull origin master

# Создай staging ветку
git checkout -b staging

# Push staging ветки в GitHub
git push origin staging

# Установи staging как default для tracking
git branch --set-upstream-to=origin/staging staging
```

---

## 🛠️ Troubleshooting

### Деплой failed?

1. **Проверь GitHub Secrets** - все ли добавлены?
2. **Проверь SSH доступ** к staging серверу
3. **Проверь логи GitHub Actions** - что именно упало?
4. **Проверь PM2 на сервере** - запущен ли процесс?

### Next.js не отвечает?

```bash
ssh -i ~/.ssh/eu-central-t3.small.pem ubuntu@18.156.173.14
pm2 logs dorosh-studio-staging
pm2 restart dorosh-studio-staging

# Проверка порта
curl http://localhost:3501
```

### Nginx показывает 502?

```bash
# Проверь что Next.js запущен
pm2 list | grep dorosh-studio-staging

# Проверь nginx
sudo nginx -t
sudo systemctl reload nginx

# Проверь логи nginx
sudo tail -f /var/log/nginx/error.log
```

---

## 🔗 Зависимости

Next.js staging использует backend API со staging окружения:
- API URL: `https://crm-staging.moodbeauty.de/`

Убедись что backend staging также запущен и работает!

---

## ✅ Checklist перед первым staging деплоем

- [ ] Добавлены все GitHub Secrets
- [ ] Создана ветка `staging`
- [ ] Проверен SSH доступ к staging серверу (18.156.173.14)
- [ ] Nginx конфигурация для staging настроена
- [ ] Security Group открыт для портов 80 и 443
- [ ] Backend staging запущен и отвечает

---

## 🎯 Итого

После настройки:
- Push в `master` → Production (moodbeauty.de)
- Push в `staging` → Staging (staging.moodbeauty.de)
- Push в другие ветки → ничего не происходит

**Happy deploying!** 🚀

