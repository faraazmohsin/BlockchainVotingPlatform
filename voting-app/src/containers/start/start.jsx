import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { motion } from "framer-motion";
import { Logo } from "../../components/logo";
import { Link } from 'react-router-dom';
import Typed from 'react-typed';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #0c7752; //comp: #A41043
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const ButtonContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 85px;
`;

const SubText = styled(motion.div)`
    position: absolute;
    font-size: 1.5rem;
    margin-top: 55px;
    background-color: #F9E79F;
    font-family: 'Press Start 2P', cursive;
    margin: 10vh 0 0 2vw;
    color: #A41043;
`;

const SubTextTwo = styled(motion.div)`
    position: absolute;
    font-size: 1.5rem;
    margin-top: 55px;
    background-color: #F9E79F;
    font-family: 'Press Start 2P', cursive;
    margin: 12vh 0 0 2vw;
    color: #A41043;
`;

const RegText = styled(motion.div)`
    position: absolute;
    font-size: 1.5rem;
    margin-top: 55px;
    background-color: #F9E79F;
    font-family: 'Press Start 2P', cursive;
    margin: 14vh 0 0 2vw;
    color: #A41043;
`;

const Button = styled(motion.button)`
    background-color: #96f5d4;
    border: none;
    color: black;
    width: 125px;
    height: 55px;
    padding: 10px;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1.125rem;
    font-family: 'Poppins', sans-serif;
`;

export function Start(_props) {
    return (
        <div>
            <PageContainer>
            <Typed strings={['Welcome to BlockVote, a decentralized voting experience']}
                    typeSpeed={30}
                    >
                        <SubText />
                    </Typed>
            <Typed strings={['where your vote truly counts!']}
                    typeSpeed={30}
                    startDelay={2000}
                    >
                        <SubTextTwo />
                    </Typed>

            <Typed strings={['Register to vote today.']}
                    typeSpeed={30}
                    startDelay={3000}
                    >
                        <RegText />
                    </Typed>
                <HomeContainer>
                    <Logo/>
                    <ButtonContainer
                        initial = {{opacity: 0}}
                        animate = {{opacity: 1}}
                        transition = {{delay: 1.5, duration: 1.2}}
                    >
                        <Link to="/register">
                            <Button
                                whileHover={{scale: 1.1}}
                            >
                                Start Here
                            </Button>
                        </Link>

                    </ButtonContainer>
                </HomeContainer>
            </PageContainer>
        </div>
    )
};