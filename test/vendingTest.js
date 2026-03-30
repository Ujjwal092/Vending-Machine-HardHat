const { expect } = require("chai");
//chai is assertion library, it provides functions to write assertions in our tests and verify the expected behavior of our contract
const VendingModule = require("../ignition/modules/Deploy");
//ignition contains deployment modules,tells us order of deployment and how and when contract will deploy

const { ethers, ignition } = require("hardhat");
// hardhat is development environment for Ethereum, it provides tools and libraries to compile, deploy, test and debug smart contracts. We import ethers for interacting with our contracts and ignition for managing our deployment modules.

const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { parseEther } = require("ethers");

describe("Testing our Vending Machine", function () {
  // deploy the contract

  async function vendingMachineDeploy() {
    // Ether chaiye hoga
    // total 20 account return karke dega jo free honge (array)
    const [owner, buyer] = await ethers.getSigners();
    const { vendingMachine, sodaVendor } = await ignition.deploy(VendingModule);

    return { owner, vendingMachine, sodaVendor, buyer };
  }

  //checking if the owner of vending machine is same as deployer or not, if not then test will fail
  it("Should Correctly set the Deployer as owner", async function () {
    const { owner, vendingMachine } = await loadFixture(vendingMachineDeploy);

    //    const ownerOfVendingMachine = await vendingMachine.owner();

    expect(await vendingMachine.owner()).to.equal(owner.address);
    //await andar use kiye h coz jab tk owner ka address nai aata tb tk check naai kr skte
  });

  //test 2: Check if the price is set correctly in the soda vendor if yes test
  it("Should Revert if some Payment is failed", async function () {
    const { buyer, vendingMachine, sodaVendor } = await loadFixture(
      vendingMachineDeploy,
    );

    const price = 1;
    // 1 wei

    await expect(
      vendingMachine.connect(buyer).buySoda({ value: price }),
    ).to.be.revertedWith("Incorrect Payment amount for Soda"); //in case buyer is sending incorrect amount of ether, the transaction should be reverted with this error message so await is used outside expect to wait for the transaction to be processed and then check if it was reverted with the expected error message. If the transaction is not reverted or if it is reverted with a different error message, the test will fail.
  });

  //test 3: Check if the buyer can successfully purchase a soda and the stock decreases accordingly
  it("Should prevent non-owners from withdrawing funds", async function () {
    const { buyer, vendingMachine, sodaVendor } = await loadFixture(
      vendingMachineDeploy,
    );

    const price = await sodaVendor.getPrice();

    await vendingMachine.connect(buyer).buySoda({ value: price }); //buyer successfully bought a soda

    await expect(vendingMachine.connect(buyer).withdraw()).to.be.revertedWith(
      "You are not a Owner",
    ); // non-owners should not be able to withdraw funds, so we expect this transaction to be reverted with the error message "You are not a Owner". If the transaction is not reverted or if it is reverted with a different error message, the test will fail.
  });

  //test 4: Check if the vending machine prevents purchases when the stock is depleted
  it("Should Prevent Buying Soda if stock is zero", async function () {
    const { buyer, vendingMachine, sodaVendor } = await loadFixture(
      vendingMachineDeploy,
    );

    const price = await sodaVendor.getPrice();

    for (let i = 0; i < 100; i++) {
      await vendingMachine.connect(buyer).buySoda({ value: price });
    }

    expect(await vendingMachine.soda()).to.equal(0);

    await expect(
      vendingMachine.connect(buyer).buySoda({ value: price }),
    ).to.be.revertedWith("Soda, out of stock!");
  });

  //test 5: Check if the owner can successfully withdraw funds from the vending machine
  it("Should transfer the full balance to the owner upon withdrawal", async function () {
    const { buyer, vendingMachine, sodaVendor, owner } = await loadFixture(
      vendingMachineDeploy,
    );

    const price = await sodaVendor.getPrice();
    await vendingMachine.connect(buyer).buySoda({ value: price });

    // vending machine balance increased

    await expect(
      vendingMachine.connect(owner).withdraw(),
    ).to.changeEtherBalances([vendingMachine, owner], [-price, price]);
  });

  //test 6: Check if the correct event is emitted when a soda is purchased
  it("Should emit a SodaPurchase event with correct arguments on success", async function () {
    const { buyer, vendingMachine, sodaVendor } = await loadFixture(
      vendingMachineDeploy,
    );
    const price = await sodaVendor.getPrice();

    await expect(vendingMachine.connect(buyer).buySoda({ value: price }))
      .to.emit(vendingMachine, "SodaPurchase")
      .withArgs(buyer.address, 1);
  });
});
