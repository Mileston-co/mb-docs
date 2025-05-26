rec---
sidebar_position: 1

---

# 🛠️ Mileston Payment Client SDK

Добро пожаловать в документацию по **Mileston Payment JavaScript/TypeScript Client SDK**! Независимо от того, являетесь ли вы гуру JavaScript или фанатом фреймворков, этот SDK поможет легко интегрировать крипто-платежи. Давайте начнем и создадим что-то крутое! 🚀

---

## 📂 Структура SDK

Mileston Client SDK разделён на следующие разделы:

- **Компоненты**: React-компоненты для быстрой интеграции.
- **Хуки**: React-хуки для получения данных в реальном времени.
- **Функции**: Основные утилиты для работы с платежами.

См. соответствующую документацию для подробного использования.

---

## 📦 Установка

Начните с установки SDK в ваш проект. Откройте терминал и выполните:

```bash
npm install mileston-payment-client
```

Или, если используете Yarn:

```bash
yarn add mileston-payment-client
```

---

## ⚙️ Основной класс (Vanilla JavaScript)

Для тех, кто использует чистый JavaScript, SDK предоставляет класс `MilestonPayButton` для прямой интеграции.

### Пример

```javascript
import { MilestonPayButton } from "mileston-payment-client";

const container = document.getElementById("payment-button-container");

const payButton = new MilestonPayButton(container, {
  buttonText: "Оплатить",
  onPaymentComplete: () => {
    console.log("Платёж завершён!");
  },
  onPaymentDataReceived: (data) => {
    console.log("Данные платежа:", data);
  },
  onPaymentError: (error) => {
    console.error("Ошибка платежа:", error);
  },
  paymentUrl: "https://example.com/payment",
});

// Необязательно: обновить текст или стиль кнопки позже
payButton.updateButtonText("Оформить заказ");
payButton.updateButtonStyle({ backgroundColor: "blue", color: "white" });
```

---

## ⚛️ Интеграция с React

SDK предлагает специальный React-компонент для быстрой интеграции.

### Пример

```jsx
import React from "react";
import { PayButton } from "mileston-payment-client";

function App() {
  return (
    <div>
      <PayButton
        onPaymentComplete={() => console.log("Платёж завершён!")}
        onPaymentDataReceived={(data) => console.log("Данные платежа:", data)}
        onPaymentError={(error) => console.error("Ошибка платежа:", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        style={{ backgroundColor: "green", color: "white" }}
      >
        Оплатить
      </PayButton>
    </div>
  );
}

export default App;
```

---

## Интеграция с Angular

Для проектов на Angular используйте класс `MilestonPayButton` напрямую.

### Пример

```typescript
import { Component } from "@angular/core";
import { MilestonPayButton } from "mileston-payment-client";

@Component({
  selector: "app-root",
  template: `<div id="payment-button-container"></div>`,
})
export class AppComponent {
  ngOnInit() {
    const container = document.getElementById("payment-button-container");

    const payButton = new MilestonPayButton(container, {
      buttonText: "Оплатить",
      onPaymentComplete: () => {
        console.log("Платёж завершён!");
      },
      onPaymentDataReceived: (data) => {
        console.log("Данные платежа:", data);
      },
      onPaymentError: (error) => {
        console.error("Ошибка платежа:", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  }
}
```

---

## Интеграция с Vue

Разработчики на Vue могут интегрировать SDK с помощью класса `MilestonPayButton`.

### Пример

```vue
<template>
  <div id="payment-button-container"></div>
</template>

<script>
import { MilestonPayButton } from "mileston-payment-client";

export default {
  name: "App",
  mounted() {
    const container = this.$el.querySelector("#payment-button-container");

    const payButton = new MilestonPayButton(container, {
      buttonText: "Оплатить",
      onPaymentComplete: () => {
        console.log("Платёж завершён!");
      },
      onPaymentDataReceived: (data) => {
        console.log("Данные платежа:", data);
      },
      onPaymentError: (error) => {
        console.error("Ошибка платежа:", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  },
};
</script>
```

---

## Важный компонент

### Оберните приложение в Payment Provider

Используйте `MilestonPaymentProvider`, чтобы предоставить глобальные данные (API-ключ, business ID) вашему приложению. В `apikey` должен передаваться **Checkout API Key**.

