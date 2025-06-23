import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default CheckIcon = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="12" cy="12" r="8" fill="#229E35"/>
            <Path d="M9.5 12L11.3939 13.8939C11.4525 13.9525 11.5475 13.9525 11.6061 13.8939L15.5 10" stroke="white" stroke-width="1.2"/>
        </Svg>

    );
}
