// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./Ownable.sol";
import "./SafeMath.sol";
import "./IUniswapV2Router02.sol";
import "./IUniswapV2Factory.sol";
import "./IUniswapV2Pair.sol";

contract XpDAI is IERC20, Ownable {
    using SafeMath for uint256;

    string private _name = "XpDAI";
    string private _symbol = "XpDAI";
    uint8 private _decimals = 18;
    uint256 private _totalSupply = 2100000000 * 10**_decimals;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 public rewardFee = 6;
    uint256 public marketingFee = 2;
    uint256 public liquidityFee = 2;

    address public marketingWallet = 0xEf3991ecD1edb1E1acD71A1661FD88CFc0Cc54Db;
    address public rewardToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public uniswapRouter = 0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7;

    IUniswapV2Router02 private _uniswapRouter;
    address public uniswapPair;

    constructor() {
        _balances[msg.sender] = _totalSupply;
        _uniswapRouter = IUniswapV2Router02(uniswapRouter);
        uniswapPair = IUniswapV2Factory(_uniswapRouter.factory()).createPair(address(this), _uniswapRouter.WETH());
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

    function _approve(address owner, address spender, uint256 amount) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _transfer(address sender, address recipient, uint256 amount) private {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "Transfer amount must be greater than zero");

        uint256 taxAmount = amount.mul(rewardFee).div(100);
        uint256 marketingAmount = amount.mul(marketingFee).div(100);
        uint256 liquidityAmount = amount.mul(liquidityFee).div(100);
        uint256 transferAmount = amount.sub(taxAmount).sub(marketingAmount).sub(liquidityAmount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(transferAmount);
        _balances[address(this)] = _balances[address(this)].add(taxAmount);

        emit Transfer(sender, recipient, transferAmount);

        if (marketingAmount > 0) {
            _balances[marketingWallet] = _balances[marketingWallet].add(marketingAmount);
            emit Transfer(sender, marketingWallet, marketingAmount);
        }

        if (liquidityAmount > 0) {
            _balances[address(this)] = _balances[address(this)].add(liquidityAmount);
            emit Transfer(sender, address(this), liquidityAmount);
        }

        _swapAndSendRewards(taxAmount);
    }

    function _swapAndSendRewards(uint256 taxAmount) private {
        uint256 initialBalance = IERC20(rewardToken).balanceOf(address(this));
        _swapTokensForTokens(taxAmount, rewardToken);
        uint256 newBalance = IERC20(rewardToken).balanceOf(address(this)).sub(initialBalance);
        _balances[address(this)] = _balances[address(this)].add(newBalance);
        emit Transfer(address(0), address(this), newBalance);
    }

    function _swapTokensForETH(uint256 tokenAmount) private {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = 0xA1077a294dDE1B09bB078844df40758a5D0f9a27; // WETH address

        _uniswapRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function _swapTokensForTokens(uint256 tokenAmount, address toToken) private {
        address[] memory path = new address[](3);
        path[0] = address(this);
        path[1] = 0xA1077a294dDE1B09bB078844df40758a5D0f9a27; // WETH address
        path[2] = toToken;

        _uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            tokenAmount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    //
