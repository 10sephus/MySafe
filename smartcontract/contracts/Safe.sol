// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract Safe {
    uint s_blocksToUnlock = 0;
    uint s_unlockBlockNumber = 1;
    uint s_currentUnlockers = 0;
    uint s_signersRequired;
    uint s_totalSigners;
    bool s_soloUnlockFlag = false;
    address[10] public s_accounts;
    mapping (address => uint) s_accountsAddresses;
    constructor(uint p_minSigners, address[] memory p_accounts, uint p_blockToUnlock) {
        require(p_accounts.length<10, "Max 10 s_accountsAddresses");
        require(p_accounts.length>p_minSigners, "Min Signers > Signers");
        uint i;
        s_unlockBlockNumber=1;
        s_blocksToUnlock = p_blockToUnlock;
        s_signersRequired = p_minSigners;
        for (i = 0; i< p_accounts.length; i++) {
            s_accountsAddresses[p_accounts[i]] = 0;
            s_accounts[i] = p_accounts[i];
        }
        s_totalSigners = i;
        setLocks();
    }
    receive() external payable {}
    function setLocks() private {
        require(checkAccount(), "Unauthorized account");
        s_currentUnlockers = 0;
        for (uint i = 0; i< s_totalSigners; i++) {
            s_currentUnlockers+=s_accountsAddresses[s_accounts[i]];
        }
     }
    function checkAccount() private view returns(bool) {
        for (uint i=0; i<s_totalSigners; i++) {
            if (msg.sender==s_accounts[i]) {
                return true;
            }
        }        
        return false;
    }

    function deposit() payable public {
    }
    function resetSafe() public {
        require(checkAccount(), "Unauthorized account");
        for (uint i = 0; i< s_totalSigners; i++) {
            s_accountsAddresses[s_accounts[i]] = 0;
        }
        s_soloUnlockFlag = false;
        setLocks();
    }
    function unLock() public {
        require(checkAccount(), "Unauthorized account");
        s_accountsAddresses[msg.sender] = 1;
        setLocks();
    }
    function unlockSolo() public {
        require(checkAccount(), "Unauthorized account");
        require(s_soloUnlockFlag==false,"Safe is just in requested state (solo Unlocked)");
        s_soloUnlockFlag = true;
        s_unlockBlockNumber = s_blocksToUnlock + block.number;
        setLocks();
    }
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function getuBlocks() public view returns(uint) {
        return s_unlockBlockNumber;
    }
    function getBlocksToUnlock() public view returns (uint) {
        require(s_soloUnlockFlag==true,"Solo unlock not activated");
        if (s_unlockBlockNumber>=block.number) {
            return s_unlockBlockNumber-block.number;
        } else {
            return 0;
        }
    }
    function getSoloStatus() public view returns(bool) {
        return s_soloUnlockFlag;
    }
    function getTotalSigners() public view returns (uint) {
        return s_totalSigners;
    }
    function getCurrentActiveSigners() public view returns (uint) {
        return s_currentUnlockers;
    }
    function transferAmount(address payable _recipient, uint256 _amount) external payable {
        require(checkAccount(), "Unauthorized account");
        require((s_currentUnlockers>=s_signersRequired||(s_unlockBlockNumber<block.number && s_soloUnlockFlag)),"Safe is Locked");
        _recipient.transfer(_amount);
    }
    fallback() external payable {
        return;
    }
}