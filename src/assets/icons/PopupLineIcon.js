import React from 'react';
import Svg, { Rect } from 'react-native-svg';

export default PopupLineIcon = ({ width = 14, height = 15 }) => {
    return (
        <Svg width="48" height="4" viewBox="0 0 48 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect opacity="0.5" width="48" height="4" rx="2" fill="#A2B5D2"/>
        </Svg>
    );
}