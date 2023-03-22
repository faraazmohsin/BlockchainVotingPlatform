import React from 'react';
import styled from 'styled-components';
import siteLogo from '../../assets/logo/bv-logo2.svg';
import { motion } from 'framer-motion';

const LogoContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImg = styled.img`
    margin: 15vh 0 0 0;
    width: 210px;
    height: 189px;
`;

export function Logo(_props) {
    return (
        <LogoContainer
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            transition = {{delay: 0.5, duration: 1}}
        >
            <LogoImg src = {siteLogo}/>
        </LogoContainer>
    )
};