---
sidebar_position: 2
---

# Документация по Backend SDK

Добро пожаловать в **Mileston Payments JavaScript/TypeScript Backend SDK** — ваш универсальный инструмент для управления платёжными ссылками, выплатами, счетами и регулярными платежами! Хотите ли вы создать простую систему оплаты или полноценное решение для управления платежами — мы поможем вам с удобным, безопасным и лёгким SDK для разработчиков.

---

## 🚀 Возможности

- **Создание и управление платёжными ссылками:** Позвольте вашим клиентам платить с лёгкостью!
- **Выплаты:** Переводите средства напрямую на кошельки получателей.
- **Создание и обновление счетов:** От выставления счетов клиентам до напоминаний — держите платежи под контролем.
- **Регулярные платежи:** Автоматизируйте ежемесячные, еженедельные или даже ежедневные платежи как профессионал.
- **Безопасность и надёжность:** Спите спокойно, зная, что ваши платежи в безопасности.
- **Удобство для разработчиков:** Просто, интуитивно и работает "из коробки".

---

## 🛠️ Установка

Для начала установите SDK с помощью `npm`:

```bash
npm install mileston-payments
```

---

## 🏁 Быстрый старт

Импортируйте SDK и инициализируйте его с помощью **API-ключа** и **ID бизнеса**.

```typescript
import {
  PaymentLink,
  PayoutAPI,
  Invoice,
  RecurringPayment,
} from "mileston-payments";

const apiKey = "your-api-key"; // Get this from your dashboard
const businessId = "your-business-id"; // Get this from the modal that pops when you click your profile

const paymentLink = new PaymentLink(apiKey, businessId);
const payout = new PayoutAPI(apiKey, businessId);
const invoice = new Invoice(apiKey, businessId);
const recurringPayment = new RecurringPayment(apiKey, businessId);
```

---

## 🔥 Примеры использования

### 🧾 1. **Создание платёжной ссылки**

Нужен быстрый способ собрать платежи? Платёжные ссылки приходят на помощь!

```javascript
const createPaymentPayload = {
  amount: "100.00",
  description: "Purchase of premium subscription",
  customerEmail: "customer@example.com",
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log("Payment Link:", paymentLinkResponse.paymentLink);
// Output: https://checkout.mileston.co/payment-link/ahddjdjdjd8848bc123
```

Представьте, что вы отправляете эту ссылку по электронной почте или встраиваете её на свой сайт. Здорово, правда? 😌

---

### 💸 2. **Отправка выплаты**

Отправляйте платежи напрямую получателям.

```typescript
const sendPayoutPayload = {
  amount: "100.00",
  recipientAddress: "0xRecipientWalletAddress",
  walletType: "eth", // Supported wallet types: "sui", "eth", "avax", "pol", "base", "arb"
  secretPhrase: "optional-secret-phrase", // Optional: Use for wallets with copied secrets
};

const payoutResponse = await payout.sendPayment(sendPayoutPayload);
console.log("Payout Response:", payoutResponse);
// Output: { statusCode: 200, message: "Payout successful" }
```

#### Поддерживаемые типы кошельков для выплат

- **`sui`**: Кошелёк блокчейна Sui.
- **`eth`**: Кошелёк Ethereum.
- **`avax`**: Кошелёк Avalanche.
- **`pol`**: Кошелёк Polygon.
- **`base`**: Кошелёк блокчейна Base.
- **`arb`**: Кошелёк Arbitrum.

#### Необязательное поле: `secretPhrase`

- **`secretPhrase`**: Используйте это поле, если кошелёк получателя требует секретную фразу для транзакций. Это необязательно и нужно только для кошельков с скопированными секретами.

---

### 📜 3. **Создание счёта**

Потому что важно выглядеть профессионально!

```javascript
const createInvoicePayload = {
  amount: "200.00",
  itemName: "Service Fee",
  customerEmail: "client@example.com",
  dueDate: new Date(),
  addPdf: true, // Include a PDF version of the invoice
};

const businessName = "Acme Corporation"; // Your business name

const invoiceResponse = await invoice.create(
  businessName,
  createInvoicePayload
);
console.log("Invoice Link:", invoiceResponse.invoiceLink);
// Output: https://checkout.mileston.co/invoice/ahddjdjdjd8848bc123
```

Счета никогда не были такими элегантными! Ваши пользователи автоматически получают электронные письма, как только вы создаёте счёт. Кто бы мог подумать, что вы можете выглядеть круто, преследуя платежи? 😎

---

### 🔄 4. **Обработка регулярных платежей**

Настройте один раз и забудьте! Автоматизируйте платежи по подписке без усилий.

```javascript
const createRecurringPaymentPayload = {
  amount: "50.00",
  subscriberFullName: "John Doe",
  subscriberEmail: "john.doe@example.com",
  recurringDate: new Date("2025-01-01"),
  recurringInterval: 30, // Days between payments
  addPdf: true, // Include a PDF version of the recurring payment details
};

const recurringPaymentResponse = await recurringPayment.create(
  businessName,
  createRecurringPaymentPayload
);
console.log("Recurring Payment Created:", recurringPaymentResponse);
// Output: https://checkout.mileston.co/recurring-payment/ahddjdjdjd8848bc123
```

Ваши пользователи автоматически получают электронное письмо с просьбой оплатить и последующее письмо, когда их подписка подлежит оплате! Джон не пропустит ни одного платежа, и вы тоже! 💸

---

### 🛠️ 5. **Обновление платёжной ссылки**

