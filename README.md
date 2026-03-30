# 🥤 Decentralized Vending Machine (Full Stack Web3)

A **full-stack decentralized vending machine dApp** built using **Solidity, Hardhat, React, and Ethers.js**, deployed on the **Sepolia testnet**, with real blockchain transactions via MetaMask.

---

## 🚀 Features

- 🛒 Buy soda using ETH (real blockchain transaction)
- 💰 Dynamic pricing via oracle contract
- 🔐 Owner-only withdrawal of funds
- 📦 Inventory management system
- 🔁 Owner-controlled restocking
- ❌ Reverts on incorrect payment & out-of-stock
- 📢 Event emission on successful purchase
- 🧪 Full test coverage using Hardhat & Chai
- ⛽ Gas usage reporting
- 🎨 Modern animated UI (React + Tailwind + Framer Motion)
- 🔗 MetaMask wallet integration

---

## 🌐 Live Demo

> https://vending-machine-hard-hat.vercel.app/

---

## 📜 Deployed Contracts (Sepolia)

- **VendingMachine:** `0xaC8C7f94ABDE0485BbCC44fC470df0737e583453`
- **SodaVendor (Oracle):** `0xB5ac915072EE58fb08f7810FE4e001746074AA35`

---

## 🧠 Architecture

```
User (MetaMask)
   ↓
Frontend (React + Ethers.js)
   ↓
VendingMachine Contract
   ↓
SodaVendor (Oracle)
```

---

## 🛠 Tech Stack

- **Solidity** – Smart contract development
- **Hardhat** – Development, testing & deployment
- **Ethers.js** – Blockchain interaction
- **React (Vite)** – Frontend
- **Tailwind CSS** – Styling
- **Framer Motion** – Animations
- **MetaMask** – Wallet integration
- **Sepolia Testnet** – Deployment network

---

## ⚙️ Installation

```bash
git clone <your-repo-url>
cd vending-machine
npm install
```

---

## 🧪 Run Tests

```bash
npx hardhat test
```

---

## 🚀 Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in root:

```
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_wallet_private_key
```

---

## 📸 Proof of Transaction

- Successfully purchased soda via MetaMask
- ETH deducted from wallet
- Transaction confirmed on Sepolia
- Event emitted on-chain

---

## 🧾 Smart Contract Functionalities

### 🛒 Buy Soda

- Fetches price from oracle
- Requires exact ETH payment
- Reduces stock on success

### 🔁 Restock Inventory

- Only owner can restock
- Prevents invalid input

### 💰 Withdraw Funds

- Only owner can withdraw full balance

### 💲 Dynamic Pricing

- Managed via separate oracle contract
- Can update price without redeploying main contract

---

## 🧪 Test Coverage

- ✔️ Owner validation
- ✔️ Payment validation
- ✔️ Unauthorized access prevention
- ✔️ Stock depletion handling
- ✔️ Restocking functionality
- ✔️ Oracle price updates
- ✔️ Event emission verification

---

## 📈 Future Improvements

- 🌐 Deploy frontend (Vercel)
- 📊 Admin dashboard
- 🧠 Chainlink oracle integration
- 🛍 Multi-product vending system
- 📱 Mobile UI optimization

---

## 📸 UI Preview

Before --

<p align="center">
  <img src="./screenshots/ss1 (2).png" width="800"/>
</p>

After--

<p align="center">
<img src="./screenshots/ss1 (1).png" width="800"/>
</p>

--Deployed Contract

<p align="center">
<img src="./screenshots/test-result.png" width="800"/>

</p>
## 🤝 Contributing

Feel free to fork and improve this project!

---

## 📜 License

MIT License

---

## 💡 Author

**Ujjwal Kumar**
Built with ❤️ using Web3 technologies 🚀
