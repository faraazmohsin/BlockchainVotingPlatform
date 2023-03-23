import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import Ballot from "../../../src/build/contracts/Ballot.json";
import Voter from "../../../src/build/contracts/Voter.json";
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.div`
  display: flex;
  font-family: 'Inter', sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
`;

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
        "0xb23C549218C4669a02B7594e6Ae939D6D4806F43"
      );
      setBallotContract(_ballotContract);
  
      const _voterContract = new _web3.eth.Contract(
        Voter.abi,
        "0x3CEf4e41d0868633D6cd967233523634F8e876EB"
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
      <TitleContainer>
      <MainTitle>
      Vote for your favorite candidate:
      </MainTitle>
      </TitleContainer>
      <form onSubmit={handleVote}>
        {renderCandidates()}
        <button type="submit">Vote</button>
      </form>
      <p>Total Votes: {totalVotes}</p>
    </div>
  );
};
