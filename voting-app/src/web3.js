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
    'https://mainnet.infura.io/v3/45384c0bfec84b119b57d15bffc2e49f'
  );
  web3 = new Web3(provider);
}

const ballotAddress = '0x4AcfdBf97562EfBEAD3bA3F04970d2C93d2FF611'; // Replace with the deployed ballot contract address
const voterAddress = '0x3Aad3320Da4908CEcB4489C575982dd1CbF1aB34'; // Replace with the deployed voter contract address

const ballotContract = new web3.eth.Contract(BallotContract.abi, ballotAddress);
const voterContract = new web3.eth.Contract(VoterContract.abi, voterAddress);

export { web3, ballotContract, voterContract };
