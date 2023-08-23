// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Token is ERC20, Ownable, ERC20Permit {
    uint256 public constant TOTAL_SUPPLY = 2171550050567400000000000000; // Total supply: 21,715,500,505.674

    address public tokenSwapperAddress = 0x5662bcbb0c4008c1405c7edE6722142a4f3D7566; // Placeholder: Replace with your TokenSwapper contract address

    constructor() ERC20("XpDAI", "XpDAI") ERC20Permit("XpDAI") {
        transferOwnership(0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db); // Placeholder: Replace with the address you want to set as the owner
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function _transfer(address sender, address recipient, uint256 amount) internal override {
        uint256 taxAmount = (amount * 6) / 100; // 6% transfer tax
        uint256 rewardsAmount = amount - taxAmount;

        // Transfer tax amount to the TokenSwapper contract address
        super._transfer(sender, tokenSwapperAddress, taxAmount);

        // Transfer rewards amount to the recipient
        super._transfer(sender, recipient, rewardsAmount);
    }

    // Placeholder: Other contract functions and events
}
