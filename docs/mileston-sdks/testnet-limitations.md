# Testnet Limitations

This page explains why certain tokens are not available on testnet environments and how this affects your development and testing process.

## Overview

When developing with Mileston's payment SDKs on testnet environments, you'll notice that some tokens are marked as "Testnet Unavailable" in the payment components. This is by design to prevent payment failures and provide a better development experience.

## Why Some Tokens Are Not Available on Testnets

### Smart Contract Swap Requirements

The Mileston payment system uses smart contract swaps to convert tokens during payment processing. On testnets, certain tokens cannot be reliably swapped due to:

1. **Limited Liquidity**: Testnet tokens often lack the liquidity needed for swaps
2. **Contract Instability**: Testnet contracts may be unstable or frequently updated
3. **No Real Value**: Testnet tokens have no real value, making swaps impossible
4. **Network Limitations**: Some testnet networks have limited functionality

### Affected Tokens

The following tokens are not available on testnet environments:

| Token | Chain | Reason |
|-------|-------|--------|
| **USDT** | All chains | Testnet contracts are unstable with limited liquidity |
| **ETH** | Ethereum | Testnet ETH has no real value for smart contract swaps |
| **AVAX** | Avalanche | Testnet AVAX cannot be swapped through smart contracts |
| **POL** | Polygon | Testnet POL lacks liquidity for smart contract swaps |

## Impact on Development

### What You'll See

When using the payment components on testnet (`env="test"`):

- **Disabled Tokens**: Unavailable tokens are grayed out and cannot be selected
- **Visual Labels**: Tokens show "Testnet Unavailable" badges
- **Learn More Links**: Direct links to this documentation
- **Error Prevention**: Prevents payment failures due to unsupported tokens

### Example UI Behavior

```jsx
// In your payment component
<PaymentOptions 
  env="test"  // This triggers the limitations
  amount="100"
  // ... other props
/>
```

**Result**: USDT, ETH, AVAX, and POL tokens will be disabled with warning labels.

## Recommended Testing Strategy

### 1. Testnet Testing (Development)

**Primary Token**: Use **USDC** for all testnet testing
- Most reliable across all chains
- Stable testnet contracts
- Consistent behavior

**Testing Checklist**:
- ✅ Test payment flow with USDC
- ✅ Verify UI shows unavailable tokens as disabled
- ✅ Test error handling for disabled tokens
- ✅ Verify "Learn more" links work correctly

### 2. Production Testing (Before Go-Live)

**All Tokens**: Test with all available tokens on mainnet
- USDC, USDT, ETH, AVAX, POL, SOL
- Verify real payment processing
- Test with actual token values

### 3. UI Testing

**Component Verification**:
- Check that unavailable tokens are properly labeled
- Verify "Learn more" links point to documentation
- Test that disabled tokens cannot be selected
- Ensure consistent styling across all payment methods

## Code Examples

### React Components

The payment components automatically handle testnet limitations:

```jsx
import { PaymentOptions } from '@mileston/payment-client';

function MyPaymentPage() {
  return (
    <PaymentOptions
      env="test"  // Triggers testnet limitations
      amount="50.00"
      recipientWalletAddress={{
        eth: "0x...",
        avax: "0x...",
        // ... other addresses
      }}
      onPaymentComplete={(networkId, tokenId) => {
        console.log(`Payment completed with ${tokenId} on ${networkId}`);
      }}
      onPaymentError={(error) => {
        console.error('Payment failed:', error);
      }}
    />
  );
}
```

### Available vs Unavailable Tokens

| Environment | Available Tokens | Unavailable Tokens |
|-------------|------------------|-------------------|
| **Testnet** | USDC, EURC | USDT, ETH, AVAX, POL |
| **Mainnet** | All tokens | None |

## Troubleshooting

### Common Issues

**Q: Why can't I select USDT on testnet?**
A: USDT testnet contracts are unstable. Use USDC instead.

**Q: Why is ETH disabled on testnet?**
A: Testnet ETH has no real value for smart contract swaps.

**Q: How do I test with all tokens?**
A: Switch to `env="prod"` and use mainnet addresses.

**Q: The "Learn more" link doesn't work**
A: Ensure you're using the latest version of the payment client.

### Best Practices

1. **Always test with USDC first** on testnet
2. **Verify UI behavior** with unavailable tokens
3. **Test on mainnet** before going live
4. **Keep documentation updated** when new limitations are added

## Technical Details

### Smart Contract Swap Process

1. User selects a token for payment
2. System attempts to swap the token through smart contracts
3. On testnet, some tokens fail this swap process
4. To prevent failures, these tokens are disabled in the UI

### Environment Detection

The system automatically detects the environment:

```javascript
// Testnet behavior
if (env === 'test') {
  // Disable problematic tokens
  const unavailableTokens = ['USDT', 'ETH', 'AVAX', 'POL'];
}

// Mainnet behavior
if (env === 'prod') {
  // All tokens available
  const allTokens = ['USDC', 'USDT', 'ETH', 'AVAX', 'POL', 'SOL'];
}
```

## Support

If you encounter issues with testnet limitations:

1. **Check this documentation** for the latest information
2. **Use USDC for testing** as the most reliable testnet token
3. **Contact support** if you need help with mainnet testing
4. **Report bugs** if the UI doesn't properly show unavailable tokens

---

**Note**: These limitations only apply to testnet environments. All tokens are fully supported on mainnet (production) environments. 