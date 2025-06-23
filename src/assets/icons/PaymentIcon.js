import React from 'react';
import Svg, { Path, Mask, G, Rect,Circle } from 'react-native-svg';

export default PaymentAppIcon = ({ width = 14, height = 15 }) => {
    return (
        <Svg width="52" height="52" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Mask id="mask0_1338_5289" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="41" height="41">
                <Circle cx="21.0003" cy="20.9995" r="20.0003" fill="#C4C4C4" />
            </Mask>
            <G mask="url(#mask0_1338_5289)">
                <Rect x="1" y="6.56354" width="18.7503" height="38.1863" rx="2.50004" fill="#1075DB" fill-opacity="0.35" />
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.06364C0 7.13062 1.56702 5.5636 3.50004 5.5636H17.2502C19.1833 5.5636 20.7503 7.13062 20.7503 9.06364V16H21C21.6904 16 22.25 16.5596 22.25 17.25V24.7501C22.25 25.4405 21.6904 26.0001 21 26.0001H20.7503V42.2499C20.7503 44.1829 19.1833 45.7499 17.2502 45.7499H3.50004C1.56702 45.7499 0 44.1829 0 42.2499V9.06364ZM3.50004 7.5636C2.67159 7.5636 2 8.23519 2 9.06364V42.2499C2 43.0783 2.67159 43.7499 3.50004 43.7499H17.2502C18.0787 43.7499 18.7503 43.0783 18.7503 42.2499V9.06364C18.7503 8.23519 18.0787 7.5636 17.2502 7.5636H14.5V7.74913C14.5 8.43949 13.9403 8.99915 13.25 8.99915H6.75002C6.05965 8.99915 5.5 8.43949 5.5 7.74913V7.5636H3.50004Z" fill="#0E83FE" />
                <Path d="M37.2502 20.9992H26M26 20.9992L31.0001 15.9991M26 20.9992L31.0001 25.9993" stroke="#0E83FE" stroke-width="2" stroke-linecap="round" />
            </G>
            <Circle cx="21.0003" cy="20.9995" r="20.0003" stroke="#0E83FE" stroke-width="2" />
        </Svg>

    );
}
