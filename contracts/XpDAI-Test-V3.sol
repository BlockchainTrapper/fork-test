// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract XpDAI is ERC20, Ownable, ERC20Permit {
    address public marketingWallet = 0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db;
    address public rewardToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    IUniswapV2Router02 public uniswapRouter;

    uint256 public swapThreshold = 1_000_000 * 10**18;

    constructor(address _uniswapRouter) ERC20("XpDAI", "XpDAI") ERC20Permit("XpDAI") {
        _mint(msg.sender, 2_100_000_000 * 10**18);
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
    }

    function setSwapThreshold(uint256 _threshold) external onlyOwner {
        swapThreshold = _threshold;
    }

    function setMarketingWallet(address _wallet) external onlyOwner {
        marketingWallet = _wallet;
    }

    function setRewardToken(address _token) external onlyOwner {
        rewardToken = _token;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        if (recipient == address(0) || sender == address(0)) {
            super._transfer(sender, recipient, amount);
        } else {
            uint256 transferAmount = amount;
            if (sender != owner()) {
                uint256 contractBalance = balanceOf(address(this));
                if (contractBalance >= swapThreshold) {
                    swapAndSendRewards(contractBalance);
                }
                uint256 taxAmount = amount * 10 / 100; // 10% tax
                super._transfer(sender, address(this), taxAmount);

                uint256 marketingAmount = taxAmount * 2 / 10; // 2% to marketing wallet
                super._transfer(address(this), marketingWallet, marketingAmount);

                uint256 lpAmount = taxAmount * 2 / 10; // 2% for auto LP
                addLiquidity(lpAmount);
                
                uint256 rewardAmount = taxAmount * 6 / 10; // 6% for reward token
                swapAndSendRewards(rewardAmount);
                
                transferAmount = amount - taxAmount;
            }
            super._transfer(sender, recipient, transferAmount);
        }
    }

    function swapAndSendRewards(uint256 amount) internal {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = rewardToken;

        uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function addLiquidity(uint256 amount) internal {
        approve(address(uniswapRouter), amount);

        uniswapRouter.addLiquidityETH{value: amount}(
            address(this),
            amount,
            0,
            0,
            address(this),
            block.timestamp
        );
    }
}
