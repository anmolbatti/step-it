import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default RightArrowIcon = ({width=8, height=13, color="black"}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.999531 1.21063C0.609531 1.60063 0.609531 2.23063 0.999531 2.62063L4.87953 6.50063L0.999531 10.3806C0.609531 10.7706 0.609531 11.4006 0.999531 11.7906C1.38953 12.1806 2.01953 12.1806 2.40953 11.7906L6.99953 7.20063C7.38953 6.81063 7.38953 6.18063 6.99953 5.79063L2.40953 1.20063C2.02953 0.820632 1.38953 0.820632 0.999531 1.21063Z" fill={color}/>
        </Svg>
    );
}
