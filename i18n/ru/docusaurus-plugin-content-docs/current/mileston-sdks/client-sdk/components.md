---
sidebar_position: 2
---

# Документация по компонентам

В этом документе представлен подробный обзор React-компонентов, доступных в клиентском SDK Mileston Payment. **Примечание:** Все компоненты требуют, чтобы `MilestonPaymentProvider` предоставлял через контекст `apikey (checkout api key)` и `businessid`.

---

## MilestonPaymentProvider

Контекстный провайдер React для управления API-ключом и идентификатором бизнеса. Этот провайдер необходим для оборачивания дерева компонентов, чтобы предоставить необходимый контекст другим компонентам SDK.

### Использование

```typescript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider apikey="ваш-api-ключ" businessid="ваш-business-id">
      {/* Ваши компоненты приложения */}
    </MilestonPaymentProvider>
  );
}
```

### Свойства

| Имя свойства | Тип       | Описание                                                  |
| ------------ | --------- | --------------------------------------------------------- |
| `apikey`     | string    | Ваш API-ключ для аутентификации.                          |
| `businessid` | string    | Идентификатор вашего бизнеса.                             |
| `children`   | ReactNode | Дочерние компоненты, которые будут использовать контекст. |

### Примечания

- Убедитесь, что этот провайдер оборачивает всё приложение или компоненты, которым нужен доступ к `apikey` и `businessid`.
- Провайдер обязателен для таких компонентов, как `PayButton`, `InvoiceCheckout`, `SubscriptionCheckout` и др.

---

## PayButton

React-компонент для инициации платежей. Предоставляет настраиваемую кнопку, открывающую всплывающее окно для обработки платежа.

### Использование

```typescript
import { MilestonPaymentProvider, PayButton } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider apikey="ваш-api-ключ" businessid="ваш-business-id">
      <PayButton
        onPaymentComplete={() => console.log("Платёж завершён!")}
        onPaymentError={(error) => console.error("Ошибка платежа:", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        paymentId="payment-id"
        paymentType="invoice"
        theme="light"
        style={{ backgroundColor: "green", color: "white" }}
        className="custom-class"
      >
        Оплатить
      </PayButton>
    </MilestonPaymentProvider>
  );
}
```

### Свойства

| Имя свойства        | Тип       | Описание                                                        |
| ------------------- | --------- | --------------------------------------------------------------- |
| `onPaymentComplete` | function  | Колбэк, вызываемый при успешном завершении платежа.             |
| `onPaymentError`    | function  | Колбэк, вызываемый при ошибке платежа.                          |
| `paymentUrl`        | string    | URL страницы оплаты.                                            |
| `paymentId`         | string    | Идентификатор платежа (например, счёт, платёжная ссылка).       |
| `paymentType`       | string    | Тип платежа (например, "invoice", "payment-link", "recurring"). |
| `theme`             | string    | Тема всплывающего окна оплаты (например, "light", "dark").      |
| `style`             | object    | Пользовательские стили для кнопки.                              |
| `className`         | string    | CSS-класс для кнопки.                                           |
| `children`          | ReactNode | Содержимое кнопки (например, "Оплатить").                       |

### Примечания

- Убедитесь, что `MilestonPaymentProvider` оборачивает дерево компонентов для предоставления контекста.
- Настраивайте внешний вид кнопки с помощью свойств `style` и `className`.
- Свойство `theme` позволяет выбрать визуальную тему всплывающего окна.

---

## SubscriptionCheckout

React-компонент для подписочных платежей. Упрощает настройку регулярных платежей.

### Использование

