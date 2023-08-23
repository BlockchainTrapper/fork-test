// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract XpDAI is ERC20, Ownable, ERC20Permit {
    uint256 public constant TOTAL_SUPPLY = 2171550050567400000000000000; // Total supply: 21,715,500,505.674

    address public marketingWallet = 0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db; // Your marketing wallet address
    IUniswapV2Router02 public uniswapRouter = IUniswapV2Router02(0x636f6407B90661b73b1C0F7e24F4C79f624d0738); // Uniswap router contract address
    address public tokenSwapperAddress = 0xYourTokenSwapperAddress; // Replace with actual TokenSwapper address
    IERC20 public newToken = IERC20(0xYourNewTokenAddress); // Replace with actual new token address

    uint256 public constant TAX_PERCENT = 6;
    uint256 public constant MARKETING_PERCENT = 25;

    constructor() ERC20("XpDAI", "XpDAI") ERC20Permit("XpDAI") {
        transferOwnership(0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db);
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function _transfer(address sender, address recipient, uint256 amount) internal override {
        uint256 taxAmount = (amount * TAX_PERCENT) / 100;
        uint256 marketingAmount = (taxAmount * MARKETING_PERCENT) / 100;
        uint256 rewardsAmount = taxAmount - marketingAmount;

        super._transfer(sender, recipient, amount - taxAmount);
        super._transfer(sender, marketingWallet, marketingAmount);
        super._transfer(sender, tokenSwapperAddress, rewardsAmount);
    }

    function setUniswapRouter(address _uniswapRouter, address _tokenSwapperAddress) external onlyOwner {
        require(_uniswapRouter != address(0), "Invalid Uniswap router");
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        tokenSwapperAddress = _tokenSwapperAddress;
    }
}
