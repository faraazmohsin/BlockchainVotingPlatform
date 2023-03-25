import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import Typed from 'react-typed';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #0c7752; //comp: #A41043
    width: 100%;
    height: 100vh;
`;

const EndContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #0c7752; //comp: #A41043
    align-items: center;
    margin: 16vh 0 0 0;
`;

const EndText = styled(motion.div)`
    display: flex;
    justify-content: center;
    font-family: 'Press Start 2P', cursive;
    color: #A41043;
    background-color: #F9E79F;
    font-size: 1.5rem;
    align-items: center;
    margin: 0 0 10vh 0;
`;

export function End(_props) {

    // Prevents user from going back *Crucial to stay on voting page and complete the process
    window.history.pushState(null, null, `${window.location.pathname}?preventBack=true`);

    return (
        <div>
            <PageContainer>
                <EndContainer>
                    <Typed
                        strings={['Vote submitted successfully.']}
                        typeSpeed={30}
                        showCursor={false}
                        >
                            <EndText/>
                    </Typed>
                    <img src="https://media.giphy.com/media/5xtDarmwsuR9sDRObyU/giphy.gif" style={{ width: '700px', height: '400px', borderRadius: "50px"}} />
                </EndContainer>
            </PageContainer>
        </div>
    )
};