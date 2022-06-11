// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage, verify
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should initialize state with 0", async function () {
    const expectedValue = "0"
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should update state when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  // it("Should test that the address is corerct", async function () {
  //   const verify = async function (contractAddress, args) {
  //     console.log("Verifying Contract...")
  //     try {
  //       await run("verify:verify", {
  //         address: contractAddress,
  //         constructorArguments: args
  //       })
  //     } catch (e) {
  //       if (e.message.toLowerCase().includes("already verified")) {
  //         console.log("already verified")
  //       } else {
  //         console.log(e)
  //       }
  //     }
  //   }

  //   const address = simpleStorage.address
  //   assert(verify(address), true)
  // })
})
