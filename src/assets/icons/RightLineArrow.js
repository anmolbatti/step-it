import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default RightLineArrow = ({width=8, height=13, color="black"}) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3.33398 8H12.6673" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M8 3.33333L12.6667 8L8 12.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}
