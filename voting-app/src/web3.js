import Web3 from 'web3';
import BallotContract from '../build/contracts/Ballot.json';
import VoterContract from '../build/contracts/Voter.json';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and metamask is running
  window.ethereum.enable().then(() => {
    web3 = new Web3(window.ethereum);
  });
} else {
  // We are on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'http://localhost:7545'
  );
  web3 = new Web3(provider);
}

const ballotAddress = '0x5E71f9171C128a0486a4602b5bf723DB311A1E74'; // Replace with the deployed ballot contract address
const voterAddress = '0x45f8A04CF01989b2921fF621C19c055968b75c82'; // Replace with the deployed voter contract address

const ballotContract = new web3.eth.Contract(BallotContract.abi, ballotAddress);
const voterContract = new web3.eth.Contract(VoterContract.abi, voterAddress);

export { web3, ballotContract, voterContract };
