# 🥤 Decentralized Vending Machine (Solidity + Hardhat)

A fully tested **decentralized vending machine system** built using **Solidity, Hardhat, and Ethers.js**, featuring **oracle-based dynamic pricing**, **owner-controlled inventory**, and **secure Ether transactions**.

---

## 🚀 Features

- 🛒 Buy soda using Ether
- 💰 Dynamic pricing via oracle contract
- 🔐 Owner-only withdrawal of funds
- 📦 Inventory management system
- 🔁 Owner-controlled restocking
- ❌ Reverts on incorrect payment & out-of-stock
- 📢 Event emission on successful purchase
- 🧪 Full test coverage using Hardhat & Chai
- ⛽ Gas usage reporting

---

## 🧠 Architecture

```text
User → VendingMachine → SodaVendor (Oracle)
                     ↘ Ownable (Access Control)
```

- **VendingMachine** → Handles purchasing logic & stock
- **SodaVendor (Oracle)** → Provides dynamic pricing
- **Ownable** → Restricts critical functions to owner

---

## 🛠 Tech Stack

- **Solidity** – Smart contract development
- **Hardhat** – Development & testing framework
- **Ethers.js** – Blockchain interaction
- **Hardhat Ignition** – Deployment management
- **Chai** – Assertion library for testing

---

## 📂 Project Structure

```
├── contracts/
│   ├── VendingMachine.sol
│   ├── SodaVendor.sol
│   ├── Ownable.sol
│   └── IoraclePrice.sol
│
├── ignition/
│   └── modules/
│
├── test/
│   └── VendingMachine.test.js
│
├── screenshots/
│   └── test-result.png
│
├── hardhat.config.js
└── package.json
```

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

### ⛽ Gas Report

```bash
REPORT_GAS=true npx hardhat test
```

---

## 🧾 Run Local Blockchain

```bash
npx hardhat node
```

---

## 🚀 Deploy Contract (Ignition)

```bash
npx hardhat ignition deploy ./ignition/modules/Deploy.js
```

---

## 📸 Test Results & Gas Report

<p align="center">
  <img src="./screenshots/test-result.png" width="850"/>
</p>

---

## 📜 Smart Contract Functionalities

### 🛒 Buy Soda

- Fetches price from oracle contract
- Requires exact Ether payment
- Reduces stock after successful purchase

---

### 🔁 Restock Inventory

- Only owner can restock
- Prevents invalid input (zero stock)

---

### 💰 Withdraw Funds

- Only owner can withdraw contract balance
- Secure transfer of full balance

---

### 💲 Dynamic Pricing (Oracle)

- Price managed in separate contract (`SodaVendor`)
- Can be updated without redeploying vending machine

---

### 📢 Events

- Emits `SodaPurchase` event on successful purchase

---

## 🧪 Test Coverage

Includes comprehensive test cases:

- ✔️ Owner validation
- ✔️ Payment validation (correct & incorrect)
- ✔️ Unauthorized withdrawal prevention
- ✔️ Stock depletion handling
- ✔️ Restocking functionality
- ✔️ Oracle price updates
- ✔️ Event emission verification

---

## 📈 Future Improvements

- 🎨 Frontend (React + Ethers.js)
- 🌐 Deployment on Sepolia testnet
- 🧠 Chainlink oracle integration
- 🛍 Multi-product vending system
- 📊 Admin dashboard

---

## 🧾 Resume Highlight

> Built a decentralized vending machine smart contract with oracle-based dynamic pricing, owner-controlled inventory, and comprehensive test coverage using Hardhat.

---

## 🤝 Contributing

Feel free to fork and improve this project!

---

## 📜 License

MIT License

---

## 💡 Author

**Ujjwal Kumar**
Built with ❤️ using Solidity & Hardhat

## 💡 Author

Ujjwal Kumar
Built with ❤️ using Hardhat & Solidity

---

## 📸 Test Results & Gas Report

<p align="center">
  <img src="./screenshots/test-result.png" width="800"/>
</p>