```typescript
import {
  MilestonPaymentProvider,
  SubscriptionCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="ваш-api-ключ" businessid="ваш-business-id">
  <SubscriptionCheckout
    businessName="Мой бизнес"
    businessLogo="https://example.com/logo.png"
    plan={{
      name: "Премиум-план",
      description: "Доступ ко всем премиум-функциям",
      amount: 19.99,
      currency: "USD",
      interval: "monthly",
      intervalCount: 1,
    }}
    walletConnectButtonText="Подписаться через кошелёк"
    qrCodeButtonText="Сгенерировать QR для подписки"
    cardButtonText="Подписаться с помощью карты"
    buttonClassName="custom-button-class"
    dialogTitle="Подписка по карте"
    dialogDescription="Настройте регулярный платёж через защищённую форму"
    className="custom-class"
    footerText="Спасибо за подписку!"
    cancelText="Вы можете отменить подписку в любое время"
    paymentLinkId="subscription123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Платёж по подписке через кошелёк завершён")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Ошибка подписки через кошелёк:", error)
    }
    onQrCodePaymentComplete={() =>
      console.log("Платёж по подписке через QR завершён")
    }
    onQrCodePaymentError={(error) =>
      console.error("Ошибка подписки через QR:", error)
    }
    onCardPaymentComplete={() =>
      console.log("Платёж по подписке через карту завершён")
    }
    onCardPaymentError={(error) =>
      console.error("Ошибка подписки через карту:", error)
    }
    amount={19.99}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Свойства

| Имя свойства                     | Тип      | Описание                                                           |
| -------------------------------- | -------- | ------------------------------------------------------------------ |
| `businessName`                   | string   | Название бизнеса.                                                  |
| `businessLogo`                   | string   | URL логотипа бизнеса.                                              |
| `plan`                           | object   | Детали подписочного плана.                                         |
| `plan.name`                      | string   | Название плана.                                                    |
| `plan.description`               | string   | Описание плана.                                                    |
| `plan.amount`                    | number   | Сумма подписки.                                                    |
| `plan.currency`                  | string   | Валюта (например, USD, EUR).                                       |
| `plan.interval`                  | string   | Интервал списания (например, daily, weekly, monthly, yearly).      |
| `plan.intervalCount`             | number   | Количество интервалов между списаниями (например, 1 — ежемесячно). |
| `walletConnectButtonText`        | string   | Текст для кнопки Wallet Connect.                                   |
| `qrCodeButtonText`               | string   | Текст для кнопки QR-кода.                                          |
| `cardButtonText`                 | string   | Текст для кнопки оплаты картой.                                    |
| `buttonClassName`                | string   | CSS-класс для стилизации кнопок.                                   |
| `dialogTitle`                    | string   | Заголовок диалога оплаты картой.                                   |
| `dialogDescription`              | string   | Описание в диалоге оплаты картой.                                  |
| `className`                      | string   | CSS-класс для основного компонента.                                |
| `footerText`                     | string   | Текст внизу компонента.                                            |
| `cancelText`                     | string   | Текст о возможности отмены подписки.                               |
| `paymentLinkId`                  | string   | Идентификатор платёжной ссылки.                                    |
| `env`                            | string   | Окружение (например, test, production).                            |
| `onWalletConnectPaymentComplete` | function | Колбэк при успешной оплате через Wallet Connect.                   |
| `onWalletConnectPaymentError`    | function | Колбэк при ошибке оплаты через Wallet Connect.                     |
| `onQrCodePaymentComplete`        | function | Колбэк при успешной оплате через QR-код.                           |
| `onQrCodePaymentError`           | function | Колбэк при ошибке оплаты через QR-код.                             |
| `onCardPaymentComplete`          | function | Колбэк при успешной оплате картой.                                 |
| `onCardPaymentError`             | function | Колбэк при ошибке оплаты картой.                                   |
| `amount`                         | number   | Сумма подписки.                                                    |
| `recipientWalletAddress`         | string   | Кошелёк получателя.                                                |

### Примечания

- Используйте этот компонент для автоматизации управления подписками.
- Настраивайте детали плана через свойство `plan`.
- Убедитесь, что `recipientWalletAddress` действителен, чтобы избежать ошибок оплаты.
- Свойство `cancelText` позволяет вывести сообщение о возможности отмены подписки.

---

## InvoiceCheckout

React-компонент для оплаты по счёту. Идеально подходит для одноразовых платежей.

### Использование

```typescript
import {
  MilestonPaymentProvider,
  InvoiceCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="ваш-api-ключ" businessid="ваш-business-id">
  <InvoiceCheckout
    businessName="Мой бизнес"
    businessLogo="https://example.com/logo.png"
    currency="USD"
    description="Счёт #12345"
    walletConnectButtonText="Подключить кошелёк и оплатить"
    qrCodeButtonText="Сгенерировать QR для оплаты"
    cardButtonText="Оплатить картой"
    buttonClassName="custom-button-class"
    dialogTitle="Оплата счёта"
    dialogDescription="Завершите оплату безопасно"
    className="custom-class"
    footerText="Спасибо за ваш бизнес!"
    paymentLinkId="invoice123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Оплата через кошелёк завершена")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Ошибка оплаты через кошелёк:", error)
    }
    onQrCodePaymentComplete={() => console.log("Оплата через QR завершена")}
    onQrCodePaymentError={(error) =>
      console.error("Ошибка оплаты через QR:", error)
    }
    onCardPaymentComplete={() => console.log("Оплата картой завершена")}
    onCardPaymentError={(error) =>
      console.error("Ошибка оплаты картой:", error)
    }
    amount={200}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Свойства

