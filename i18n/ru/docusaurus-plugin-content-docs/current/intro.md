---
sidebar_position: 1
---

# 🚀 Быстрый старт

Добро пожаловать в **интеграцию Mileston Payments**! 🎉 Мы рады видеть вас среди наших пользователей! Интеграция Mileston Payments — это просто, удобно и открывает вашему приложению мир крипто-платежей. Давайте создадим вашу **первую крипто-платёжную ссылку** всего за несколько шагов!

---

## 🌟 Создайте свою первую крипто-платёжную ссылку

### 📝 Шаг 1: Зарегистрируйтесь

Перейдите на [**business.mileston.co**](https://business.mileston.co) и создайте бизнес-аккаунт Mileston.

Это даст вам доступ к мощному дашборду, где происходит вся магия. ✨

---

### 🔑 Шаг 2: Получите API-ключ

В дашборде перейдите во вкладку **Developers** и сгенерируйте свой **API-ключ**. Вы увидите два типа ключей:

- **Тестовый API-ключ** (для тестовой сети, без реальных денег):  
  `Mileston_TEST_hshshs7y373djdsdj...`
- **Боевой API-ключ** (для основной сети, с реальной ценностью):  
  `Mileston_LIVE_773hsiakakgddh...`

⚠️ **Совет:**

- Используйте **тестовый API-ключ** для разработки и тестирования.
- Используйте **боевой API-ключ** для продакшена и реальных платежей.

---

### 🛠️ Шаг 3: Установите Backend SDK

Установите наш backend SDK, чтобы начать создавать платёжные ссылки как профи. Вот как это сделать:

```bash
npm install mileston-payments
```

Далее напишите такой код:

```javascript
import { PaymentLink } from "mileston-payments";

const apiKey = "your-api-key"; // Ваш API-ключ
const businessId = "your-business-id"; // Ваш Business ID

// Инициализация PaymentLink, Invoice или RecurringPayment
const paymentLink = new PaymentLink(apiKey, businessId);

// Генерация платёжной ссылки
const link = await paymentLink.create({
  amount: 100, // Сумма в нужной валюте
  currency: "USD",
  description: "Crypto Payment Example",
});
console.log("Платёжная ссылка создана:", link);
```

🔍 **Где найти `businessId`?**  
Business ID можно скопировать из выпадающего меню под логотипом бизнеса в дашборде.

---

### ✨ Шаг 4: Используйте платёжную ссылку во фронтенде

Теперь, когда вы создали платёжную ссылку, добавьте её на сайт!

Вы можете:

1. Сделать свою кнопку, или
2. Использовать наш **mileston-payment-client SDK** для быстрой интеграции.

Сначала установите клиентский SDK:

```bash
npm install mileston-payment-client
```

Далее используйте готовую кнопку оплаты:

```jsx
import { PayButton } from "mileston-payment-client";

const App = () => (
  <PayButton
    paymentUrl="https://checkout.mileston.co/payment"
    onPaymentComplete={() => console.log("Платёж завершён!")}
    onPaymentDataReceived={(data) =>
      console.log("Данные платежа получены:", data)
    }
    onPaymentError={(error) => console.error("Ошибка платежа:", error)}
    style={{ backgroundColor: "green", color: "white" }}
  >
    Оплатить
  </PayButton>
);
```

👀 **Почему использовать `PayButton`?**  
Она берёт на себя всё: платёж, верификацию и отличный UX. Вам остаётся только пить кофе. ☕

---

### 🛡️ Шаг 5: Храните API-ключи в безопасности

**Важно:** Всегда используйте backend SDK для работы с API-ключами. Никогда не размещайте ключи во фронтенде — это небезопасно.

---

## Реальные сценарии использования

### Сценарий 1: Управление подписками

**Пример:** SaaS-компания хочет автоматизировать ежемесячные платежи пользователей.

**Пример кода:**

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="SaaS Pro"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Pro Plan",
    description: "Доступ ко всем премиум-функциям",
    amount: 29.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Платёж завершён", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) =>
    console.error("Ошибка платежа", error)
  }
  paymentLinkId="subscription-link-id"
  env="test"
/>;
```

### Сценарий 2: Выставление счетов

**Пример:** Фрилансер отправляет клиенту счёт за выполненный проект.

**Пример кода:**

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="Freelance Studio"
  businessLogo="https://example.com/logo.png"
  description="Счёт #4567 за проект по веб-дизайну"
  amount={500}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("Оплата по QR завершена")}
  onQrCodePaymentError={(error) => console.error("Ошибка оплаты по QR", error)}
  paymentLinkId="invoice-id"
  env="test"
/>;
```

### Сценарий 3: Интеграция платёжной ссылки

**Пример:** Интернет-магазин хочет реализовать удобную оплату заказа.

**Пример кода:**

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="E-Shop"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Оплата заказа"
  description="Оплатите ваш заказ"
  amount={150}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Оплата картой завершена")}
  onCardPaymentError={(error) => console.error("Ошибка оплаты картой", error)}
  paymentLinkId="order-payment-link"
  env="test"
/>;
```

---

## 📂 Репозитории GitHub

Смотрите наши SDK для подробностей и примеров:

- [**mileston-payments (Backend SDK)**](https://github.com/Mileston-co/mileston-payments)
- [**mileston-payment-client (Frontend SDK)**](https://github.com/Mileston-co/mileston-payment-client)

---

🎉 **Поздравляем!**  
Вы только что создали свою первую крипто-платёжную ссылку с Mileston Payments! Дайте пять! 🙌

---

## Нужна помощь?

Если нужна поддержка, присоединяйтесь к нашему Discord: [https://discord.gg/JT3BhUCy](https://discord.gg/JT3BhUCy)
