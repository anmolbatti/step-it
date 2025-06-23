import React from 'react';
import Svg, { Path, Mask, G , Defs, LinearGradient, Stop} from 'react-native-svg';

export default ArticlesIcon = ({ isActive=false }) => {
    return (
        isActive ? (
            <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path fillRule="evenodd" clipRule="evenodd" d="M5.56 0H13.941C17.03 0 18.75 1.78 18.75 4.83V15.16C18.75 18.26 17.03 20 13.941 20H5.56C2.52 20 0.75 18.26 0.75 15.16V4.83C0.75 1.78 2.52 0 5.56 0ZM5.83 4.66V4.65H8.819C9.25 4.65 9.6 5 9.6 5.429C9.6 5.87 9.25 6.22 8.819 6.22H5.83C5.399 6.22 5.05 5.87 5.05 5.44C5.05 5.01 5.399 4.66 5.83 4.66ZM5.83 10.74H13.67C14.1 10.74 14.45 10.39 14.45 9.96C14.45 9.53 14.1 9.179 13.67 9.179H5.83C5.399 9.179 5.05 9.53 5.05 9.96C5.05 10.39 5.399 10.74 5.83 10.74ZM5.83 15.31H13.67C14.069 15.27 14.37 14.929 14.37 14.53C14.37 14.12 14.069 13.78 13.67 13.74H5.83C5.53 13.71 5.24 13.85 5.08 14.11C4.92 14.36 4.92 14.69 5.08 14.95C5.24 15.2 5.53 15.35 5.83 15.31Z" fill="url(#paint0_linear_1849_1807)"/>
                <Defs>
                <LinearGradient id="paint0_linear_1849_1807" x1="9.75" y1="0" x2="9.75" y2="20" gradientUnits="userSpaceOnUse">
                <Stop stopColor="#1E376F"/>
                <Stop offset="1" stopColor="#3D619B"/>
                </LinearGradient>
                </Defs>
            </Svg>

        ) : (
            <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M13.4661 14.2234H6.24609" stroke="#43506C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M13.4661 10.0369H6.24609" stroke="#43506C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path d="M9.00207 5.86011H6.24707" stroke="#43506C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <Path fillRule="evenodd" clipRule="evenodd" d="M13.659 0.749756C13.659 0.749756 5.98198 0.753756 5.96998 0.753756C3.20998 0.770756 1.50098 2.58676 1.50098 5.35676V14.5528C1.50098 17.3368 3.22298 19.1598 6.00698 19.1598C6.00698 19.1598 13.683 19.1568 13.696 19.1568C16.456 19.1398 18.166 17.3228 18.166 14.5528V5.35676C18.166 2.57276 16.443 0.749756 13.659 0.749756Z" stroke="#43506C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )

    );
}
