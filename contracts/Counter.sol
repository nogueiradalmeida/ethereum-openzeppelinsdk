pragma solidity ^0.5.0;

contract Counter {
  uint256 public value;

  function increase(uint256 amount, uint256 amount2) public {
    value += amount+amount2;
  }

  function decrease(uint256 amount) public {
  	value -= amount;
  }

  function double() public {
    value *= 2;
  }
  function triple() public returns (uint256) {
    value *= 3;
    return value;
  }
}