| Имя свойства                     | Тип      | Описание                                         |
| -------------------------------- | -------- | ------------------------------------------------ |
| `businessName`                   | string   | Название бизнеса.                                |
| `businessLogo`                   | string   | URL логотипа бизнеса.                            |
| `currency`                       | string   | Валюта (например, USD).                          |
| `description`                    | string   | Описание счёта.                                  |
| `walletConnectButtonText`        | string   | Текст для кнопки Wallet Connect.                 |
| `qrCodeButtonText`               | string   | Текст для кнопки QR-кода.                        |
| `cardButtonText`                 | string   | Текст для кнопки оплаты картой.                  |
| `buttonClassName`                | string   | CSS-класс для стилизации кнопок.                 |
| `dialogTitle`                    | string   | Заголовок диалога оплаты картой.                 |
| `dialogDescription`              | string   | Описание в диалоге оплаты картой.                |
| `className`                      | string   | CSS-класс для основного компонента.              |
| `footerText`                     | string   | Текст внизу компонента.                          |
| `paymentLinkId`                  | string   | Идентификатор платёжной ссылки.                  |
| `env`                            | string   | Окружение (например, test, production).          |
| `onWalletConnectPaymentComplete` | function | Колбэк при успешной оплате через Wallet Connect. |
| `onWalletConnectPaymentError`    | function | Колбэк при ошибке оплаты через Wallet Connect.   |
| `onQrCodePaymentComplete`        | function | Колбэк при успешной оплате через QR-код.         |
| `onQrCodePaymentError`           | function | Колбэк при ошибке оплаты через QR-код.           |
| `onCardPaymentComplete`          | function | Колбэк при успешной оплате картой.               |
| `onCardPaymentError`             | function | Колбэк при ошибке оплаты картой.                 |
| `amount`                         | number   | Сумма счёта.                                     |
| `recipientWalletAddress`         | string   | Кошелёк получателя.                              |

### Примечания

- Используйте этот компонент для одноразовых платежей, например, по счёту.
- Убедитесь, что `recipientWalletAddress` действителен, чтобы избежать ошибок оплаты.
- Настраивайте внешний вид и поведение с помощью предоставленных свойств.

---

## PaymentLinkCheckout

React-компонент для оплаты по платёжной ссылке. Позволяет генерировать платёжные ссылки для клиентов.

### Использование

