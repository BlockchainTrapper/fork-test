// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSwapper is Ownable {
    IERC20 public oldToken;
    IERC20 public newToken;

    constructor(address _oldTokenAddress, address _newTokenAddress) {
        oldToken = IERC20(_oldTokenAddress);
        newToken = IERC20(_newTokenAddress);
    }

    function swapAndDistribute(uint256 rewardAmount) external {
        require(rewardAmount > 0, "Amount must be greater than 0");

        // Transfer old tokens from sender to this contract
        oldToken.transferFrom(msg.sender, address(this), rewardAmount);

        // Swap old tokens for new tokens
        // Replace this with your actual swap logic using Uniswap or any other DEX

        // Distribute new tokens to token holders based on their balances
        uint256 totalSupply = oldToken.balanceOf(address(this));
        for (uint256 i = 0; i < totalSupply; i++) {
            address holder = oldToken.ownerOf(i);
            uint256 balance = oldToken.balanceOf(holder);
            uint256 distributionAmount = (rewardAmount * balance) / totalSupply;
            newToken.transfer(holder, distributionAmount);
        }
    }
}
