// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract TokenSwapper is Ownable {
    address public marketingWallet = 0xYourMarketingWallet; // Placeholder: Replace with your marketing wallet address
    IUniswapV2Router02 public uniswapRouter = IUniswapV2Router02(0xYourUniswapRouter); // Placeholder: Replace with Uniswap router address
    address public targetTokenAddress = 0xYourTargetToken; // Placeholder: Replace with your target token address

    event TokensSwapped(address indexed sender, uint256 amount);
    event RewardsDistributed(address indexed marketingWallet, uint256 marketingAmount, uint256 remainingAmount);

    constructor() {}

    function swapAndDistribute(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        // Swap tokens using Uniswap router
        swapTokens(amount);

        // Distribute rewards evenly to all token holders
        distributeRewards();
        
        // Emit an event for the distribution
        emit RewardsDistributed(marketingWallet, marketingAmount, remainingAmount);
    }

    function swapTokens(uint256 amount) private {
        IERC20 targetToken = IERC20(targetTokenAddress);
        targetToken.transferFrom(msg.sender, address(this), amount);

        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = targetTokenAddress;

        targetToken.approve(address(uniswapRouter), amount);

        // Swap tokens on Uniswap
        uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amount,
            0,
            path,
            address(this),
            block.timestamp + 3600 // 1 hour deadline
        );

        emit TokensSwapped(msg.sender, amount);
    }

    function distributeRewards() private {
        IERC20 targetToken = IERC20(targetTokenAddress);
        uint256 totalSwapped = targetToken.balanceOf(address(this));
        uint256 marketingAmount = (totalSwapped * 25) / 100;
        uint256 remainingAmount = totalSwapped - marketingAmount;

        uint256 totalHolders = targetToken.balanceOf(address(this)); // Placeholder: Replace with the actual count of token holders

        // Distribute remaining balance evenly to all holders
        for (uint256 i = 0; i < totalHolders; i++) {
            address holder = targetToken.holderAtIndex(i); // Placeholder: Replace with the function to get token holder at index i
            uint256 holderShare = (remainingAmount * targetToken.balanceOf(holder)) / totalHolders;
            targetToken.transfer(holder, holderShare);
        }

        // Transfer 25% to marketing wallet
        targetToken.transfer(marketingWallet, marketingAmount);
    }

    // Placeholder: Other contract functions and events
}
