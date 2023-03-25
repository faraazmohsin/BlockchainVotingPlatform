import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #0c7752; //comp: #A41043
    width: 100%;
    height: 100vh;
`;

const EndContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16vh 0 0 0;
`;

export function End(_props) {

    // Prevents user from going back *Crucial to stay on voting page and complete the process
    window.history.pushState(null, null, `${window.location.pathname}?preventBack=true`);

    return (
        <div>
            <PageContainer>
                <EndContainer>
                    <img src="https://media.giphy.com/media/5xtDarmwsuR9sDRObyU/giphy.gif" style={{ width: '800px', height: '500px', borderRadius: "50px"}} />
                </EndContainer>
            </PageContainer>
        </div>
    )
};