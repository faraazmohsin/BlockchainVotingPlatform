import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import Ballot from "../../../src/contracts/Ballot.json";
import Voter from "../../../src/contracts/Voter.json";
import styled from 'styled-components';
import Typed from 'react-typed';
import { motion } from "framer-motion";
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    margin: 12vh 0 0 2vw;
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

  useEffect(() => {

    // Prevents user from going back *Crucial to stay on voting page and complete the process
    window.history.pushState(null, null, `${window.location.pathname}?preventBack=true`);

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
        "0x5E71f9171C128a0486a4602b5bf723DB311A1E74",
        { data: Ballot.bytecode, arguments: [_candidates] }
      );

      const candidates = await _ballotContract.methods.getCandidates().call();
      console.log("Candidates: ", candidates);

      setBallotContract(_ballotContract);
  
      const _voterContract = await new _web3.eth.Contract(
        Voter.abi,
        "0x45f8A04CF01989b2921fF621C19c055968b75c82"
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
      }
    };    
  
    init();
  }, []);  
  
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const handleVote = async () => {

    // Validation to check if radio button is clicked before submitting
    if (!selectedCandidate) {
      alert('Please select a candidate to vote for.');
      return;
    }

    await ballotContract.methods.castVote(selectedCandidate).send({
      from: accounts[1],
    });
    
    navigate('/end');
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

  const isVoteDisabled = !selectedCandidate;
  
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
            <Link onClick={handleVote} to="/end">
              <button style={{cursor: !selectedCandidate ? 'not-allowed' : 'pointer', border: 'none', color: "black", minWidth: '96px', height: '46px', padding: '16px 24px', borderRadius: '4px', fontSize: '0.875rem', fontFamily:  'Roboto', fontWeight: '500', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s ease'}} type="submit" disabled={isVoteDisabled}>VOTE</button>
            </Link>
          </ButtonContainer>
        </form>
      </VotingContainer>
    </div>
    </PageContainer>
  );
}
