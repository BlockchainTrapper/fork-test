// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract XpDAI is ERC20, Ownable, ERC20Permit {
    uint256 public constant TOTAL_SUPPLY = 21715500505674; // Total supply: 21,715,500,505.674

    address public marketingWallet = 0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db; // Your marketing wallet address
    IUniswapV2Router02 public uniswapRouter = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D); // Uniswap router contract address

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

        _transfer(sender, marketingWallet, marketingAmount);
        super._transfer(sender, recipient, amount - taxAmount);
        super._transfer(sender, sender, rewardsAmount);

        _buyFromUniswap(sender, taxAmount);
    }

    function _buyFromUniswap(address recipient, uint256 amount) private {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = address(0x6B175474E89094C44Da98b954EedeAC495271d0F);

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
