import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import Ballot from "../../../src/build/contracts/Ballot.json";
import Voter from "../../../src/build/contracts/Voter.json";

export function Home() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [ballotContract, setBallotContract] = useState(undefined);
  const [voterContract, setVoterContract] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const getTotalVotes = async () => {
    const _totalVotes = await ballotContract.methods.getTotalVotes().call();
    setTotalVotes(_totalVotes);
  };

  useEffect(() => {
    const initWeb3 = async () => {
      const _web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
      setWeb3(_web3);
      const _accounts = await _web3.eth.getAccounts();
      setAccounts(_accounts);
      return _web3;
    };
  
    const initContracts = async (_web3) => {
      const _ballotContract = new _web3.eth.Contract(
        Ballot.abi,
        "0x4AcfdBf97562EfBEAD3bA3F04970d2C93d2FF611"
      );
      setBallotContract(_ballotContract);
  
      const _voterContract = new _web3.eth.Contract(
        Voter.abi,
        "0x3Aad3320Da4908CEcB4489C575982dd1CbF1aB34"
      );
      setVoterContract(_voterContract);
    };
  
    const getCandidates = async () => {
      const _candidates = await ballotContract.methods.candidates().call();
      setCandidates(_candidates);
    };
  
    const init = async () => {
      const _web3 = await initWeb3();
      await initContracts(_web3);
      await getCandidates();
      await getTotalVotes();
    };
  
    init();
  }, []);
  
  const handleVote = async () => {
    await voterContract.methods.castVote(selectedCandidate).send({
      from: accounts[0],
    });
    await getTotalVotes();
  };

  const renderCandidates = () => {
    return candidates.map((candidate, index) => {
      return (
        <div key={index}>
          <input
            type="radio"
            value={candidate}
            checked={selectedCandidate === candidate}
            onChange={(event) => setSelectedCandidate(event.target.value)}
          />
          <label>{candidate}</label>
        </div>
      );
    });
  };
  
  return (
    <div>
      <h2>Vote for your favorite candidate:</h2>
      <form onSubmit={handleVote}>
        {renderCandidates()}
        <button type="submit">Vote</button>
      </form>
      <p>Total Votes: {totalVotes}</p>
    </div>
  );
};
