const { ethers, run, network } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log(`Deployed contract to ${simpleStorage.address}`)

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block transactions...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is ${currentValue}`)

  // Set the current value
  const transactionReponse = await simpleStorage.store(7)
  await transactionReponse.wait(1)

  // Set the updated value
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is ${updatedValue}`)
}

// Can programmatically create a new task - this one is defined by default when using the etherscan.io API, but lets type it out as if it wasn't
async function verify(contractAddress, args) {
  console.log("Verifying Contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("already verified")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
