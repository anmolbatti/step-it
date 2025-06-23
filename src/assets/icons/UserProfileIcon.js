import React from 'react';
import Svg, { Path, Mask, G , Defs, LinearGradient, Stop} from 'react-native-svg';

export default UserProfileIcon = ({ isActive=false }) => {
    return (
        isActive ? (
            <Svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M13.544 5.29105C13.544 8.22808 11.1891 10.5831 8.25 10.5831C5.3119 10.5831 2.95601 8.22808 2.95601 5.29105C2.95601 2.35402 5.3119 0 8.25 0C11.1891 0 13.544 2.35402 13.544 5.29105ZM8.25 20C3.91237 20 0.25 19.295 0.25 16.575C0.25 13.8539 3.93538 13.1739 8.25 13.1739C12.5886 13.1739 16.25 13.8789 16.25 16.599C16.25 19.32 12.5646 20 8.25 20Z" fill="url(#paint0_linear_1849_792)"/>
                <Defs>
                <LinearGradient id="paint0_linear_1849_792" x1="8.25" y1="0" x2="8.25" y2="20" gradientUnits="userSpaceOnUse">
                <Stop stopColor="#1E376F"/>
                <Stop offset="1" stopColor="#3D619B"/>
                </LinearGradient>
                </Defs>
            </Svg>
            
        ) : (
            <Svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M8.09455 20.6619C4.40273 20.6619 1.25 20.0874 1.25 17.7867C1.25 15.4859 4.38273 13.3619 8.09455 13.3619C11.7864 13.3619 14.9391 15.4653 14.9391 17.7661C14.9391 20.0659 11.8064 20.6619 8.09455 20.6619Z" stroke="#43506C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path fillRule="evenodd" clipRule="evenodd" d="M8.08749 10.1737C10.5102 10.1737 12.4739 8.21002 12.4739 5.7873C12.4739 3.36457 10.5102 1.40002 8.08749 1.40002C5.66477 1.40002 3.70022 3.36457 3.70022 5.7873C3.69204 8.20184 5.64204 10.1655 8.05658 10.1737C8.06749 10.1737 8.07749 10.1737 8.08749 10.1737Z" stroke="#43506C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    );
}
