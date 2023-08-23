// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract TokenSwapper is Ownable {
    IUniswapV2Router02 public uniswapRouter;
    address public marketingWallet;
    address public targetToken; // Replace with the address of the target token

    event TokensSwapped(uint256 inputAmount, uint256 outputAmount);
    event RewardsDistributed(address indexed recipient, uint256 marketingAmount, uint256 remainingAmount);

    constructor(address _uniswapRouter, address _marketingWallet, address _targetToken) {
        uniswapRouter = IUniswapV2Router02(0x636f6407B90661b73b1C0F7e24F4C79f624d0738);
        marketingWallet = 0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db;
        targetToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F; // Replace with the address of the target token
    }

    receive() external payable {}

    function swapAndDistribute(address tokenAddress, uint256 inputAmount) external onlyOwner {
        require(inputAmount > 0, "Input amount must be greater than 0");

        IERC20(tokenAddress).transferFrom(msg.sender, address(this), inputAmount);

        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapRouter.WETH();

        uint256 balanceBefore = IERC20(targetToken).balanceOf(address(this));
        uniswapRouter.swapExactTokensForTokens(inputAmount, 0, path, targetToken, block.timestamp);
        uint256 outputAmount = IERC20(targetToken).balanceOf(address(this)) - balanceBefore;

        // Distribute 25% to marketing wallet
        uint256 marketingAmount = (outputAmount * 25) / 100;
        IERC20(targetToken).transfer(marketingWallet, marketingAmount);

        // Distribute the remaining balance to token holders
        uint256 remainingAmount = outputAmount - marketingAmount;
        emit RewardsDistributed(marketingWallet, marketingAmount, remainingAmount);
    }

    // Placeholder: Other contract functions and events
}
