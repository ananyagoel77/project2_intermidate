// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract SimpleContract {
    uint256 public storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
