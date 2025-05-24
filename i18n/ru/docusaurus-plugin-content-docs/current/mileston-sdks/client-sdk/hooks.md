# Документация по хукам

В этом документе представлен подробный обзор хуков, доступных в клиентском SDK Mileston Payment. **Примечание:** Все хуки требуют, чтобы `MilestonPaymentProvider` предоставлял через контекст `apikey (checkout api key)` и `businessid`.

---

## Пример: Использование провайдера с хуками

Чтобы использовать любые хуки из этого SDK, оберните приложение или дерево компонентов в `MilestonPaymentProvider`. Пример:

```typescript
import React from "react";
import {
  MilestonPaymentProvider,
  useFetchPayment,
} from "mileston-payment-client";

function PaymentDetails() {
  const { data, error, isLoading } = useFetchPayment({
    paymentId: "12345",
    paymentType: "invoice",
  });

  if (isLoading) return <p>Загрузка данных платежа...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <h2>Детали платежа</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <MilestonPaymentProvider apikey="ваш-api-ключ" businessid="ваш-business-id">
      <PaymentDetails />
    </MilestonPaymentProvider>
  );
}
```

---

## useFetchPayment

Получает детали платежа с помощью React-хука. Идеально подходит для получения информации о платеже в реальном времени.

### Использование

```typescript
import { useFetchPayment } from "mileston-payment-client";

const { data, error, isLoading } = useFetchPayment({
  paymentId: "payment-id",
  paymentType: "invoice", // или "payment-link", "recurring"
});
```

### Параметры

| Имя параметра | Тип    | Описание                                                        |
| ------------- | ------ | --------------------------------------------------------------- |
| `paymentId`   | string | Идентификатор платежа для получения.                            |
| `paymentType` | string | Тип платежа (например, "invoice", "payment-link", "recurring"). |

### Возвращает

| Имя         | Тип     | Описание                                |
| ----------- | ------- | --------------------------------------- |
| `data`      | object  | Полученные детали платежа.              |
| `error`     | object  | Ошибка, возникшая при получении данных. |
| `isLoading` | boolean | Флаг загрузки данных.                   |

### Примечания

- Убедитесь, что `MilestonPaymentProvider` оборачивает дерево компонентов для предоставления контекста.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## useGetOnRampData

Получает данные о прямом подключении для платежей. Этот хук полезен для интеграции услуг прямого подключения в ваше приложение.

### Использование

```typescript
import { useGetOnRampData } from "mileston-payment-client";

const { fetchOnRampData, data, error, loading } = useGetOnRampData();

await fetchOnRampData({
  amount: "100",
  recipientWalletAddress: "0xRecipientAddress",
  chain: "eth", // или "avax", "base", "pol", "arb"
});
```

### Параметры

| Имя параметра            | Тип    | Описание                         |
| ------------------------ | ------ | -------------------------------- |
| `amount`                 | string | Сумма для прямого подключения.   |
| `recipientWalletAddress` | string | Адрес кошелька получателя.       |
| `chain`                  | string | Блокчейн-сеть (например, "eth"). |

### Возвращает

| Имя               | Тип                          | Описание                                           |
| ----------------- | ---------------------------- | -------------------------------------------------- |
| `fetchOnRampData` | function                     | Функция для получения данных о прямом подключении. |
| `data`            | `OnRampLinkResponse \| null` | Полученные данные о прямом подключении.            |
| `error`           | `string \| null`             | Ошибка, возникшая при получении данных.            |
| `loading`         | boolean                      | Флаг загрузки данных.                              |

### Примечания

- Этот хук зависит от `MilestonPaymentProvider` для контекста, который предоставляет `apikey` и `businessid`.
- Проверьте объект `params`, чтобы убедиться, что все обязательные поля предоставлены.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## useGetOnRampPaymentStatus

Получает статус платежа по прямому подключению. Этот хук необходим для отслеживания хода платежа.

### Использование

```typescript
import { useGetOnRampPaymentStatus } from "mileston-payment-client";

const { fetchOnRampPaymentStatus, data, error, loading } =
  useGetOnRampPaymentStatus();

await fetchOnRampPaymentStatus({
  id: "payment-id",
  amount: "100",
  chain: "eth", // или "avax", "base", "pol", "arb"
  recipientWalletAddress: "0xRecipientAddress",
});
```

### Параметры

| Имя параметра            | Тип    | Описание                         |
| ------------------------ | ------ | -------------------------------- |
| `id`                     | string | Идентификатор платежа.           |
| `amount`                 | string | Сумма платежа.                   |
| `chain`                  | string | Блокчейн-сеть (например, "eth"). |
| `recipientWalletAddress` | string | Адрес кошелька получателя.       |

### Возвращает

| Имя                        | Тип                                   | Описание                                                      |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `fetchOnRampPaymentStatus` | function                              | Функция для получения статуса платежа по прямому подключению. |
| `data`                     | `OnRampPaymentStatusResponse \| null` | Полученные данные о статусе платежа.                          |
| `error`                    | `string \| null`                      | Ошибка, возникшая при получении данных.                       |
| `loading`                  | boolean                               | Флаг загрузки данных.                                         |

