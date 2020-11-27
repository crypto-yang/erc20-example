// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Token {
  string public name = "The Best Token";
  string public symbol = "BEST";
  
  uint256 public totalSupply = 10000000;
  uint256 public decimals = 6;

  mapping(address => uint256) public balanceOf;

  mapping(address => mapping (address => uint256)) public allowance;

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _amount) public {
    require(balanceOf[msg.sender] >= _amount, "Not enough balance");
    balanceOf[msg.sender] -= _amount;
    balanceOf[_to] += _amount;
  }

  function approve(address _to, uint256 _amount) public {
    allowance[msg.sender][_to] = _amount;
  }

  function transferFrom(address _from, address _to, uint256 _amount) public {
    require(allowance[_from][msg.sender] >= _amount, "Not allowed");
    
    require(balanceOf[_from] >= _amount, "Not enough balance");
    balanceOf[_from] -= _amount;
    balanceOf[_to] += _amount;

    allowance[_from][msg.sender] -= _amount;
  }
}
