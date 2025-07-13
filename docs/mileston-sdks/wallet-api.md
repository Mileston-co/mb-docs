---
sidebar_position: 4
---

# Wallet API Documentation

Welcome to the **Mileston Payments Wallet API**—your comprehensive solution for managing multi-chain wallets, sub-wallets, and cryptocurrency transactions! Whether you're building a DeFi application, managing user wallets, or handling batch payments, our Wallet API provides everything you need for secure and efficient wallet operations.

---

## 🚀 Features

- **Multi-Chain Support:** Manage wallets across 7 major blockchains
- **Sub-Wallet Management:** Create and manage multiple sub-wallets for different purposes
- **Secure Transactions:** Send funds with built-in security and signature verification
- **Batch Payments:** Process multiple payments in a single transaction
- **Transaction Tracking:** Monitor transaction status in real-time
- **Developer-Friendly:** Simple, intuitive API with comprehensive TypeScript support

---

## 🛠️ Installation

The Wallet API is included in the main Mileston Payments SDK:

```bash
npm install mileston-payments
```

---

## 🏁 Getting Started

Import the Wallet API and initialize it with your credentials:

```typescript
import { Wallet } from "mileston-payments";

const apiKey = "your-api-key"; // Get this from your dashboard
const businessId = "your-business-id"; // Get this from your profile
const secretKey = "your-secret-key"; // Get this when generating wallet API keys

const wallet = new Wallet(apiKey, businessId, secretKey);
```

---

## 🔗 Supported Blockchains

The Wallet API supports the following blockchains:

| Blockchain | Wallet Type | Description |
|------------|-------------|-------------|
| **Sui** | `"sui"` | Sui blockchain wallet |
| **Ethereum** | `"eth"` | Ethereum mainnet wallet |
| **Avalanche** | `"avax"` | Avalanche C-Chain wallet |
| **Polygon** | `"pol"` | Polygon network wallet |
| **Base** | `"base"` | Base blockchain wallet |
| **Arbitrum** | `"arb"` | Arbitrum One wallet |
| **Solana** | `"solana"` | Solana blockchain wallet |

---

## 🔥 Usage Examples

### 🏦 1. **Sending Payments from Main Wallet**

Send funds directly from your main wallet to any recipient:

```typescript
const sendPaymentPayload = {
  amount: "100.00",
  recipientAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  walletType: "eth"
};

const response = await wallet.sendPayment(sendPaymentPayload);
console.log("Payment Response:", response);
// Output: { statusCode: 200, message: "Payment sent successfully" }
```

### 🎯 2. **Creating Sub-Wallets**

Create dedicated sub-wallets for different purposes (e.g., customer payments, operational expenses):

```typescript
// Create a basic sub-wallet
const basicSubWallet = await wallet.createSubWallet();
console.log("Basic Sub-Wallet:", basicSubWallet);
// Output: { publicKey: "...", uuid: "...", recoveryPhrase: "..." }

// Create a specific type of sub-wallet
const specificSubWalletPayload = {
  subWalletUuid: "custom-uuid-123",
  walletType: "sui"
};

const specificSubWallet = await wallet.createNewSubWallet(specificSubWalletPayload);
console.log("Specific Sub-Wallet:", specificSubWallet);
// Output: { type: "sui", address: "...", balance: "0" }
```

### 📊 3. **Managing Sub-Wallets**

Get detailed information about your sub-wallets:

```typescript
// Get a specific sub-wallet
const subWalletUuid = "your-sub-wallet-uuid";
const subWalletDetails = await wallet.getSubWallet(subWalletUuid);
console.log("Sub-Wallet Details:", subWalletDetails);
// Output: {
//   type: "all",
//   address: { sui: "...", eth: "...", ... },
//   balance: "150.50",
//   balances: { sui: "50.00", eth: "100.50", ... }
// }

// Get all sub-wallets
const allSubWallets = await wallet.getAllSubWallets();
console.log("All Sub-Wallets:", allSubWallets);
// Output: {
//   type: "all",
//   address: { "uuid1": { sui: "...", eth: "..." }, ... },
//   balance: "500.75",
//   balances: { "uuid1": { sui: "100", eth: "200" }, ... }
// }
```

### 💸 4. **Sending Funds from Sub-Wallets**

Send payments from specific sub-wallets:

```typescript
const subWalletUuid = "your-sub-wallet-uuid";
const sendFundsPayload = {
  amount: "25.00",
  recipientAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  walletType: "eth"
};

const response = await wallet.sendFunds(subWalletUuid, sendFundsPayload);
console.log("Funds Sent:", response);
// Output: { statusCode: 200, message: "Funds sent successfully" }
```

