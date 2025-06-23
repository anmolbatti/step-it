import React from 'react';
import Svg, { Path, Mask, G, Rect } from 'react-native-svg';

export default DefaultAvatar = () => {
    return (
        <Svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="-0.00292969" y="0.000976562" width="120" height="120" rx="60" fill="#E4EDF7"/>
            <Path d="M76 78C76 75.2089 76 73.8133 75.6555 72.6777C74.8799 70.1209 72.8791 68.1201 70.3223 67.3445C69.1867 67 67.7911 67 65 67H55C52.2089 67 50.8133 67 49.6777 67.3445C47.1209 68.1201 45.1201 70.1209 44.3445 72.6777C44 73.8133 44 75.2089 44 78M69 51C69 55.9706 64.9706 60 60 60C55.0294 60 51 55.9706 51 51C51 46.0294 55.0294 42 60 42C64.9706 42 69 46.0294 69 51Z" stroke="#43506C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <Rect x="76" y="76" width="44" height="44" rx="22" fill="#ED9728"/>
            <Path d="M104 99H99V104C99 104.55 98.55 105 98 105C97.45 105 97 104.55 97 104V99H92C91.45 99 91 98.55 91 98C91 97.45 91.45 97 92 97H97V92C97 91.45 97.45 91 98 91C98.55 91 99 91.45 99 92V97H104C104.55 97 105 97.45 105 98C105 98.55 104.55 99 104 99Z" fill="white"/>
        </Svg>
    );
}
