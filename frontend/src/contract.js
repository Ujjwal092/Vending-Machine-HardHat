import { ethers } from "ethers";
import abi from "./abi/VendingMachine.json";
export const CONTRACT_ADDRESS = "0xaC8C7f94ABDE0485BbCC44fC470df0737e583453";

export const getContract = async () => {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
};
