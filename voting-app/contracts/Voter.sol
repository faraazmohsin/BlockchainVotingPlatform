// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Ballot.sol";

contract Voter {
    // Reference to the ballot contract
    Ballot public ballot;

    // Event to notify when a new user registers
    event NewUserRegistered(address userAddress, bytes32 name, bytes32 email);

    // Struct to store user information
    struct User {
        bytes32 name;
        bytes32 email;
        bool registered;
    }

    // Mapping to store user information by Ethereum address
    mapping(address => User) public users;

    mapping(bytes32 => mapping(bytes32 => bool)) public nameEmailToAddress;

    // Constructor to set the reference to the ballot contract
    constructor(address _ballot) {
        ballot = Ballot(_ballot);
    }

    function isUserRegistered(bytes32 _name, bytes32 _email) public view returns(bool) {
        return nameEmailToAddress[_name][_email];
    }

    // Function to register a user
    function registerUser(bytes32 _name, bytes32 _email) public {
        require(!users[msg.sender].registered, "User has already registered");
        require(!isUserRegistered(_name, _email), "User with the same name and email already exists");

        users[msg.sender] = User(_name, _email, true);
        nameEmailToAddress[_name][_email] = true;

        emit NewUserRegistered(msg.sender, _name, _email);
    }

    // Function to cast a vote
    function castVote(string memory _candidate) public {
        require(users[msg.sender].registered, "User is not registered");
        ballot.castVote(_candidate);
    }

    // Function to check if the voter is eligible to vote
    function isEligible() public view returns (bool) {
        return users[msg.sender].registered && !ballot.voters(msg.sender);
    }
}
