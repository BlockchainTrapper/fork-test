// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "./TokenSwapper.sol"; // Import the TokenSwapper contract

contract Token is ERC20, Ownable, ERC20Permit {
    uint256 public constant TOTAL_SUPPLY = 2171550050567400000000000000; // Total supply: 21,715,500,505.674

    address public tokenSwapperAddress = 0xYourTokenSwapperAddress; // Placeholder: Replace with your TokenSwapper contract address

    constructor() ERC20("YourTokenName", "YourTokenSymbol") ERC20Permit("YourTokenName") {
        transferOwnership(0xYourOwnerAddress); // Placeholder: Replace with the address you want to set as the owner
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function _transfer(address sender, address recipient, uint256 amount) internal override {
        uint256 taxAmount = (amount * 6) / 100; // 6% transfer tax
        uint256 rewardsAmount = amount - taxAmount;

        // Transfer tax amount to the TokenSwapper contract
        super._transfer(sender, tokenSwapperAddress, taxAmount);

        // Transfer rewards amount to the recipient
        super._transfer(sender, recipient, rewardsAmount);
    }

    // Placeholder: Other contract functions and events
}
