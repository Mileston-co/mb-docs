# Webhooks

---

## Обзор

Webhooks позволяют получать уведомления в реальном времени, когда на платформе Mileston Business происходят определённые события. Вы можете использовать webhooks для автоматизации рабочих процессов, обновления базы данных или запуска других действий в вашем приложении.

Вкладка **Developers** в дашборде Mileston Business предоставляет интерфейс для управления webhooks, включая регистрацию новых, просмотр существующих и их удаление.

---

## Доступ к вкладке Developers

1. Войдите в свой аккаунт Mileston Business.
2. Перейдите во вкладку **Developers** в боковом меню.
3. В разделе **Webhooks** вы найдёте опции для управления webhooks.

---

## Настройка webhooks

### **Шаг 1: Регистрация webhook**

1. Во вкладке **Developers** перейдите в раздел **Webhooks**.
2. Нажмите кнопку **Register Webhook**.
3. Заполните следующие поля:

   - **Endpoint URL**: URL вашего endpoint, куда будут отправляться события.
   - **Verification Token**: Токен для проверки подлинности запросов webhook.
   - **Events**: Выберите события для подписки. Если не выбрано, по умолчанию используются (`invoice-paid`, `paymentlink-paid`, `recurring-paid`).

4. Нажмите **Save** для регистрации webhook.

---

### **Шаг 2: Просмотр зарегистрированных webhooks**

В разделе **Webhooks** вкладки **Developers** отображается список всех зарегистрированных webhooks.

---

### **Шаг 3: Удаление webhook**

1. Найдите нужный webhook в списке зарегистрированных.
2. Нажмите кнопку **Delete** рядом с ним.

---

## События webhook

Поддерживаются следующие события:

- **`invoice-paid`**: Срабатывает при оплате счёта.
- **`paymentlink-paid`**: Срабатывает при оплате платёжной ссылки.
- **`recurring-paid`**: Срабатывает при оплате регулярного платежа.

---

## Payload webhook

Когда событие срабатывает, webhook отправляет `POST`-запрос на ваш endpoint со следующей структурой:

### Пример payload для `paymentlink-paid`

```json
{
  "event": "paymentlink-paid",
  "payload": {
    "paymentLinkId": "id",
    "payer": "0x2.................",
    "recipientWalletAddress": "0x4..............",
    "amount": "1",
    "userUUID": "id",
    "transactionSignature": "0xc................",
    "feeSignature": "0x1....................",
    "chain": "pol",
    "env": "test",
    "status": "paid",
    "createdAt": "2025-05-16T20:38:25.343Z"
  }
}
```

### Описание полей

- **`event`**: Имя сработавшего события (`paymentlink-paid`).
- **`payload`**: Данные, связанные с событием, включая:
  - **`paymentLinkId`**: Уникальный идентификатор платёжной ссылки.
  - **`payer`**: Адрес кошелька плательщика.
  - **`recipientWalletAddress`**: Адрес кошелька получателя.
  - **`amount`**: Сумма платежа.
  - **`userUUID`**: Уникальный идентификатор пользователя, связанного с платёжной ссылкой.
  - **`transactionSignature`**: Подпись транзакции платежа.
  - **`feeSignature`**: Подпись комиссии, связанной с транзакцией.
  - **`chain`**: Блокчейн-сеть, где произошла транзакция (например, `pol` для Polygon).
  - **`env`**: Окружение, в котором произошла транзакция (`test` или `prod`).
  - **`status`**: Статус платежа (например, `paid`).
  - **`createdAt`**: Время создания платежа.

---

## Пример реализации endpoint для приёма webhook

Чтобы получать и обрабатывать события webhook, создайте HTTP endpoint в вашем приложении. Сервис webhook будет отправлять POST-запрос на этот endpoint при каждом срабатывании события, на которое вы подписаны.

### **Проверка подписи webhook**

Каждый запрос webhook содержит заголовок `X-Webhook-Signature`. В нём передаётся verification token, который вы указали при регистрации webhook. Необходимо проверять этот токен в endpoint для подтверждения подлинности запроса.

### **Пример: Node.js/Express Endpoint**

```javascript
const express = require("express");
const app = express();
app.use(express.json());

// Замените на ваш реальный verification token из dashboard
const VERIFICATION_TOKEN = "ваш-verification-token";

app.post("/ваш-webhook-endpoint", (req, res) => {
  const signature = req.headers["x-webhook-signature"];
  if (signature !== VERIFICATION_TOKEN) {
    // Неверный токен, отклонить запрос
    return res.status(401).json({ error: "Неверная подпись webhook" });
  }

  // Обработка события webhook
  const { event, payload } = req.body;
  // ... ваша логика ...

  // Всегда возвращайте 200 OK после успешной обработки
  res.status(200).json({ received: true });
});

app.listen(3000, () => console.log("Webhook endpoint слушает на порту 3000"));
```

**Важно:**

- Всегда проверяйте, что заголовок `X-Webhook-Signature` совпадает с вашим verification token.
- Всегда возвращайте HTTP 200 после успешной обработки webhook. Если вернуть другой статус, webhook будет отправлен повторно.
- Убедитесь, что ваш endpoint доступен из интернета.

## Поддержка

Если у вас возникли вопросы или проблемы, присоединяйтесь к нашему Discord-сообществу: https://discord.gg/JT3BhUCy
