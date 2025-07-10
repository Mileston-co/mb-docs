# Supported Chains and Tokens

This document provides an overview of the blockchain networks (chains) and tokens supported. It includes details for both mainnet (production) and testnet environments.

## Mainnet (Production)

| Chain     | Supported Tokens |
| --------- | ---------------- |
| Ethereum  | USDC, USDT, EURC |
| Polygon   | USDC, EURC       |
| Avalanche | USDC, USDT, EURC |
| Arbitrum  | USDC             |
| Base      | USDC, EURC       |
| Solana    | USDC, USDT       |
| Sui       | USDC             |

## Testnet

| Chain     | Supported Tokens |
| --------- | ---------------- |
| Ethereum  | USDC, EURC       |
| Polygon   | USDC             |
| Avalanche | USDC, EURC       |
| Arbitrum  | USDC             |
| Base      | USDC, EURC       |
| Solana    | USDC             |
| Sui       | USDC             |

## Native Tokens Supported on Checkout

The following native tokens are supported **only on the Checkout** (not for payouts or settlements):

- **Ethereum**: ETH
- **Polygon**: POL
- **Avalanche**: AVAX
- **Base**: ETH
- **Arbitrum**: ETH
- **Solana**: SOL

**Note:** Native tokens (ETH, POL, AVAX, SOL) are available **only for payment via the Checkout**. They are not available for payouts or settlements. USDC, USDT, and EURC remain the primary settlement tokens.

## Testnet Token Limitations

### Why Some Tokens Are Not Available on Testnets

Certain tokens are not available on testnet environments due to the following reasons:

#### **USDT (Tether)**
- **Reason**: USDT testnet contracts are often unstable or have limited liquidity
- **Impact**: Smart contract swaps may fail or result in errors
- **Solution**: Use USDC as an alternative on testnets

#### **ETH (Ethereum)**
- **Reason**: Testnet ETH has no real value and smart contract swaps require actual token value
- **Impact**: Payment processing would fail when attempting to swap testnet ETH
- **Solution**: Use USDC for testnet payments on Ethereum

#### **AVAX (Avalanche)**
- **Reason**: Testnet AVAX tokens cannot be swapped through smart contracts
- **Impact**: Payment processing would fail during token conversion
- **Solution**: Use USDC or USDT (if available) for testnet payments on Avalanche

#### **POL (Polygon)**
- **Reason**: Testnet POL tokens lack the liquidity needed for smart contract swaps
- **Impact**: Payment processing would fail when attempting to swap testnet POL
- **Solution**: Use USDC for testnet payments on Polygon

#### **SOL (Solana)**
- **Reason**: Testnet SOL tokens cannot be reliably swapped through smart contracts
- **Impact**: Payment processing would fail during token conversion on Solana testnet
- **Solution**: Use USDC for testnet payments on Solana

### What This Means for Developers

When testing your integration on testnets:

1. **Use USDC**: USDC is the most reliable token for testnet environments across all supported chains
2. **Check Token Availability**: The payment components will automatically show which tokens are unavailable on testnets
3. **Production vs Testnet**: All tokens are available on mainnet (production) environments
4. **Error Prevention**: Unavailable tokens are disabled in the UI to prevent payment failures

### Testing Recommendations

- **Primary Testing**: Use USDC for all testnet payment testing
- **Production Testing**: Test with all available tokens on mainnet before going live
- **UI Testing**: Verify that unavailable tokens are properly labeled in your payment components

## Notes

- **Tether (USDT)**: Not supported on testnets for most chains due to contract instability.
- **Euro Coin (EURC)**: Supported on Ethereum, Polygon, Avalanche, and Base in both mainnet and testnet environments.
- **Solana**: Uses token addresses instead of ABIs for USDC and USDT.
- **Sui**: Supports USDC on both testnet and mainnet.
- **Native tokens (ETH, POL, AVAX, etc.) are only available for payment on Checkout and not for payouts.**
- **Testnet Limitations**: Some tokens are disabled on testnets to prevent smart contract swap failures.