### Примечания

- Этот хук зависит от `MilestonPaymentProvider` для контекста, который предоставляет `apikey` и `businessid`.
- Используйте этот хук, чтобы предоставлять пользователям обновления в реальном времени.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## useUserDetails

Получает детали пользователя с помощью React-хука. Этот хук полезен для получения информации, специфичной для пользователя.

### Использование

```typescript
import { useUserDetails } from "mileston-payment-client";

const { data, loading, error } = useUserDetails("business-id");
```

### Параметры

| Имя параметра    | Тип    | Описание                                                   |
| ---------------- | ------ | ---------------------------------------------------------- |
| `pathBusinessId` | string | Идентификатор бизнеса для включения в URL (необязательно). |

### Возвращает

| Имя       | Тип                | Описание                                |
| --------- | ------------------ | --------------------------------------- |
| `data`    | `IGetUser \| null` | Полученные детали пользователя.         |
| `loading` | boolean            | Флаг загрузки данных.                   |
| `error`   | `Error \| null`    | Ошибка, возникшая при получении данных. |

### Примечания

- Этот хук зависит от `MilestonPaymentProvider` для контекста, который предоставляет `apikey` и `businessid`.
- Используйте этот хук, чтобы проверять информацию о пользователе перед выполнением чувствительных операций.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## usePayment

Обрабатывает операции платежа с помощью React-хука. Этот хук упрощает процесс инициализации платежей.

### Использование

```typescript
import { usePayment } from "mileston-payment-client";

const { initiatePayment, error, isProcessing } = usePayment();

await initiatePayment({
  type: "invoice", // или "payment-link", "recurring"
  body: {
    /* детали платежа */
  },
  nativeTokens: "опциональные-родные-токены",
});
```

### Параметры

| Имя параметра  | Тип    | Описание                                                               |
| -------------- | ------ | ---------------------------------------------------------------------- |
| `type`         | string | Тип платежа (например, "invoice", "payment-link", "recurring").        |
| `body`         | object | Детали платежа.                                                        |
| `nativeTokens` | string | Родные токены для платежа (например, AVAX, POL, ETH). (необязательно). |

### Возвращает

| Имя               | Тип      | Описание                                                     |
| ----------------- | -------- | ------------------------------------------------------------ |
| `initiatePayment` | function | Функция для запуска процесса платежа.                        |
| `error`           | object   | Ошибка, возникшая во время процесса платежа.                 |
| `isProcessing`    | boolean  | Флаг, указывающий, находится ли платеж в процессе обработки. |

### Примечания

- Убедитесь, что `MilestonPaymentProvider` оборачивает ваше дерево компонентов.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## useSavePayment

Сохраняет детали платежа с помощью React-хука. Этот хук полезен для безопасного хранения информации о платеже.

### Использование

```typescript
import { useSavePayment } from "mileston-payment-client";

const { triggerSavePayment, data, error, loading } = useSavePayment();

await triggerSavePayment(
  "invoice", // или "payment-link", "recurring"
  {
    /* детали платежа */
  },
  "опциональные-родные-токены"
);
```

### Параметры

| Имя параметра  | Тип    | Описание                                                               |
| -------------- | ------ | ---------------------------------------------------------------------- |
| `type`         | string | Тип платежа (например, "invoice", "payment-link", "recurring").        |
| `body`         | object | Детали платежа.                                                        |
| `nativeTokens` | string | Родные токены для платежа (например, AVAX, POL, ETH). (необязательно). |

### Возвращает

| Имя                  | Тип                           | Описание                                        |
| -------------------- | ----------------------------- | ----------------------------------------------- |
| `triggerSavePayment` | function                      | Функция для сохранения данных о платеже.        |
| `data`               | `SavePaymentResponse \| null` | Ответ от операции сохранения.                   |
| `error`              | `string \| null`              | Ошибка, возникшая во время процесса сохранения. |
| `loading`            | boolean                       | Флаг загрузки данных.                           |

### Примечания

- Этот хук зависит от `MilestonPaymentProvider` для контекста, который предоставляет `apikey` и `businessid`.
- Используйте этот хук для безопасного хранения данных о платеже.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## useSuiPayment

React-хук для обработки платежей в блокчейне Sui.

### Использование

```typescript
import { useSuiPayment } from "mileston-payment-client";

const { handleSuiPayment } = useSuiPayment("test");

handleSuiPayment({
  amount: "100",
  recipientWalletAddress: "0xRecipientAddress",
});
```

### Параметры

| Имя параметра            | Тип    | Описание                                     |
| ------------------------ | ------ | -------------------------------------------- |
| `env`                    | string | Среда выполнения (например, "test", "prod"). |
| `amount`                 | string | Сумма для платежа.                           |
| `recipientWalletAddress` | string | Адрес кошелька получателя.                   |

### Возвращает

| Имя                | Тип      | Описание                                  |
| ------------------ | -------- | ----------------------------------------- |
| `handleSuiPayment` | function | Функция для инициализации платежей в Sui. |

---

## useGetPaymentWallet