### 🔄 5. **Batch Payments**

Process multiple payments in a single transaction for efficiency:

```typescript
const batchPaymentPayload = {
  recipients: [
    "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "0x8ba1f109551bD432803012645Hac136c772c3",
    "0x1234567890123456789012345678901234567890"
  ],
  amounts: ["50.00", "75.00", "25.00"],
  walletType: "eth"
};

const batchResponse = await wallet.batchPayment(batchPaymentPayload);
console.log("Batch Payment Response:", batchResponse);
// Output: { statusCode: 200, message: "Batch payment processed successfully", data: {} }
```

### 📈 6. **Transaction Status Tracking**

Monitor the status of your transactions in real-time:

```typescript
const transactionUuid = "your-transaction-uuid";
const transactionStatus = await wallet.getTransactionStatus(transactionUuid);
console.log("Transaction Status:", transactionStatus);
// Output: {
//   statusCode: 200,
//   message: "Transaction status retrieved successfully",
//   data: {
//     transactionUUID: "uuid-123",
//     status: "completed",
//     amount: "100.00",
//     recipientAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
//     walletType: "eth",
//     signature: "0x123...",
//     createdAt: "2024-01-15T10:30:00Z",
//     updatedAt: "2024-01-15T10:35:00Z"
//   }
// }
```

### 🗑️ 7. **Deleting Sub-Wallets**

Remove sub-wallets when they're no longer needed:

```typescript
const subWalletUuid = "sub-wallet-to-delete";
const deleteResponse = await wallet.deleteSubWallet(subWalletUuid);
console.log("Delete Response:", deleteResponse);
// Output: { statusCode: 200, message: "Sub-wallet deleted successfully", data: {} }
```

---

## 🌟 Real-World Examples

### 💼 **E-commerce Payment Processing**

```typescript
// Create a dedicated sub-wallet for customer payments
const customerWallet = await wallet.createSubWallet();

// Process customer payment
const customerPayment = {
  amount: "299.99",
  recipientAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  walletType: "eth"
};

const paymentResponse = await wallet.sendFunds(customerWallet.uuid, customerPayment);

// Track transaction status
const status = await wallet.getTransactionStatus(paymentResponse.transactionUUID);
if (status.data.status === "completed") {
  console.log("Payment processed successfully!");
}
```

### 🏢 **Business Expense Management**

```typescript
// Create sub-wallets for different expense categories
const operationalWallet = await wallet.createSubWallet();
const marketingWallet = await wallet.createSubWallet();

// Batch process vendor payments
const vendorPayments = {
  recipients: [
    "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6", // Vendor A
    "0x8ba1f109551bD432803012645Hac136c772c3",     // Vendor B
    "0x1234567890123456789012345678901234567890"    // Vendor C
  ],
  amounts: ["1000.00", "500.00", "750.00"],
  walletType: "eth"
};

const batchResponse = await wallet.batchPayment(vendorPayments);
console.log("All vendor payments processed!");
```

### 🎮 **Gaming Platform Integration**

```typescript
// Create player wallets for different games
const gameWalletPayload = {
  subWalletUuid: "game-player-123",
  walletType: "sui"
};

const playerWallet = await wallet.createNewSubWallet(gameWalletPayload);

// Process in-game purchases
const purchasePayload = {
  amount: "10.00",
  recipientAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  walletType: "sui"
};

const purchaseResponse = await wallet.sendFunds(playerWallet.uuid, purchasePayload);
```

---

## 📚 Complete API Reference

### **`Wallet` Class Constructor**

```typescript
constructor(apiKey: string, businessId: string, secretKey: string)
```

**Parameters:**
- `apiKey` (string): Your Mileston API key
- `businessId` (string): Your business identifier
- `secretKey` (string): Your wallet secret key for signature generation

---

### **Core Methods**

#### **`sendPayment(payload: SendFundsPayload): Promise<SendFundsResponse>`**

Send a payment from the main wallet.

**Parameters:**
```typescript
interface SendFundsPayload {
  amount: string;           // Amount to send (e.g., "100.00")
  recipientAddress: string; // Recipient's blockchain address
  walletType: WalletType;  // Blockchain type ("sui", "eth", "avax", etc.)
}
```

**Returns:**
```typescript
interface SendFundsResponse {
  statusCode: number; // HTTP status code
  message: string;    // Response message
}
```

---

#### **`createSubWallet(): Promise<CreateSubWalletResponseData>`**

Create a new sub-wallet without specifying type.

