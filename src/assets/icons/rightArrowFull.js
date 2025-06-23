import React from 'react';
import Svg, { Path, Mask, G } from 'react-native-svg';

export default RightArrowFull = ({ width=14, height=15 }) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#2E2B53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>

    );
}
