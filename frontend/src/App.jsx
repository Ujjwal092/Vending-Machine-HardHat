import { useEffect, useState } from "react";
import { getContract } from "./contract";
import { ethers } from "ethers";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [account, setAccount] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  //  Connect Wallet
  const connectWallet = async () => {
    try {
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc[0]);
      toast.success("Wallet Connected 🚀");
    } catch {
      toast.error("Connection Failed");
    }
  };

  //  Load data
  const loadData = async () => {
    const contract = await getContract();

    const oracleAddr = await contract.priceOracle();
    const provider = new ethers.BrowserProvider(window.ethereum);

    const oracle = new ethers.Contract(
      oracleAddr,
      ["function getPrice() view returns(uint)"],
      provider,
    );

    const p = await oracle.getPrice();
    const s = await contract.soda();
    const owner = await contract.owner();

    setPrice(Number(p) / 1e18);
    setStock(Number(s));
    setIsOwner(owner.toLowerCase() === account.toLowerCase());
  };

  //  Buy Soda
  const buySoda = async () => {
    setLoading(true);
    const contract = await getContract();

    try {
      const oracleAddr = await contract.priceOracle();
      const provider = new ethers.BrowserProvider(window.ethereum);

      const oracle = new ethers.Contract(
        oracleAddr,
        ["function getPrice() view returns(uint)"],
        provider,
      );

      const price = await oracle.getPrice();

      const tx = await contract.buySoda({
        value: price,
      });
      toast.loading("Transaction Pending...");

      await tx.wait();
      toast.dismiss();
      toast.success("🥤 Soda Purchased!");

      await loadData();
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error("Transaction Failed ❌");
    }

    setLoading(false);
  };

  //  Restock
  const restock = async () => {
    setLoading(true);
    const contract = await getContract();

    try {
      const tx = await contract.addStock(10);
      toast.loading("Restocking...");

      await tx.wait();
      toast.dismiss();
      toast.success("📦 Stock Added!");

      await loadData();
    } catch {
      toast.dismiss();
      toast.error("Restock Failed ❌");
    }

    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (account) loadData();
  }, [account]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center"
      >
        {/* Title */}
        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl font-bold mb-6"
        >
          🥤 Vending Machine
        </motion.h1>

        {/* Wallet */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={connectWallet}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl shadow-lg"
        >
          {account ? "Connected ✅" : "Connect Wallet"}
        </motion.button>

        <p className="text-gray-300 text-sm mt-2">
          {account && account.slice(0, 6) + "..." + account.slice(-4)}
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500/20 p-4 rounded-xl"
          >
            <p className="text-sm text-gray-300">Price</p>
            <h2 className="text-xl font-bold">{price || "--"} ETH</h2>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-500/20 p-4 rounded-xl"
          >
            <p className="text-sm text-gray-300">Stock</p>
            <h2 className="text-xl font-bold">{stock || "--"}</h2>
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={buySoda}
            className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl"
          >
            {loading ? "Processing..." : "Buy Soda 🛒"}
          </motion.button>

          {isOwner && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restock}
              className="bg-red-500 hover:bg-red-600 py-3 rounded-xl"
            >
              Restock (Owner)
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
