const hre = require("hardhat");

async function main() {
  const signers = await hre.conflux.getSigners();
  const defaultAccount = signers[0];

  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const recipientAddress = "NFT_RECEIVER_ADDRESS"; // Address to receive the NFT
  const tokenURI = "https://yourdomain.com/metadata/1.json"; // The metadata URI for the NFT

  const ConfluxCRC721NFT = await hre.conflux.getContractAt(
    "ConfluxCRC721NFT",
    contractAddress
  );

  const receipt = await ConfluxCRC721NFT.mint(recipientAddress, tokenURI)
    .sendTransaction({
      from: defaultAccount.address,
    })
    .executed();

  console.log(
    `Minted NFT to ${recipientAddress}: Transaction Hash: ${receipt.transactionHash}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
