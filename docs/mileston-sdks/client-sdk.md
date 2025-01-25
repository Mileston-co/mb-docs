---
sidebar_position: 1
---

# Mileston Payment Client SDK

Welcome to the **Mileston Payment JavaScript/TypeScript Client SDK** docs! Whether you're a JavaScript guru or a framework fanatic, this SDK is here to make crypto payments a breeze. Let's jump in and start building something awesome! 🚀

---

## Installation

Get started by installing the SDK in your project. Open your terminal and run:

```bash
npm install mileston-payment-client
```

Or, if you're using Yarn:

```bash
yarn add mileston-payment-client
```

---

## Core Class (Vanilla JavaScript)

For those using plain JavaScript, the SDK provides the `MilestonPayButton` class for direct integration.

### Example

```javascript
import { MilestonPayButton } from 'mileston-payment-client';

const container = document.getElementById('payment-button-container');

const payButton = new MilestonPayButton(container, {
  buttonText: 'Pay Now',
  onPaymentComplete: () => {
    console.log('Payment complete!');
  },
  onPaymentDataReceived: (data) => {
    console.log('Payment data received:', data);
  },
  onPaymentError: (error) => {
    console.error('Payment error:', error);
  },
  paymentUrl: 'https://example.com/payment',
});

// Optional: Update button text or styles later
payButton.updateButtonText('Checkout');
payButton.updateButtonStyle({ backgroundColor: 'blue', color: 'white' });
```

---

## React Integration

The SDK offers a dedicated React component for smooth integration.

### Example

```jsx
import React from 'react';
import { PayButton } from 'mileston-payment-client';

function App() {
  return (
    <div>
      <PayButton
        onPaymentComplete={() => console.log('Payment complete!')}
        onPaymentDataReceived={(data) => console.log('Payment data received:', data)}
        onPaymentError={(error) => console.error('Payment error:', error)}
        paymentUrl="https://checkout.mileston.co/payment"
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        Pay Now
      </PayButton>
    </div>
  );
}

export default App;
```

---

## Angular Integration

For Angular projects, you can use the `MilestonPayButton` class directly.

### Example

```typescript
import { Component } from '@angular/core';
import { MilestonPayButton } from 'mileston-payment-client';

@Component({
  selector: 'app-root',
  template: `<div id="payment-button-container"></div>`,
})
export class AppComponent {
  ngOnInit() {
    const container = document.getElementById('payment-button-container');

    const payButton = new MilestonPayButton(container, {
      buttonText: 'Pay Now',
      onPaymentComplete: () => {
        console.log('Payment complete!');
      },
      onPaymentDataReceived: (data) => {
        console.log('Payment data received:', data);
      },
      onPaymentError: (error) => {
        console.error('Payment error:', error);
      },
      paymentUrl: 'https://example.com/payment',
    });
  }
}
```

---

## Vue Integration

Vue developers can integrate using the `MilestonPayButton` class.

### Example

```vue
<template>
  <div id="payment-button-container"></div>
</template>

<script>
import { MilestonPayButton } from 'mileston-payment-client';

export default {
  name: 'App',
  mounted() {
    const container = this.$el.querySelector('#payment-button-container');

    const payButton = new MilestonPayButton(container, {
      buttonText: 'Pay Now',
      onPaymentComplete: () => {
        console.log('Payment complete!');
      },
      onPaymentDataReceived: (data) => {
        console.log('Payment data received:', data);
      },
      onPaymentError: (error) => {
        console.error('Payment error:', error);
      },
      paymentUrl: 'https://example.com/payment',
    });
  },
};
</script>
```

---

## Configuration Options

The SDK is highly customizable! Here's a list of options you can use:

| **Option**            | **Type**                                   | **Required** | **Description**                                                   |
|------------------------|--------------------------------------------|--------------|-------------------------------------------------------------------|
| `container`           | `HTMLElement`                             | Yes          | The DOM element to attach the button to (Core only).              |
| `buttonText`          | `string`                                  | Yes          | Text displayed on the button.                                     |
| `onPaymentComplete`   | `() => void`                              | Yes          | Callback triggered when the payment is complete.                  |
| `onPaymentDataReceived` | `(data: { walletAddress: string, id: string }) => void` | Yes | Callback triggered when payment data is received.                 |
| `onPaymentError`      | `(error: Error) => void`                  | Yes          | Callback triggered when payment fails.                            |
| `paymentUrl`          | `string`                                  | No           | URL of the payment page.                                          |
| `paymentType`         | `"payment-link" | "invoice" | "recurring-payment"` | No | Type of payment (used to auto-generate paymentUrl).                |
| `paymentId`           | `string`                                  | No           | ID of the payment (used to auto-generate paymentUrl).             |
| `buttonStyle`         | `Partial<CSSStyleDeclaration>`            | No           | Custom styles for the button.                                     |

---

## API Methods

Here are the methods you can call on the `MilestonPayButton` class:

- **`updateButtonText(text: string): void`**  
  Updates the button's text.

- **`updateButtonStyle(styles: Partial<CSSStyleDeclaration>): void`**  
  Updates the button's styles.

- **`destroy(): void`**  
  Removes the button from the DOM and cleans up event listeners.

---

## Common Issues

### TypeScript Errors
Make sure your `tsconfig.json` includes:

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### JSX Error
If you encounter JSX errors, ensure your `tsconfig.json` has:

```json
{
  "jsx": "react-jsx"
}
```

---

And that's it, folks! You're now ready to integrate the **Mileston Payment Client SDK** like a pro. Got questions? Reach out, and let's keep building amazing things! ✨

## Wrapping Up

And there you have it! With the **Mileston Payment Client SDK**, integrating crypto payments into your app is a walk in the park. If you have any questions or run into issues, don't hesitate to reach out. Happy coding, and may your coffee mugs sell like hotcakes! ☕🛍️

---

*Note: For more detailed information and refs, check out the [Mileston Payment Client SDK GitHub Repository](https://github.com/Mileston-co/mileston-payment-client). Plus, the SDK is open sourced feel free to open a PR!*
