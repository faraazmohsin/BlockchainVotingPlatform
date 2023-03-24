// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Ballot {
    // List of candidates
    string[] public candidates;

    // List of votes received by each candidate
    mapping(string => uint256) public votesReceived;

    // List of voters who have already cast their votes
    mapping(address => bool) public voters;

    // Election start and end time
    uint256 public startTime;
    uint256 public endTime;

    // Maximum number of votes per voter
    uint256 public maxVotesPerVoter;

    // Event to notify when a vote is cast
    event VoteCast(address voter, string candidate);

    // Constructor to set the election rules
    constructor(string[] memory _candidates, uint256 _startTime, uint256 _endTime, uint256 _maxVotesPerVoter) {
        candidates = _candidates;
        startTime = _startTime;
        endTime = _endTime;
        maxVotesPerVoter = _maxVotesPerVoter;
    }

    // Function to cast a vote
    function castVote(string memory _candidate) public {
        require(block.timestamp >= startTime, "Election has not started yet"); //Might remove
        require(block.timestamp <= endTime, "Election has ended");  //Might remove
        require(!voters[msg.sender], "You have already cast your vote");    //Might remove
        require(votesReceived[_candidate] < maxVotesPerVoter, "This candidate has already reached the maximum number of votes");    //Might remove

        votesReceived[_candidate]++;
        voters[msg.sender] = true;

        emit VoteCast(msg.sender, _candidate);
    }

    //Might remove
    // Function to get the total number of votes
    function getTotalVotes() public view returns (uint256) {
        uint256 totalVotes = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            totalVotes += votesReceived[candidates[i]];
        }

        return totalVotes;
    }

    // Function to get the list of candidates
    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }
}