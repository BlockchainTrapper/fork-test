// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract XpDAIToken is ERC20, Ownable {
    using SafeMath for uint256;

    address public marketingWallet = 0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db;
    uint256 public taxPercentage = 10; // 10% tax rate
    address public rewardToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F; // Address of the reward token
    address public uniswapRouter = 0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7;

    constructor() ERC20("XpDAI", "XpDAI") {
        _mint(msg.sender, 2100000000 * 10**18); // Total supply: 2.1 billion tokens
    }

    function setTaxPercentage(uint256 _taxPercentage) external onlyOwner {
        require(_taxPercentage <= 100, "Tax percentage must be <= 100");
        taxPercentage = _taxPercentage;
    }

    function setMarketingWallet(address _marketingWallet) external onlyOwner {
        marketingWallet = _marketingWallet;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal override {
        if (recipient != address(0) && recipient != address(this) && recipient != owner() && recipient != marketingWallet) {
            uint256 taxAmount = (amount * taxPercentage) / 100;
            uint256 transferAmount = amount.sub(taxAmount);

            super._transfer(sender, recipient, transferAmount);

            if (taxAmount > 0) {
                super._transfer(sender, address(this), taxAmount);

                // Swap 6% of the tax into the reward token
                uint256 rewardAmount = (taxAmount * 6) / 100;
                _swapTokensForReward(rewardAmount);
            }
        } else {
            super._transfer(sender, recipient, amount);
        }
    }

    function _swapTokensForReward(uint256 tokenAmount) private {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = rewardToken;

        IUniswapV2Router02(uniswapRouter).swapExactTokensForTokensSupportingFeeOnTransferTokens(
            tokenAmount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function distributeRewards(uint256 rewardAmount) external onlyOwner {
        require(rewardAmount > 0, "Reward amount must be greater than 0");
        super._transfer(address(this), owner(), rewardAmount);
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) external onlyOwner {
        super._transfer(owner(), address(this), tokenAmount);
        payable(address(this)).transfer(ethAmount);
    }

    function _swapTokensForETH(uint256 tokenAmount) private {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapRouter.WETH();

        IUniswapV2Router02(uniswapRouter).swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function swapTokensForETH(uint256 tokenAmount) external onlyOwner {
        _swapTokensForETH(tokenAmount);
    }

    function setUniswapRouter(address _uniswapRouter) external onlyOwner {
        uniswapRouter = _uniswapRouter;
    }

    function withdrawTokens(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20(tokenAddress).transfer(owner(), amount);
    }

    function withdrawETH(uint256 amount) external onlyOwner {
        payable(owner()).transfer(amount);
    }

    function autoAddLiquidity() external onlyOwner {
        uint256 contractTokenBalance = balanceOf(address(this));
        uint256 contractEthBalance = address(this).balance;

        if (contractTokenBalance > 0 && contractEthBalance > 0) {
            _approve(address(this), uniswapRouter, contractTokenBalance);

            IUniswapV2Router02(uniswapRouter).addLiquidityETH{value: contractEthBalance}(
                address(this),
                contractTokenBalance,
                0,
                0,
                owner(),
                block.timestamp
            );
        }
    }

    // Fallback function to receive ETH
    receive() external payable {}

    // Avoid accidental token transfers to the contract
    function recoverTokens(address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }
}
