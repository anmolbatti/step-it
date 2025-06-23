import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

export default PulseCheckIcon = () => {
    return (
        <Svg width="94" height="95" viewBox="0 0 94 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G opacity="0.3">
                <Circle cx="47" cy="47.5" r="20.75" fill="#F8B21E"/>
                <Circle cx="47" cy="47.5" r="13.75" fill="white"/>
                <G opacity="0.2">
                    <Path d="M42 47.7083L45.3333 51.0417L52 44.375" stroke="#2E2B53" strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
                </G>
            </G>
        </Svg>
    );
}


