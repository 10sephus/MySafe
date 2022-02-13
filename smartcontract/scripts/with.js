const axios = require('axios');
const EthereumTx = require('ethereumjs-tx').Transaction;
// The Contract interface

async function main() {
    
  
  const Zafe = await  ethers.getContractFactory("Safe");
  const accounts = ["0xE4cb9574c0d92d20492C9Ec76BA877D867E5f3FE"
  ,"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  "0x6E40a0a5f36081B2A45230878545B4059Df84451",
  "0xb7839ee8363771746723dB9791868B91ABdE58cA"
  ,"0xc751CE548f841001af0E662A7E48DC9aB1322746"];
  const safe = await Zafe.deploy(2, accounts, 100);
  const options = { value: ethers.utils.parseEther("0.2") }
  const owner = await ethers.getSigners();
  let deposit = await safe.connect(owner[0]).deposit(options);
  deposit = await safe.connect(owner[0]).deposit(options);
  // ca = await safe.connect(owner[0]).checkAccount();
  // console.log(ca);
  // const BlocksToUnlock = await safe.getBlocksToUnlock();
  // console.log(BlocksToUnlock);
  //
//   bal = await safe.getBalance();
//   console.log("Balance is", bal);
//   let provider = ethers.getDefaultProvider();
//    console.log("Safe: " , safe.address);
//    const locks = await safe.getTotalSigners();
//    console.log(`We have ${locks} locks`);
// //   let numlocks = await safe.getLocks();
// //   console.log(`NumLocks ${numlocks} `);
   let unlock = await safe.connect(owner[0]).unLock();
  //  unlock = await safe.connect(owner[1]).unLock();
   console.log(unlock);
//    numlocks = await safe.getTotalSigners();
//    console.log(`NumLocks ${numlocks} `);
//    console.log("-------------------");
//         console.log(owner[2].address);
//      let reset = await safe.resetSafe();
//     let em = await safe.unlockSolo();
//     reset = await safe.resetSafe();
//     bal = await safe.getBalance();
//     console.log("Balance is", bal);
  
    // for (let i = 0; i<99; i++) {
    //   try {
    let withd = await safe.connect(owner[0]).transferAmount("0x5D6205f8D336Cb324454D6ECd986b5b2F5ac0E64", ethers.utils.parseEther("0.001"));
   console.log("andoooooooooo");
    //   } catch(e) {
    //     // console.log("trying /" + i)
    //   }
      
    // }
    // console.log("Balance is", bal);
    // withd = await safe.connect(owner[0]).transferAmount("0x5D6205f8D336Cb324454D6ECd986b5b2F5ac0E64", ethers.utils.parseEther("0.001"));
    // console.log(withd)  
    // console.log("Balance is", bal);
        //


   //  let withd;
  //  let rsafe;
//   let ow = 0;
//   // for (let i = 0; i<5; i++) {
//     // if (i==4) {
//     //   rsafe = await safe.connect(owner[i]).resetSafe();
//     // }
//   try {  
//     withd = await safe.connect(owner).transferAmount("0x5D6205f8D336Cb324454D6ECd986b5b2F5ac0E64", ethers.utils.parseEther("0.001"));
//     } catch (e) {
//       console.log(e);
//     }
//     unlock = await safe.connect(owner[ow]).unLock();
//     // ow++;
//     // if (ow>4) { ow = 0; }
//     numlocks = await safe.getLocks();
//     console.log(`NumLocks ${numlocks} `);
//   // }
//     bal = await safe.getBalance();
//     console.log("Balance is", bal);
  
//   // numlocks = await safe.numLocks();
//     // console.log(`NumLocks ${numlocks}`);

    
  
  
//     // let gasPrices = await getCurrentGasPrices();
//     // console.log(gasPrices);
// // const bal = await safe.getBalance();
// //  //  console.log(withd);
 
//  //  const reciept = await contract.deposit(100);
//  // console.log(owner);
//  // try { 
// //   console.log(e);
// // }
// //   let details = {
// //     "to": "0x5D6205f8D336Cb324454D6ECd986b5b2F5ac0E64",
// //     "value": 1000000000000000000,
// //     "gas": 21000,
// //     "gasPrice": gasPrices.low * 1000000000,
// //     "nonce": 997,
// //     "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
// // }; 

 
// // We connect to the Contract using a Provider, so we will only
// // have read-only access to the Contract
// // contract.methods.addinfo(3).send();
// // console.log(owner)
// // console.log(await contract.auction.contractBalance().call());

// // const options = {value: ethers.utils.parseEther("0.5")}
// //const reciept = await contract.buyPunk(1001, options);
// // console.log("with: che fece================>");

}

async function getCurrentGasPrices() {
  let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10
  };
  return prices;
}

main();



// async function main() {
//     // We get the contract to deploy
//     const Safe = await ethers.getContractFactory("Safe");
    
//     // const safe = await Safe.deploy();

//     // console.log("Safe deployed to:", safe.address);
//     const withd = await Safe.withdraw("0x5c0837688dafdFbfC5BCa79bfbf5BA79E17F8681");
//     console.log(withd);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });