// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Ballot {
    // List of candidates
    string[] public candidates;

    // List of voters who have already cast their votes
    mapping(address => bool) public voters;

    // Event to notify when a vote is cast
    event VoteCast(address voter, string candidate);

    // Constructor to set the candidate identity
    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    // Function to cast a vote
    function castVote(string memory _candidate) public {
        require(!voters[msg.sender], "You have already cast your vote"); 
        voters[msg.sender] = true;

        emit VoteCast(msg.sender, _candidate);
    }

    // Function to get the list of candidates
    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }
}