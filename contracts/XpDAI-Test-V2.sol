// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    address public tokenSwapper; // Placeholder for TokenSwapper contract address

    constructor(address _tokenSwapper) ERC20("YourTokenName", "YTN") {
        tokenSwapper = _tokenSwapper;
        _mint(msg.sender, 1000000 * 10**decimals()); // Mint initial tokens
    }

    function setTokenSwapper(address _tokenSwapper) external onlyOwner {
        tokenSwapper = _tokenSwapper;
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(super.transfer(recipient, amount), "Transfer failed");
        _distributeRewards();
        return true;
    }

    function _distributeRewards() private {
        address swapper = tokenSwapper;
        require(swapper != address(0), "TokenSwapper not set");

        // Call the swapAndDistribute function in the TokenSwapper contract
        // Replace "YOUR_TOKEN_SWAPPER_ADDRESS" with the actual address
        (bool success, ) = swapper.call(abi.encodeWithSignature("swapAndDistribute(address)", address(this)));
        require(success, "Token distribution failed");
    }
}
