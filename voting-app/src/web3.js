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

const ballotAddress = '0xd3916b9a9096915Ef04297D0F660Ec6efF48719a'; // Replace with the deployed ballot contract address
const voterAddress = '0xF75c95E3f692fb561826f57026940C9F76C862Db'; // Replace with the deployed voter contract address

const ballotContract = new web3.eth.Contract(BallotContract.abi, ballotAddress);
const voterContract = new web3.eth.Contract(VoterContract.abi, voterAddress);

export { web3, ballotContract, voterContract };
