require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },  
    ganache: {
      url: "http://localhost:7545",
    },
    rinkeby: {
      url: process.env.rinkebyUrl,
      accounts: process.env.rinkebyAccount
    }
  },
  solidity: "0.8.9"
};