```typescript
import {
  MilestonPaymentProvider,
  PaymentLinkCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="ваш-api-ключ" businessid="ваш-business-id">
  <PaymentLinkCheckout
    businessName="Мой бизнес"
    businessLogo="https://example.com/logo.png"
    bannerImage="https://example.com/banner.png"
    title="Запрос на оплату"
    currency="USD"
    description="Оплатите ваш заказ"
    walletConnectButtonText="Подключить кошелёк и оплатить"
    qrCodeButtonText="Сгенерировать QR для оплаты"
    cardButtonText="Оплатить картой"
    buttonClassName="custom-button-class"
    dialogTitle="Безопасная оплата"
    dialogDescription="Завершите оплату через защищённую форму"
    className="custom-class"
    footerText="Спасибо за оплату!"
    paymentLinkId="payment123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Оплата через кошелёк завершена")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Ошибка оплаты через кошелёк:", error)
    }
    onQrCodePaymentComplete={() => console.log("Оплата через QR завершена")}
    onQrCodePaymentError={(error) =>
      console.error("Ошибка оплаты через QR:", error)
    }
    onCardPaymentComplete={() => console.log("Оплата картой завершена")}
    onCardPaymentError={(error) =>
      console.error("Ошибка оплаты картой:", error)
    }
    amount={100}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Свойства

| Имя свойства                     | Тип      | Описание                                         |
| -------------------------------- | -------- | ------------------------------------------------ |
| `businessName`                   | string   | Название бизнеса.                                |
| `businessLogo`                   | string   | URL логотипа бизнеса.                            |
| `bannerImage`                    | string   | URL баннера для страницы оплаты.                 |
| `title`                          | string   | Заголовок запроса на оплату.                     |
| `currency`                       | string   | Валюта (например, USD).                          |
| `description`                    | string   | Описание платёжного запроса.                     |
| `walletConnectButtonText`        | string   | Текст для кнопки Wallet Connect.                 |
| `qrCodeButtonText`               | string   | Текст для кнопки QR-кода.                        |
| `cardButtonText`                 | string   | Текст для кнопки оплаты картой.                  |
| `buttonClassName`                | string   | CSS-класс для стилизации кнопок.                 |
| `dialogTitle`                    | string   | Заголовок диалога оплаты картой.                 |
| `dialogDescription`              | string   | Описание в диалоге оплаты картой.                |
| `className`                      | string   | CSS-класс для основного компонента.              |
| `footerText`                     | string   | Текст внизу компонента.                          |
| `paymentLinkId`                  | string   | Идентификатор платёжной ссылки.                  |
| `env`                            | string   | Окружение (например, test, production).          |
| `onWalletConnectPaymentComplete` | function | Колбэк при успешной оплате через Wallet Connect. |
| `onWalletConnectPaymentError`    | function | Колбэк при ошибке оплаты через Wallet Connect.   |
| `onQrCodePaymentComplete`        | function | Колбэк при успешной оплате через QR-код.         |
| `onQrCodePaymentError`           | function | Колбэк при ошибке оплаты через QR-код.           |
| `onCardPaymentComplete`          | function | Колбэк при успешной оплате картой.               |
| `onCardPaymentError`             | function | Колбэк при ошибке оплаты картой.                 |
| `amount`                         | number   | Сумма платежа.                                   |
| `recipientWalletAddress`         | string   | Кошелёк получателя.                              |

### Примечания

- Используйте этот компонент для генерации платёжных ссылок для клиентов.
- Настраивайте внешний вид страницы оплаты с помощью свойств `bannerImage` и `title`.
- Убедитесь, что `recipientWalletAddress` действителен, чтобы избежать ошибок оплаты.

---

## PaymentOptions

React-компонент для отображения доступных способов оплаты. Предоставляет вкладки для Wallet Connect, QR-кода и оплаты картой.

### Использование

```typescript
import { PaymentOptions } from "mileston-payment-client";

