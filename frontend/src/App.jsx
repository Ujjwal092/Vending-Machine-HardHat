/* eslint-disable react-hooks/set-state-in-effect */
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

  //  Connect Wallet
  const connectWallet = async () => {
    try {
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc[0]);
      toast.success("Wallet Connected 🚀");
    } catch {
      toast.error("Connection Failed ❌");
    }
  };

  //  Load Data
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

    setPrice(Number(p) / 1e18);
    setStock(Number(s));
  };

  //  Buy Soda
  const buySoda = async () => {
    setLoading(true);
    try {
      const contract = await getContract();

      const oracleAddr = await contract.priceOracle();
      const provider = new ethers.BrowserProvider(window.ethereum);

      const oracle = new ethers.Contract(
        oracleAddr,
        ["function getPrice() view returns(uint)"],
        provider,
      );

      const rawPrice = await oracle.getPrice();

      const tx = await contract.buySoda({
        value: rawPrice,
      });

      toast.loading("Transaction Pending...");

      await tx.wait();

      toast.dismiss();
      toast.success("🥤 Soda Purchased!");

      loadData();
    } catch (err) {
      toast.dismiss();
      console.log(err);
      toast.error("Transaction Failed ❌");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (account) loadData();
  }, [account]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-[380px] text-center shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6">🥤 Vending Machine</h1>

        <button
          onClick={connectWallet}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl w-full"
        >
          {account ? "Connected ✅" : "Connect Wallet"}
        </button>

        <p className="text-sm mt-2 text-gray-400">
          {account && account.slice(0, 6) + "..." + account.slice(-4)}
        </p>

        <div className="flex justify-between mt-6 gap-3">
          <div className="bg-blue-500/20 p-4 rounded-xl w-full">
            <p>Price</p>
            <h2>{price || "--"} ETH</h2>
          </div>

          <div className="bg-green-500/20 p-4 rounded-xl w-full">
            <p>Stock</p>
            <h2>{stock || "--"}</h2>
          </div>
        </div>

        <button
          onClick={buySoda}
          disabled={loading}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 py-3 w-full rounded-xl"
        >
          {loading ? "Processing..." : "Buy Soda 🛒"}
        </button>
      </motion.div>
    </div>
  );
}

export default App;