```javascript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="ваш-api-ключ" // Используйте Checkout API Key
      businessid="ваш-business-id"
    >
      <YourComponent />
    </MilestonPaymentProvider>
  );
}
```

---

## Обзор компонентов

### Subscription Checkout

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="Моя компания"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Премиум-план",
    description: "Доступ ко всем премиум-функциям",
    amount: 19.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Платёж через Wallet Connect завершён", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) =>
    console.error("Ошибка Wallet Connect", error)
  }
  amount={19.99}
  recipientWalletAddress="0x123456789abcdef"
/>;
```

---

### Invoice Checkout

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="Моя компания"
  businessLogo="https://example.com/logo.png"
  description="Счёт #12345"
  amount={200}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("Платёж по QR завершён")}
  onQrCodePaymentError={(error) => console.error("Ошибка QR-платежа", error)}
/>;
```

---

### Payment Link Checkout

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="Моя компания"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Запрос на оплату"
  description="Оплатите ваш заказ"
  amount={100}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Платёж картой завершён")}
  onCardPaymentError={(error) => console.error("Ошибка оплаты картой", error)}
/>;
```

---

## 🛠️ Параметры конфигурации

SDK очень гибкий! Вот список опций и props для различных компонентов:

### MilestonPayButton

| **Опция**               | **Тип**                                                 | **Обяз.** | **Описание**                               |
| ----------------------- | ------------------------------------------------------- | --------- | ------------------------------------------ | --- | ------------------------------------------- |
| `container`             | `HTMLElement`                                           | Да        | DOM-элемент для кнопки (только для Core).  |
| `buttonText`            | `string`                                                | Да        | Текст на кнопке.                           |
| `onPaymentComplete`     | `() => void`                                            | Да        | Callback при успешном платеже.             |
| `onPaymentDataReceived` | `(data: { walletAddress: string, id: string }) => void` | Да        | Callback при получении данных платежа.     |
| `onPaymentError`        | `(error: Error) => void`                                | Да        | Callback при ошибке платежа.               |
| `paymentUrl`            | `string`                                                | Нет       | URL страницы оплаты.                       |
| `paymentType`           | `"payment-link"                                         | "invoice" | "recurring-payment"`                       | Нет | Тип платежа (для автогенерации paymentUrl). |
| `paymentId`             | `string`                                                | Нет       | ID платежа (для автогенерации paymentUrl). |
| `buttonStyle`           | `Partial<CSSStyleDeclaration>`                          | Нет       | Стили для кнопки.                          |

### SubscriptionCheckout

| **Prop**                         | **Тип**                                        | **Обяз.** | **Описание**                                |
| -------------------------------- | ---------------------------------------------- | --------- | ------------------------------------------- |
| `businessName`                   | `string`                                       | Да        | Название компании.                          |
| `businessLogo`                   | `string`                                       | Да        | URL логотипа компании.                      |
| `plan`                           | `object`                                       | Да        | Данные тарифного плана.                     |
| `plan.name`                      | `string`                                       | Да        | Название плана.                             |
| `plan.description`               | `string`                                       | Да        | Описание плана.                             |
| `plan.amount`                    | `number`                                       | Да        | Сумма подписки.                             |
| `plan.currency`                  | `string`                                       | Да        | Валюта (например, USD).                     |
| `plan.interval`                  | `string`                                       | Да        | Интервал оплаты (например, monthly).        |
| `plan.intervalCount`             | `number`                                       | Да        | Количество интервалов (например, 2 месяца). |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void` | Нет       | Callback при успешном платеже через Wallet. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                       | Нет       | Callback при ошибке Wallet Connect.         |
| `onQrCodePaymentComplete`        | `() => void`                                   | Нет       | Callback при успешном QR-платеже.           |
| `onQrCodePaymentError`           | `(error: Error) => void`                       | Нет       | Callback при ошибке QR-платежа.             |
| `onCardPaymentComplete`          | `() => void`                                   | Нет       | Callback при успешной оплате картой.        |
| `onCardPaymentError`             | `(error: Error) => void`                       | Нет       | Callback при ошибке оплаты картой.          |
| `amount`                         | `number`                                       | Да        | Сумма подписки.                             |
| `recipientWalletAddress`         | `string`                                       | Да        | Адрес кошелька получателя.                  |
| `paymentLinkId`                  | `string`                                       | Да        | ID платежной ссылки.                        |