Изменил ли клиент своё мнение? Не проблема — обновите платёжную ссылку на лету.

```javascript
const updatePayload = {
  amount: "120.00",
  description: "Updated subscription fee",
};

const updatedPaymentLink = await paymentLink.update(
  "paymentLinkId",
  updatePayload
);
console.log("Updated Payment Link:", updatedPaymentLink);
// Output: { id: 'pl123', amount: '120.00', description: 'Updated subscription fee' }
```

Вы полностью контролируете ситуацию — больше никаких моментов "Ой!"

---

### 🛠️ 6. **Обновление счёта**

Нужно внести изменения в счёт? Не проблема — обновите его легко.

```javascript
const updateInvoicePayload = {
  amount: "250.00",
  itemName: "Updated Service Fee",
  dueDate: new Date("2025-01-15"),
};

const updatedInvoice = await invoice.update("invoiceId", updateInvoicePayload);
console.log("Updated Invoice:", updatedInvoice);
// Output: { id: 'inv123', amount: '250.00', itemName: 'Updated Service Fee', dueDate: '2025-01-15' }
```

---

### 🛠️ 7. **Получение счёта**

Получите данные о конкретном счёте.

```javascript
const invoiceData = await invoice.get("invoiceId");
console.log("Invoice Data:", invoiceData);
// Output: { id: 'inv123', amount: '200.00', itemName: 'Service Fee', ... }
```

---

### 🛠️ 8. **Удаление счёта**

Удалите счёт, когда он больше не нужен.

```javascript
await invoice.delete("invoiceId");
console.log("Invoice deleted.");
```

---

### 🛠️ 9. **Обновление регулярного платежа**

Измените данные существующего регулярного платежа.

```javascript
const updateRecurringPaymentPayload = {
  amount: "60.00",
  recurringInterval: 15, // Update interval to 15 days
};

const updatedRecurringPayment = await recurringPayment.update(
  "recurringPaymentId",
  updateRecurringPaymentPayload
);
console.log("Updated Recurring Payment:", updatedRecurringPayment);
// Output: { id: 'rp123', amount: '60.00', recurringInterval: 15, ... }
```

---

### 🛠️ 10. **Получение регулярного платежа**

Получите данные о конкретном регулярном платеже.

```javascript
const recurringPaymentData = await recurringPayment.get("recurringPaymentId");
console.log("Recurring Payment Data:", recurringPaymentData);
// Output: { id: 'rp123', amount: '50.00', recurringInterval: 30, ... }
```

---

### 🛠️ 11. **Удаление регулярного платежа**

Отмените регулярный платёж, когда он больше не нужен.

```javascript
await recurringPayment.delete("recurringPaymentId");
console.log("Recurring payment deleted.");
```

---

### 💥 Бонус: Получение и удаление данных

- **Получить платёжную ссылку:**

```javascript
const paymentData = await paymentLink.get("paymentLinkId");
console.log(paymentData);
```

- **Удалить платёжную ссылку:**

```javascript
await paymentLink.delete("paymentLinkId");
console.log("Payment link deleted.");
```

- Аналогичные методы существуют для счетов и регулярных платежей. Вперёд, на радость! 🎉

---

## 🌟 Пример из реальной жизни

Вы можете посмотреть, как это приложение [https://sui-invoice.vercel.app/](https://sui-invoice.vercel.app/) использует Mileston для управления счетами фрилансеров.

## 📚 Справочник API

### **`PaymentLink` Class**

- **`create(payload: CreatePaymentLinkPayload): Promise<CreatePaymentLinkResponse>`**  
  Создать новую платёжную ссылку.
- **`update(id: string, payload: UpdatePaymentLinkPayload): Promise<UpdatePaymentLinkResponse>`**  
  Обновить существующую платёжную ссылку.
- **`get(id: string): Promise<UpdatePaymentLinkResponse>`**  
  Получить данные о конкретной платёжной ссылке.
- **`delete(id: string): Promise<DeletePaymentLinkResponse>`**  
  Удалить платёжную ссылку.

### **`PayoutAPI` Class**

- **`sendPayment(payload: SendPayoutRequest): Promise<SendPayoutResponse>`**  
  Отправить выплату получателю.

### **`Invoice` Class**

- Аналогичные методы для создания, обновления, получения и удаления счетов.

### **`RecurringPayment` Class**

- **`create(payload: CreateRecurringPaymentPayload): Promise<CreateRecurringPaymentResponse>`**  
  Настроить регулярный платёж.
- **`update(id: string, payload: UpdateRecurringPaymentPayload): Promise<UpdateRecurringPaymentResponse>`**  
  Обновить данные регулярного платежа.
- **`getAll(): Promise<GetAllRecurringPaymentResponse>`**  
  Получить все активные регулярные платежи.

---

## 🛡️ Полезные советы

- **Защитите свой API-ключ!** Не встраивайте его в код — используйте переменные окружения.
- **Обработка ошибок:** Оборачивайте все вызовы в блоки try-catch для более плавной работы.

---

## 🤝 Участие в разработке

Есть идеи, как сделать этот SDK лучше? Форкайте репозиторий, отправляйте пулл-запросы, и давайте сделаем этот инструмент ещё более удивительным вместе.

---

## 🎉 Начните сейчас!

Скажите "прощай" хаосу платежей и "привет" упрощённому успеху. Установите SDK, напишите немного кода и смотрите, как происходит магия. ✨

```bash
npm install mileston-payments
```

Что же вы ждёте? Создайте что-то удивительное! 🚀
