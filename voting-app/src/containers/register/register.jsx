import React from 'react';
import styled from 'styled-components';
import Typed from 'react-typed';
import { motion } from "framer-motion";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Web3 from 'web3';
import VoterContract from '../../contracts/Voter.json';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #0c7752; //comp: #A41043
    width: 100%;
    height: 100vh;
`;

const TopText = styled(motion.div)`
    position: absolute;
    font-size: 1.3rem;
    margin-top: 55px;
    font-family: 'Press Start 2P', cursive;
    margin: 8vh 0 0 2vw;
    color: #A41043;
    background-color: #F9E79F;
`;

const NameContainer = styled(motion.div)`
    position: absolute;
    margin: 25vh 0 0 2vw;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
`;

const EmailContainer = styled(motion.div)`
    position: absolute;
    margin: 50vh 0 0 2vw;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
`;

const ButtonContainer = styled(motion.div)`
    position: absolute;
    margin: 75vh 0 0 2vw;
`;

const GIFContainer = styled(motion.div)`
    position: absolute;
    margin: 30vh 0 0 58vw;
`;

// alternate gif: https://media.giphy.com/media/qeFPEYUQcOUjXd4KZr/giphy.gif
// https://media.giphy.com/media/zTjHXPniJp5JOpWizW/giphy.gif
// https://media.giphy.com/media/mwMprviPPDistnxRNx/giphy.gif

export function Register(_props) {

    // Required Validations from Material UI
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Validation for name
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    // Validation for email
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Button validation
    let web3;

    const handleSubmit = async () => {
        const provider = new Web3.providers.HttpProvider(
            'http://localhost:7545'
        );

        // Validation to check if required fields are empty
        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        web3 = new Web3(provider);
        const voterAddress = '0xe5f728bDc39A4aC4dCCa1fe209687Ad9Ea9EF044';
        const voterContract = new web3.eth.Contract(VoterContract.abi, voterAddress);
        const accounts = await web3.eth.getAccounts();

        const nameHash = web3.utils.utf8ToHex(name);
        const emailHash = web3.utils.utf8ToHex(email);
        const existingUser = await voterContract.methods.nameEmailToAddress(nameHash, emailHash).call();

        // Validation to check if user 'name' and 'email' are already registered
        if (existingUser !== "0x0000000000000000000000000000000000000000") {
            alert(`User with the same name and email has already registered`);
            return;
        }
        await voterContract.methods.registerUser(web3.utils.utf8ToHex(name), web3.utils.utf8ToHex(email)).send({ from: accounts[0], gas: 200000 });
        console.log(`Name: ${name}, Email: ${email}`);
    };

    return (
        <div>
            <PageContainer>
                <Typed
                    strings={['Registration is quick and easy - all we need is your name and email. ']}
                    typeSpeed={30}
                >
                    <TopText />
                </Typed>

                <NameContainer>
                    <TextField
                        label="Name"
                        placeholder="Enter your full name"
                        variant="filled"
                        size="large"
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: '#F9E79F',
                                height: '15vh',
                                width: '40vw',
                                fontSize: '2rem',
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                color: '#A41043',
                                fontWeight: 'bold',
                                fontSize: '2.5rem'
                            }
                        }}
                        required
                        value={name}
                        onChange={handleNameChange}
                    />
                </NameContainer>

                <EmailContainer>
                    <TextField
                        label="Email"
                        placeholder="Enter your email address"
                        variant="filled"
                        size="large"
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: '#F9E79F',
                                height: '15vh',
                                width: '40vw',
                                fontSize: '2rem'
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                color: '#A41043',
                                fontWeight: 'bold',
                                fontSize: '2.5rem'
                            }
                        }}
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </EmailContainer>

                <ButtonContainer whileHover={{scale: 1.1}}>
                    <Button
                        variant="contained"
                        color="#F9E79F"
                        size="large"
                        onClick={handleSubmit}
                    > Register
                    </Button>
                </ButtonContainer>

                <GIFContainer>
                <img src="https://media.giphy.com/media/zTjHXPniJp5JOpWizW/giphy.gif" alt="" style={{ width: "400px", height: "350px", borderRadius: "25%" }}/>
                </GIFContainer>

            </PageContainer>
        </div>
    )
};