---

### InvoiceCheckout

| **Prop**                  | **Тип**                  | **Обяз.** | **Описание**                         |
| ------------------------- | ------------------------ | --------- | ------------------------------------ |
| `businessName`            | `string`                 | Да        | Название компании.                   |
| `businessLogo`            | `string`                 | Да        | URL логотипа компании.               |
| `description`             | `string`                 | Да        | Описание счёта.                      |
| `amount`                  | `number`                 | Да        | Сумма счёта.                         |
| `recipientWalletAddress`  | `string`                 | Да        | Адрес кошелька получателя.           |
| `onQrCodePaymentComplete` | `() => void`             | Нет       | Callback при успешном QR-платеже.    |
| `onQrCodePaymentError`    | `(error: Error) => void` | Нет       | Callback при ошибке QR-платежа.      |
| `onCardPaymentComplete`   | `() => void`             | Нет       | Callback при успешной оплате картой. |
| `onCardPaymentError`      | `(error: Error) => void` | Нет       | Callback при ошибке оплаты картой.   |
| `paymentLinkId`           | `string`                 | Да        | ID платежной ссылки для счёта.       |

---

### PaymentLinkCheckout

| **Prop**                         | **Тип**                                        | **Обяз.** | **Описание**                                |
| -------------------------------- | ---------------------------------------------- | --------- | ------------------------------------------- |
| `businessName`                   | `string`                                       | Да        | Название компании.                          |
| `businessLogo`                   | `string`                                       | Да        | URL логотипа компании.                      |
| `bannerImage`                    | `string`                                       | Нет       | URL баннера для страницы оплаты.            |
| `title`                          | `string`                                       | Да        | Заголовок запроса на оплату.                |
| `description`                    | `string`                                       | Да        | Описание запроса на оплату.                 |
| `amount`                         | `number`                                       | Да        | Сумма платежа.                              |
| `recipientWalletAddress`         | `string`                                       | Да        | Адрес кошелька получателя.                  |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void` | Нет       | Callback при успешном платеже через Wallet. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                       | Нет       | Callback при ошибке Wallet Connect.         |
| `onQrCodePaymentComplete`        | `() => void`                                   | Нет       | Callback при успешном QR-платеже.           |
| `onQrCodePaymentError`           | `(error: Error) => void`                       | Нет       | Callback при ошибке QR-платежа.             |
| `onCardPaymentComplete`          | `() => void`                                   | Нет       | Callback при успешной оплате картой.        |
| `onCardPaymentError`             | `(error: Error) => void`                       | Нет       | Callback при ошибке оплаты картой.          |
| `paymentLinkId`                  | `string`                                       | Да        | ID платежной ссылки.                        |

---

### Обработка ошибок

Всегда добавляйте callbacks ошибок для компонентов оплаты (`onWalletConnectPaymentError`, `onQrCodePaymentError`, `onCardPaymentError`), чтобы корректно обрабатывать неудачные платежи. Это улучшает пользовательский опыт и облегчает отладку.

---

### Интеграция с Backend SDK

Комбинируйте Client SDK с Backend SDK для полноценного платёжного решения.

---

## 🛡️ Частые проблемы

### Ошибки TypeScript

Убедитесь, что ваш `tsconfig.json` содержит:

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### Ошибка JSX

Если возникают ошибки JSX, проверьте, что в `tsconfig.json` есть:

```json
{
  "jsx": "react-jsx"
}
```

---

🎉 Вот и всё! Теперь вы готовы интегрировать **Mileston Payment Client SDK** как профи. Вопросы? Пишите — будем строить крутые вещи вместе! ✨

## Итоги

Вот так просто! С **Mileston Payment Client SDK** интеграция крипто-платежей в ваше приложение становится лёгкой задачей. Если возникнут вопросы или проблемы — обращайтесь. Удачного кодинга и пусть ваши кружки продаются как горячие пирожки! ☕🛒

---

_Примечание: Для подробной информации и ссылок смотрите [репозиторий Mileston Payment Client SDK на GitHub](https://github.com/Mileston-co/mileston-payment-client). SDK с открытым исходным кодом — присылайте свои PR!_