**Returns:**
```typescript
interface CreateSubWalletResponseData {
  publicKey: string;      // Public key of the created wallet
  uuid: string;          // Unique identifier for the wallet
  recoveryPhrase: string; // Recovery phrase for wallet backup
}
```

---

#### **`createNewSubWallet(payload: CreateSubWalletPayload): Promise<CreateNewSubWalletResponseData>`**

Create a new sub-wallet with specific type.

**Parameters:**
```typescript
interface CreateSubWalletPayload {
  subWalletUuid: string;  // Custom UUID for the sub-wallet
  walletType: WalletApiType; // Blockchain type
}
```

**Returns:**
```typescript
interface CreateNewSubWalletResponseData {
  type: WalletType;    // Type of the created wallet
  address: string;     // Wallet address
  balance: string;     // Initial balance
}
```

---

#### **`getSubWallet(subWalletUuid: string): Promise<GetSubWalletResponseData>`**

Get details of a specific sub-wallet.

**Parameters:**
- `subWalletUuid` (string): UUID of the sub-wallet

**Returns:**
```typescript
interface GetSubWalletResponseData {
  type: 'all';
  address: IWalletAddress;     // Addresses across all blockchains
  balance: string;             // Total balance across all chains
  balances: IWalletBalances;   // Balance for each blockchain
}
```

---

#### **`getAllSubWallets(): Promise<WalletResponse>`**

Get all sub-wallets with their details.

**Returns:**
```typescript
interface WalletResponse {
  statusCode: number;
  message: string;
  data: GetAllSubWalletsResponseData;
}
```

---

#### **`sendFunds(subWalletUuid: string, payload: SendFundsPayload): Promise<SendFundsResponse>`**

Send funds from a specific sub-wallet.

**Parameters:**
- `subWalletUuid` (string): UUID of the sub-wallet
- `payload` (SendFundsPayload): Payment details

**Returns:**
```typescript
interface SendFundsResponse {
  statusCode: number;
  message: string;
}
```

---

#### **`deleteSubWallet(subWalletUuid: string): Promise<WalletResponse>`**

Delete a sub-wallet.

**Parameters:**
- `subWalletUuid` (string): UUID of the sub-wallet to delete

**Returns:**
```typescript
interface WalletResponse {
  statusCode: number;
  message: string;
  data: any;
}
```

---

#### **`batchPayment(payload: BatchPaymentPayload): Promise<BatchPaymentResponse>`**

Send multiple payments in a single transaction.

**Parameters:**
```typescript
interface BatchPaymentPayload {
  recipients: string[];     // Array of recipient addresses
  amounts: string[];        // Array of amounts (must match recipients length)
  walletType: WalletApiType; // Blockchain type
}
```

**Returns:**
```typescript
interface BatchPaymentResponse {
  statusCode: number;
  message: string;
  data: {};
}
```

---

#### **`getTransactionStatus(transactionUuid: string): Promise<TransactionStatusResponse>`**

Get the status of a specific transaction.

**Parameters:**
- `transactionUuid` (string): UUID of the transaction

**Returns:**
```typescript
interface TransactionStatusResponse {
  statusCode: number;
  message: string;
  data: {
    transactionUUID: string;
    status: string;           // "pending", "completed", "failed"
    amount: string;
    recipientAddress: string;
    walletType: string;
    signature?: string;       // Transaction hash/signature
    createdAt: Date;
    updatedAt: Date;
  };
}
```

---

## 🔧 Type Definitions

### **Supported Wallet Types**

```typescript
type WalletApiType = "sui" | "eth" | "avax" | "pol" | "base" | "arb" | "solana";
type WalletType = "sui" | "eth" | "avax" | "pol" | "base" | "arb" | "solana" | "all";
```

### **Wallet Address Interface**

```typescript
interface IWalletAddress {
  sui?: string;
  eth?: string;
  avax?: string;
  pol?: string;
  base?: string;
  arb?: string;
  solana?: string;
}
```

### **Wallet Balances Interface**

```typescript
interface IWalletBalances {
  sui?: string;
  eth?: string;
  avax?: string;
  pol?: string;
  base?: string;
  arb?: string;
  solana?: string;
}
```

---

## 🛡️ Security Best Practices

### **1. Secure Key Management**

```typescript
// ✅ Good: Use environment variables
const wallet = new Wallet(
  process.env.MILESTON_API_KEY!,
  process.env.MILESTON_BUSINESS_ID!,
  process.env.MILESTON_SECRET_KEY!
);

// ❌ Bad: Hardcode credentials
const wallet = new Wallet("hardcoded-key", "hardcoded-id", "hardcoded-secret");
```