function App() {
  return (
    <PaymentOptions
      walletConnectButtonText="Подключить кошелёк и оплатить"
      qrCodeButtonText="Сгенерировать QR для оплаты"
      cardButtonText="Оплатить картой"
      buttonClassName="custom-button-class"
      dialogTitle="Безопасная оплата"
      dialogDescription="Завершите оплату через защищённую форму"
      defaultTab="wallet"
      onTabChange={(tab) => console.log("Выбрана вкладка:", tab)}
      onWalletConnectPaymentComplete={(networkId, tokenId) =>
        console.log("Оплата через кошелёк завершена:", networkId, tokenId)
      }
      onWalletConnectPaymentError={(error) =>
        console.error("Ошибка оплаты через кошелёк:", error)
      }
      onQrCodePaymentComplete={(networkId, tokenId) =>
        console.log("Оплата через QR завершена:", networkId, tokenId)
      }
      onQrCodePaymentError={(error) =>
        console.error("Ошибка оплаты через QR:", error)
      }
      onCardPaymentComplete={() => console.log("Оплата картой завершена")}
      onCardPaymentError={(error) =>
        console.error("Ошибка оплаты картой:", error)
      }
      amount={100}
      env="test"
      recipientWalletAddress="0x123456789abcdef"
      paymentType="invoice"
      paymentLinkId="payment123"
    />
  );
}
```

### Свойства

| Имя свойства                     | Тип      | Описание                                                        |
| -------------------------------- | -------- | --------------------------------------------------------------- |
| `walletConnectButtonText`        | string   | Текст для кнопки Wallet Connect.                                |
| `qrCodeButtonText`               | string   | Текст для кнопки QR-кода.                                       |
| `cardButtonText`                 | string   | Текст для кнопки оплаты картой.                                 |
| `buttonClassName`                | string   | CSS-класс для стилизации кнопок.                                |
| `dialogTitle`                    | string   | Заголовок диалога оплаты картой.                                |
| `dialogDescription`              | string   | Описание в диалоге оплаты картой.                               |
| `defaultTab`                     | string   | Вкладка по умолчанию (например, "wallet", "qrcode", "card").    |
| `onTabChange`                    | function | Колбэк при смене выбранной вкладки.                             |
| `onWalletConnectPaymentComplete` | function | Колбэк при успешной оплате через Wallet Connect.                |
| `onWalletConnectPaymentError`    | function | Колбэк при ошибке оплаты через Wallet Connect.                  |
| `onQrCodePaymentComplete`        | function | Колбэк при успешной оплате через QR-код.                        |
| `onQrCodePaymentError`           | function | Колбэк при ошибке оплаты через QR-код.                          |
| `onCardPaymentComplete`          | function | Колбэк при успешной оплате картой.                              |
| `onCardPaymentError`             | function | Колбэк при ошибке оплаты картой.                                |
| `amount`                         | number   | Сумма платежа.                                                  |
| `env`                            | string   | Окружение (например, test, production).                         |
| `recipientWalletAddress`         | string   | Кошелёк получателя.                                             |
| `paymentType`                    | string   | Тип платежа (например, "invoice", "payment-link", "recurring"). |
| `paymentLinkId`                  | string   | Идентификатор платёжной ссылки.                                 |

### Примечания

- Используйте этот компонент для предоставления пользователям нескольких способов оплаты.
- Настраивайте внешний вид кнопок с помощью свойства `buttonClassName`.
- Свойство `defaultTab` позволяет выбрать вкладку по умолчанию.
- Убедитесь, что `recipientWalletAddress` действителен, чтобы избежать ошибок оплаты.

---

## SuiWalletProvider

Контекстный провайдер React для интеграции кошельков Sui. Настраивает соединение с сетями Sui и управление кошельками.

### Использование

```typescript
import SuiWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SuiWalletProvider>{/* Ваши компоненты приложения */}</SuiWalletProvider>
  );
}
```

### Свойства

| Имя свойства | Тип       | Описание                                             |
| ------------ | --------- | ---------------------------------------------------- |
| `children`   | ReactNode | Дочерние компоненты, использующие контекст кошелька. |

### Примечания

- По умолчанию используется сеть `testnet`, поддерживается также `mainnet`.

### Возможности

- **Конфигурация сети**: поддержка Sui `testnet` и `mainnet` через `createNetworkConfig`.
- **Автоподключение**: автоматическое подключение кошелька при инициализации провайдера.
- **Управление запросами**: использование `QueryClientProvider` для управления запросами и кэшированием.

---

## WalletConnectPayment

React-компонент для оплаты через WalletConnect. Поддерживает несколько блокчейн-сетей и токенов.

### Использование

```typescript
import { WalletConnectPayment } from "mileston-payment-client";

function App() {
  return (
    <WalletConnectPayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Платёж завершён:", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Ошибка платежа:", error)}
      buttonText="Подключить кошелёк и оплатить"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Свойства

| Имя свойства             | Тип      | Описание                                     |
| ------------------------ | -------- | -------------------------------------------- |
| `onPaymentComplete`      | function | Колбэк при успешной оплате.                  |
| `onPaymentError`         | function | Колбэк при ошибке оплаты.                    |
| `buttonText`             | string   | Текст для кнопки оплаты.                     |
| `buttonClassName`        | string   | CSS-класс для стилизации кнопки.             |
| `recipientWalletAddress` | object   | Кошельки для разных блокчейнов.              |
| `amount`                 | number   | Сумма платежа.                               |
| `paymentLinkId`          | string   | Идентификатор платёжной ссылки.              |
| `env`                    | string   | Окружение (например, test, production).      |
| `paymentType`            | string   | Тип платежа (например, invoice, recurring).  |
| `userUUID`               | string   | UUID пользователя для отслеживания платежей. |

