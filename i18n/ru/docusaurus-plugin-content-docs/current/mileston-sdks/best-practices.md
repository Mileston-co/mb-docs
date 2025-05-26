---
sidebar_position: 2
---

# Лучшие практики

**SDK Mileston Payments** созданы для того, чтобы интеграция платежей была простой, безопасной и удобной для разработчиков. Следуя этим рекомендациям, вы обеспечите эффективное использование как **Client SDK**, так и **Backend SDK**, сохраняя высокий уровень безопасности и качества разработки.

---

## 🚀 Почему использовать оба SDK?

### Frontend + Backend = Бесшовная интеграция

Комбинируя **Mileston Client SDK** для пользовательских платежных сценариев и **Backend SDK** для безопасных серверных операций, вы создаёте надёжное и гибкое платежное решение. Генерация платежных ссылок, выставление счетов, обработка рекуррентных платежей — эти SDK отлично работают вместе.

Например:

- Используйте **Client SDK** для отображения платежных ссылок, форм или статусов пользователям.
- Используйте **Backend SDK** для безопасной генерации и управления платежными ссылками, счетами и рекуррентными настройками.

---

## ⚙️ Пример рабочего процесса: объединение SDK для платежного сценария

### Шаг 1: Генерация платежной ссылки на бэкенде

Используйте **Backend SDK** для генерации безопасной платежной ссылки.

```typescript
import { PaymentLink } from "mileston-payments";

const apiKey = process.env.MILESTON_API_KEY; // Никогда не хардкодьте ключи!
const businessId = process.env.BUSINESS_ID;

const paymentLink = new PaymentLink(apiKey, businessId);

const createPaymentPayload = {
  amount: "100.00",
  description: "Premium Subscription",
  customerEmail: "user@example.com",
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log("Payment Link:", paymentLinkResponse.paymentLink);
```

### Шаг 2: Использование платежной ссылки на фронтенде

Передайте сгенерированную ссылку на фронтенд. С помощью **Client SDK** вы можете упростить пользовательский опыт, встроив или отобразив ссылку.

```javascript
import React from "react";
import { PayButton } from "mileston-payment-client";

const paymentLink = "https://checkout.mileston.co/payment"; // Ссылка сгенерирована на бэкенде

<PayButton
  onPaymentComplete={() => console.log("Платёж завершён!")}
  onPaymentDataReceived={(data) => console.log("Данные платежа:", data)}
  onPaymentError={(error) => console.error("Ошибка платежа:", error)}
  paymentUrl={paymentLink}
  style={{ backgroundColor: "green", color: "white" }}
>
  Оплатить
</PayButton>;
```

---

## 🛡️ Рекомендации по безопасности

1. **Храните API-ключи в безопасности**

   - Используйте переменные окружения (`process.env`) для хранения ключей и секретов.
   - Используйте сервисы управления секретами (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault).
   - 🚫 **Никогда не хардкодьте ключи или секреты в коде!**

2. **Ограничивайте доступ API-ключей**

   - Минимизируйте права ключей.
   - Для клиентских интеграций используйте **Checkout API Key** с ограниченными правами.
   - Регулярно меняйте ключи для снижения риска компрометации.

3. **Используйте HTTPS**

   - Всегда обеспечивайте защищённое соединение между клиентом, сервером и API Mileston.

4. **Токенизация чувствительных данных**
   - Не передавайте чувствительные пользовательские или платёжные данные напрямую. Используйте токены, предоставляемые API Mileston.

---

## 📦 Реальный кейс: интеграция с платежной панелью

Mileston также предлагает **Business Dashboard** для ручного создания и управления платежными ссылками. Эти ссылки можно напрямую использовать в **Client SDK** для интеграции в приложение без серверной логики.

**Пример: использование ссылки, сгенерированной в Dashboard**

```javascript
import { MilestonClient } from "mileston-client-sdk";

const dashboardGeneratedLink = "https://checkout.mileston.co/payment";

<PayButton
  onPaymentComplete={() => console.log("Платёж завершён!")}
  onPaymentDataReceived={(data) => console.log("Данные платежа:", data)}
  onPaymentError={(error) => console.error("Ошибка платежа:", error)}
  paymentUrl={dashboardGeneratedLink}
  style={{ backgroundColor: "green", color: "white" }}
>
  Оплатить
</PayButton>;
```

---

## 🧠 Продвинутый пример: рекуррентные платежи

### Бэкенд: создание рекуррентного платежа

```typescript
import { RecurringPayment } from "mileston-payments";

const recurringPayment = new RecurringPayment(apiKey, businessId);

const recurringPayload = {
  amount: "50.00",
  subscriberFullName: "John Doe",
  subscriberEmail: "john.doe@example.com",
  recurringDate: new Date("2025-02-01"),
  recurringInterval: 30,
};

const recurringResponse = await recurringPayment.create(
  "Acme Corp",
  recurringPayload
);
console.log("Recurring Payment Created:", recurringResponse);
```

### Фронтенд: уведомление пользователя

```javascript
const subscriptionDetails = {
  amount: "50.00",
  nextPaymentDate: "2025-02-01",
};

console.log(
  `Привет, John! Ваш следующий платёж на $${subscriptionDetails.amount} будет списан ${subscriptionDetails.nextPaymentDate}.`
);
```

---

## 🏆 Советы для разработчиков

1. **Тестируйте в песочнице**
   - Всегда тестируйте интеграцию в sandbox-режиме до выхода в продакшн.
2. **Логируйте ответы для отладки**
   - Логируйте ответы API на сервере (без чувствительных данных!) для быстрой отладки.
3. **Документация — ваш друг**
   - Используйте [документацию Mileston API](https://docs.mileston.co) для подробных справок и кейсов.
4. **Модульность**
   - Держите платёжную логику модульной для удобства масштабирования и обновлений.

---

## 💡 Заключение

Использование **Mileston SDK** — это новый уровень для бизнеса, стремящегося упростить приём платежей. Независимо от того, работаете ли вы в одиночку или в команде, интеграция фронтенд- и бэкенд-SDK обеспечивает бесшовный, безопасный и удобный опыт.

Удачного кодинга! 🚀

---
