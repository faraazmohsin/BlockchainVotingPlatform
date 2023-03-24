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

const ballotAddress = '0x607EbAB9422C0079AD6b994652462db202e0e8Da'; // Replace with the deployed ballot contract address
const voterAddress = '0x39F45Ba69C16928e63195bD813fE37Df1d7C3Fb4'; // Replace with the deployed voter contract address

const ballotContract = new web3.eth.Contract(BallotContract.abi, ballotAddress);
const voterContract = new web3.eth.Contract(VoterContract.abi, voterAddress);

export { web3, ballotContract, voterContract };