### Примечания

- Поддержка сетей Ethereum, Sui, Solana и других.
- Автоматическое подключение кошелька и обработка платежа.

---

## QrCodePayment

React-компонент для генерации и проверки платежей по QR-коду.

### Использование

```typescript
import { QrCodePayment } from "mileston-payment-client";

function App() {
  return (
    <QrCodePayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Платёж завершён:", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Ошибка платежа:", error)}
      buttonText="Сгенерировать QR для оплаты"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Свойства

| Имя свойства             | Тип      | Описание                                     |
| ------------------------ | -------- | -------------------------------------------- |
| `onPaymentComplete`      | function | Колбэк при успешной оплате.                  |
| `onPaymentError`         | function | Колбэк при ошибке оплаты.                    |
| `buttonText`             | string   | Текст для кнопки генерации QR-кода.          |
| `buttonClassName`        | string   | CSS-класс для стилизации кнопки.             |
| `recipientWalletAddress` | object   | Кошельки для разных блокчейнов.              |
| `amount`                 | number   | Сумма платежа.                               |
| `paymentLinkId`          | string   | Идентификатор платёжной ссылки.              |
| `env`                    | string   | Окружение (например, test, production).      |
| `paymentType`            | string   | Тип платежа (например, invoice, recurring).  |
| `userUUID`               | string   | UUID пользователя для отслеживания платежей. |

### Примечания

- Генерирует QR-код для оплаты и проверяет транзакцию через polling.
- Поддержка нескольких блокчейнов и токенов.

---

## CardPayment

React-компонент для оплаты с помощью банковских карт. Интегрируется с onramp-сервисами для обработки платежей.

### Использование

```typescript
import { CardPayment } from "mileston-payment-client";

function App() {
  return (
    <CardPayment
      onPaymentComplete={() => console.log("Платёж завершён")}
      onPaymentError={(error) => console.error("Ошибка платежа:", error)}
      buttonText="Оплатить картой"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Свойства

| Имя свойства             | Тип      | Описание                                     |
| ------------------------ | -------- | -------------------------------------------- |
| `onPaymentComplete`      | function | Колбэк при успешной оплате.                  |
| `onPaymentError`         | function | Колбэк при ошибке оплаты.                    |
| `buttonText`             | string   | Текст для кнопки оплаты.                     |
| `buttonClassName`        | string   | CSS-класс для стилизации кнопки.             |
| `recipientWalletAddress` | object   | Кошельки для разных блокчейнов.              |
| `amount`                 | number   | Сумма платежа.                               |
| `paymentLinkId`          | string   | Идентификатор платёжной ссылки.              |
| `env`                    | string   | Окружение (например, test, production).      |
| `paymentType`            | string   | Тип платежа (например, invoice, recurring).  |
| `userUUID`               | string   | UUID пользователя для отслеживания платежей. |

### Примечания

- Открывает всплывающее окно для оплаты через onramp-сервисы.
- Отслеживает статус платежа и обновляет интерфейс.

---

## SolanaWalletProvider

Контекстный провайдер React для интеграции кошельков Solana. Настраивает соединение с сетями Solana и управление кошельками.

### Использование

```typescript
import SolanaWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SolanaWalletProvider env="test">
      {/* Ваши компоненты приложения */}
    </SolanaWalletProvider>
  );
}
```

### Свойства

| Имя свойства | Тип       | Описание                                             |
| ------------ | --------- | ---------------------------------------------------- |
| `children`   | ReactNode | Дочерние компоненты, использующие контекст кошелька. |
| `env`        | string    | Окружение (например, "test", "prod").                |

### Примечания

- Свойство `env` определяет, будет ли провайдер подключаться к mainnet или devnet.

### Возможности

- **Конфигурация сети**: поддержка Solana `mainnet` и `devnet` через `clusterApiUrl`.
- **Автоподключение**: автоматическое подключение кошелька при инициализации провайдера.
- **Модальное окно**: предоставляет модальное окно для выбора и подключения кошельков.

---
