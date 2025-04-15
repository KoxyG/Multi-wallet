# Trust Wallet Core Sample with Vite.js

This project demonstrates the integration of Trust Wallet Core with Vite.js to create and manage cryptocurrency wallets, as well as sign transactions.

## Getting Started

These instructions will guide you through setting up and running the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 12 or higher)
- Yarn (version 1.22 or higher)
- Vite.js

## Environment Variables

This project uses environment variables to store sensitive information like API keys. To set up your environment:

1. Copy the `.env.example` file to a new file named `.env`:
   ```
   cp .env.example .env
   ```

2. Edit the `.env` file and add your API keys:
   ```
   VITE_CMC_API_KEY=your_coinmarketcap_api_key_here
   VITE_COINGECKO_API_KEY=your_coingecko_api_key_here
   ```

3. Never commit the `.env` file to version control.

Note: In Vite.js, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

# Multi-wallet
