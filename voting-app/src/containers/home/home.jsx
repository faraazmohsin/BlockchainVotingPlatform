import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import Ballot from "../../../src/contracts/Ballot.json";
import Voter from "../../../src/contracts/Voter.json";
import styled from 'styled-components';
import Typed from 'react-typed';
import { motion } from "framer-motion";
import Fade from 'react-reveal/Fade';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #0c7752; //comp: #A41043
    width: 100%;
    height: 100vh;
`;

const MainTitle = styled(motion.div)`
    position: absolute;
    font-size: 2.5rem;
    margin-top: 55px;
    font-family: 'Press Start 2P', cursive;
    margin: 8vh 0 0 2vw;
    color: #A41043;
    background-color: #F9E79F;
`;

const VotingContainer = styled(motion.div)`
  display: flex;
  margin: 25vh 0 0 2vw;
`;

const ButtonContainer = styled(motion.div)`
    position: absolute;
    margin: 15vh 0 0 2vw;
`;

const CanContainer = styled(motion.div)`
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: bold;
  color: #A41043;
`;

export function Home() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [ballotContract, setBallotContract] = useState(undefined);
  const [voterContract, setVoterContract] = useState(undefined);
  const [candidates, setCandidates] = useState(
    localStorage.getItem("candidates") ? JSON.parse(localStorage.getItem("candidates")) :[] 
    );
  const [selectedCandidate, setSelectedCandidate] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      const _web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
      const _accounts = await _web3.eth.getAccounts();
      setWeb3(_web3);
      setAccounts(_accounts);
      return _web3;
    };
  
    const initContracts = async (_web3, _candidates) => {
      const _ballotContract = await new _web3.eth.Contract(
        Ballot.abi,
        "0x607EbAB9422C0079AD6b994652462db202e0e8Da",
        { data: Ballot.bytecode, arguments: [_candidates, 1649990400, 1652582400, 2] }
      );

      const candidates = await _ballotContract.methods.getCandidates().call();
      console.log("Candidates: ", candidates);

      setBallotContract(_ballotContract);
  
      const _voterContract = await new _web3.eth.Contract(
        Voter.abi,
        "0x39F45Ba69C16928e63195bD813fE37Df1d7C3Fb4"
      );
      setVoterContract(_voterContract);
    };
  
    const getCandidates = async () => {
      if (web3 && ballotContract) {
        const _candidates = await ballotContract.methods.getCandidates().call();
        const candidatesStr = _candidates.map((candidate) => String(candidate));
        setCandidates(_candidates);
        localStorage.setItem("candidates", JSON.stringify(candidatesStr));
      }
    };
  
    const init = async () => {
      const _web3 = await initWeb3();
      await initContracts(_web3, candidates);
      if (ballotContract) {
        await getCandidates();
        //await getTotalVotes();
      }
    };    
  
    init();
  }, []);  
  
  const handleVote = async () => {
    await ballotContract.methods.castVote(selectedCandidate).send({
      from: accounts[0],
    });
    //await getTotalVotes();
  };

  const renderCandidates = () => {
    console.log('candidates:', candidates);
    return candidates.map((candidate, index) => {
      return (
        <div key={index}>
          <input
            style={{height: '20px', width: '20px'}}
            type="radio"
            value={candidate}
            checked={selectedCandidate === candidate}
            onChange={(event) => setSelectedCandidate(event.target.value)}
          />
          <Fade>
            <label style={{marginLeft: '2vw'}}>{candidate}</label>
          </Fade>
        </div>
      );
    });
  };
  
  return (
    <PageContainer>
    <div>
    <Typed
        strings={['Vote for your favorite candidate: ']}
        typeSpeed={30}
          >
              <MainTitle/>
      </Typed>
      
      <VotingContainer>
        <form onSubmit={handleVote}>
          <CanContainer>
            {renderCandidates()}
          </CanContainer>
          <ButtonContainer whileHover={{scale: 1.1}}>
            <button style={{cursor: 'pointer', border: 'none', color: "black", width: '125px', height: '55px', padding: '10px', borderRadius: '40px', fontSize: '1.5rem', fontFamily:  'Poppins'}} type="submit">VOTE</button>
          </ButtonContainer>
        </form>
      </VotingContainer>
    </div>
    </PageContainer>
  );
};
