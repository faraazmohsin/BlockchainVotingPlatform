const Ballot = artifacts.require('Ballot');
const Voter = artifacts.require('Voter');

module.exports = async function(deployer) {
  // Deploy Ballot contract with constructor arguments
  await deployer.deploy(Ballot, ['candidate1', 'candidate2', 'candidate3']);
  const ballot = await Ballot.deployed();

  // Deploy Voter contract and pass the address of the Ballot contract to the constructor
  await deployer.deploy(Voter, ballot.address);
  const voter = await Voter.deployed();

  console.log('Ballot contract address:', ballot.address);
  console.log('Voter contract address:', voter.address);
};