### **2. Error Handling**

```typescript
try {
  const response = await wallet.sendPayment(paymentPayload);
  console.log("Payment successful:", response);
} catch (error) {
  console.error("Payment failed:", error.message);
  // Handle error appropriately
}
```

### **3. Transaction Verification**

```typescript
// Always verify transaction status
const transactionUuid = await wallet.sendPayment(paymentPayload);
const status = await wallet.getTransactionStatus(transactionUuid);

if (status.data.status === "completed") {
  console.log("Transaction confirmed!");
} else if (status.data.status === "failed") {
  console.error("Transaction failed:", status.data);
}
```

### **4. Input Validation**

```typescript
// Validate amounts before sending
const amount = "100.00";
if (parseFloat(amount) <= 0) {
  throw new Error("Amount must be greater than 0");
}

// Validate recipient address
const recipientAddress = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6";
if (!recipientAddress.startsWith("0x")) {
  throw new Error("Invalid Ethereum address format");
}
```

---

## 🚨 Error Handling

The Wallet API uses standard HTTP status codes and provides detailed error messages:

```typescript
try {
  const response = await wallet.sendPayment(payload);
} catch (error) {
  if (error.response?.status === 401) {
    console.error("Authentication failed - check your API keys");
  } else if (error.response?.status === 400) {
    console.error("Invalid request - check your payload");
  } else if (error.response?.status === 404) {
    console.error("Resource not found");
  } else if (error.response?.status === 500) {
    console.error("Server error - try again later");
  } else {
    console.error("Unexpected error:", error.message);
  }
}
```

---

## 📊 Transaction Statuses

| Status | Description | Action Required |
|--------|-------------|-----------------|
| **`pending`** | Transaction is being processed | Wait for completion |
| **`completed`** | Transaction successful | None - funds transferred |
| **`failed`** | Transaction failed | Check error details and retry |
| **`cancelled`** | Transaction was cancelled | Create new transaction if needed |

---

## 🔄 Rate Limits

The Wallet API implements rate limiting to ensure fair usage:

- **100 requests per minute** per API key
- **1000 requests per hour** per API key
- **10,000 requests per day** per API key

Monitor your usage and implement appropriate retry logic with exponential backoff.

---

## 🎯 Pro Tips

### **1. Use Sub-Wallets for Organization**

```typescript
// Create dedicated wallets for different purposes
const customerPaymentsWallet = await wallet.createSubWallet();
const operationalExpensesWallet = await wallet.createSubWallet();
const marketingBudgetWallet = await wallet.createSubWallet();
```

### **2. Implement Retry Logic**

```typescript
const sendPaymentWithRetry = async (payload, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await wallet.sendPayment(payload);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};
```

### **3. Monitor Transaction Status**

```typescript
const waitForTransaction = async (transactionUuid, maxAttempts = 30) => {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await wallet.getTransactionStatus(transactionUuid);
    
    if (status.data.status === "completed") {
      return status;
    } else if (status.data.status === "failed") {
      throw new Error("Transaction failed");
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  }
  
  throw new Error("Transaction timeout");
};
```

### **4. Batch Operations for Efficiency**

```typescript
// Process multiple payments efficiently
const payments = [
  { recipient: "0x123...", amount: "50.00" },
  { recipient: "0x456...", amount: "75.00" },
  { recipient: "0x789...", amount: "25.00" }
];

const batchPayload = {
  recipients: payments.map(p => p.recipient),
  amounts: payments.map(p => p.amount),
  walletType: "eth"
};

const batchResponse = await wallet.batchPayment(batchPayload);
```

---

## 🤝 Support

Need help with the Wallet API? Here are your options:

- **📚 Documentation:** This comprehensive guide covers all features
- **🐛 Issues:** Report bugs on our GitHub repository
- **💬 Community:** Join our Discord for developer discussions
- **📧 Email:** Contact support@mileston.co for urgent issues

---

## 🎉 Start Building!

You're now ready to integrate the Wallet API into your application! Here's a quick start:

```typescript
import { Wallet } from "mileston-payments";

const wallet = new Wallet(
  process.env.MILESTON_API_KEY!,
  process.env.MILESTON_BUSINESS_ID!,
  process.env.MILESTON_SECRET_KEY!
);

// Create your first sub-wallet
const subWallet = await wallet.createSubWallet();
console.log("Your sub-wallet:", subWallet.uuid);

// Send your first payment
const payment = await wallet.sendPayment({
  amount: "10.00",
  recipientAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  walletType: "eth"
});
console.log("Payment sent:", payment);
```

Happy coding! 🚀✨ 