Получает детали кошелька для определенного типа кошелька с помощью React-хука. Этот хук полезен для получения информации о кошельке, такой как баланс и история транзакций.

### Использование

```typescript
import { useGetPaymentWallet } from "mileston-payment-client";

const { fetchWallet, wallet, error, loading } = useGetPaymentWallet();

await fetchWallet("sui"); // или "evm"
```

### Параметры

| Имя параметра | Тип          | Описание                               |
| ------------- | ------------ | -------------------------------------- |
| `walletType`  | `WalletType` | Тип кошелька (например, "sui", "evm"). |

### Возвращает

| Имя           | Тип                        | Описание                                |
| ------------- | -------------------------- | --------------------------------------- |
| `fetchWallet` | function                   | Функция для получения деталей кошелька. |
| `wallet`      | `GetPaymentWallet \| null` | Полученные детали кошелька.             |
| `error`       | `string \| null`           | Ошибка, возникшая при получении данных. |
| `loading`     | boolean                    | Флаг загрузки данных.                   |

### Примечания

- Этот хук зависит от `MilestonPaymentProvider` для контекста, который предоставляет `apikey` и `businessid`.
- Используйте этот хук, чтобы получить информацию о кошельке перед выполнением транзакций, связанных с кошельком.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## useVerifyPaymentWithWallet

Подтверждает платеж с помощью кошелька. Этот хук полезен для подтверждения платежей, выполненных через кошельки.

### Использование

```typescript
import { useVerifyPaymentWithWallet } from "mileston-payment-client";

const { verify, data, error, loading } = useVerifyPaymentWithWallet();

await verify(
  "invoice", // или "payment-link", "recurring"
  {
    /* детали платежа */
  },
  "опциональные-родные-токены"
);
```

### Параметры

| Имя параметра  | Тип    | Описание                                                        |
| -------------- | ------ | --------------------------------------------------------------- |
| `type`         | string | Тип платежа (например, "invoice", "payment-link", "recurring"). |
| `body`         | object | Детали платежа.                                                 |
| `nativeTokens` | string | Родные токены для платежа (необязательно).                      |

### Возвращает

| Имя       | Тип                               | Описание                                                          |
| --------- | --------------------------------- | ----------------------------------------------------------------- |
| `verify`  | function                          | Функция для подтверждения платежа.                                |
| `data`    | `VerifyPaymentWithWallet \| null` | Ответ от процесса подтверждения.                                  |
| `error`   | `string \| null`                  | Ошибка, возникшая во время процесса подтверждения.                |
| `loading` | boolean                           | Флаг, указывающий, находится ли процесс подтверждения в процессе. |

### Примечания

- Этот хук зависит от `MilestonPaymentProvider` для контекста, который предоставляет `apikey` и `businessid`.
- Используйте этот хук для безопасного подтверждения платежей.
- Обрабатывайте ошибки для улучшения пользовательского опыта.

---

## usePaymentContext

Предоставляет доступ к `PaymentContext`, который содержит `apikey` и `businessid`, переданные в `MilestonPaymentProvider`. Этот хук необходим для доступа к этим значениям в компонентах или других хуках.

### Использование

```typescript
import { usePaymentContext } from "mileston-payment-client";

function MyComponent() {
  const { apikey, businessid } = usePaymentContext();

  return (
    <div>
      <p>API Key: {apikey}</p>
      <p>Business ID: {businessid}</p>
    </div>
  );
}
```

### Возвращает

| Имя          | Тип    | Описание                                                          |
| ------------ | ------ | ----------------------------------------------------------------- |
| `apikey`     | string | API-ключ, предоставленный `MilestonPaymentProvider`.              |
| `businessid` | string | Идентификатор бизнеса, предоставленный `MilestonPaymentProvider`. |

### Примечания

- Этот хук должен использоваться внутри компонента, обернутого в `MilestonPaymentProvider`.
- Если использовать вне провайдера, он вызовет ошибку.

---

## useSolanaPayment

React-хук для обработки платежей в блокчейне Solana.

### Использование

```typescript
import { useSolanaPayment } from "mileston-payment-client";

const { handleSolanaPayment } = useSolanaPayment("test");

handleSolanaPayment({
  amount: "100",
  recipientWalletAddress: "RecipientAddress",
  token: "SOL", // или "USDC", "USDT"
});
```

### Параметры

| Имя параметра            | Тип    | Описание                                     |
| ------------------------ | ------ | -------------------------------------------- |
| `env`                    | string | Среда выполнения (например, "test", "prod"). |
| `amount`                 | string | Сумма для платежа.                           |
| `recipientWalletAddress` | string | Адрес кошелька получателя.                   |
| `token`                  | string | Тип токена (например, "SOL", "USDC").        |

### Возвращает

| Имя                   | Тип      | Описание                                     |
| --------------------- | -------- | -------------------------------------------- |
| `handleSolanaPayment` | function | Функция для инициализации платежей в Solana. |

### Примечания

- Параметр `env` определяет, работает ли хук в тестовой или производственной среде.
- Убедитесь, что адрес кошелька получателя действителен, чтобы избежать ошибок платежа.
- Используйте параметр `token`, чтобы указать тип токена для платежа.

---
