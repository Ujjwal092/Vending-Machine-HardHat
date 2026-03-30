const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  // Deploy sodaVendor
  const SodaVendor = await hre.ethers.getContractFactory("sodaVendor");
  const sodaVendor = await SodaVendor.deploy();
  await sodaVendor.waitForDeployment();

  const sodaVendorAddress = await sodaVendor.getAddress();

  console.log("SodaVendor:", sodaVendorAddress);

  // Set price
  await sodaVendor.setPrice(hre.ethers.parseEther("0.01"));

  // Deploy vendingMachine
  const VendingMachine = await hre.ethers.getContractFactory("vendingMachine");
  const vendingMachine = await VendingMachine.deploy(sodaVendorAddress);
  await vendingMachine.waitForDeployment();

  const vendingMachineAddress = await vendingMachine.getAddress();

  console.log("VendingMachine:", vendingMachineAddress);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
