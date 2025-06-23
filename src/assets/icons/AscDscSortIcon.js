import React from 'react';
import Svg, { Path, Mask, G , Defs, LinearGradient, Stop} from 'react-native-svg';

export default AscDscSortIcon = ({ isActive=false }) => {
    return (
        <Svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M4.83301 3.66665L8.16634 0.333313L11.4997 3.66665H4.83301Z" fill={isActive ? "#E53C6B" : "#2E2B53"}/>
            <Path d="M8.16634 9.19524L5.63775 6.66665H10.6949L8.16634 9.19524Z" stroke={isActive ? "#E53C6B" : "#2E2B53"} strokeWidth="0.666667"/>
        </Svg>


    );
}
