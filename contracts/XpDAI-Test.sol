// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract XpDAI is ERC20, ERC20Burnable, ERC20Votes, ERC20Permit, Ownable {
    uint256 public constant TOTAL_SUPPLY = 21715500505674; // Total supply: 21,715,500,505.674

    // Change: Set the marketing wallet address
    address public marketingWallet = 0xef3991ecd1edb1e1acd71a1661fd88cfc0cc54db; // Your marketing wallet address
    
    // Change: Set the Uniswap router address
    IUniswapV2Router02 public uniswapRouter = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D); // Uniswap router contract address

    uint256 public constant TAX_PERCENT = 6;
    uint256 public constant MARKETING_PERCENT = 25;

    constructor() ERC20("XpDAI", "XpDAI") ERC20Permit("XpDAI") {
        // Set the wallet owner to the provided address
        transferOwnership(0xef3991ecd1edb1e1acd71a1661fd88cfc0cc54db);
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        uint256 taxAmount = (amount * TAX_PERCENT) / 100;
        uint256 marketingAmount = (taxAmount * MARKETING_PERCENT) / 100;
        uint256 rewardsAmount = taxAmount - marketingAmount;

        // Distribute to marketing wallet
        _transfer(sender, marketingWallet, marketingAmount);

        // Distribute to token holders
        super._transfer(sender, recipient, amount - taxAmount);

        // Distribute to sender as rewards
        super._transfer(sender, sender, rewardsAmount);

        // Buy another token from Uniswap with the tax amount
        _buyFromUniswap(sender, taxAmount);
    }

    function _buyFromUniswap(address recipient, uint256 amount) private {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = address(this);

        // Swap tokens on Uniswap
        uniswapRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{value: amount}(
            0,
            path,
            recipient,
            block.timestamp + 3600 // 1 hour deadline
        );
    }

    function setUniswapRouter(address _uniswapRouter) external onlyOwner {
        require(_uniswapRouter != address(0), "Invalid Uniswap router");
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
    }
}
