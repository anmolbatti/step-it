import React from 'react';
import Svg, { Path, Mask, G } from 'react-native-svg';

export default CloseIcon = ({ width=14, height=15 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M13 1.5L1 13.5M1 1.5L13 13.5" stroke="#43506C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}
