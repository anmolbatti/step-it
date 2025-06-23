import { View, Text, StyleSheet, Image, Pressable} from 'react-native';
import HomeIcon from '../assets/icons/HomeIcon';
import PrizesStarIcon from '../assets/icons/PrizesStarIcon';
import ArticlesIcon from '../assets/icons/ArticlesIcon';
import UserProfileIcon from '../assets/icons/UserProfileIcon';


import { useNavigation, useNavigationState } from '@react-navigation/native';

const useCurrentRouteName = () => {
    const state = useNavigationState(state => state);
    const currentRoute = state.routes[state.index];
    return currentRoute.name;
};

export default BottomNavigation = () =>{
    const navigation = useNavigation();

    const navigateHome = () => {
        navigation.navigate("Home");
    }

    const navigateArticles = () => {
        navigation.navigate("Articles");
    }

    const navigatePrizes = () => {
        navigation.navigate("Prizes");
    }

    const navigateProfile = () => {
        navigation.navigate("Profile");
    }

    const currentRouteName = useCurrentRouteName();

    const styles = StyleSheet.create({
        navContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 14,
            paddingLeft: 40,
            paddingRight: 40,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
        navLeft: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',        
        },
        navRight: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',        
        },
        navStar: {        
            alignItems: 'center',
            flexDirection: 'column',
        },
        navCalendar: {
            alignItems: 'center',
            flexDirection: 'column'
        },
        navImage: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
        },
        homeText: {
            color: currentRouteName === 'Home' ? "#212C4D" : "#000",
            fontWeight: currentRouteName === 'Home' ? "600" : "400"
        },
        prizesText: {
            color: currentRouteName === 'Prizes' ? "#212C4D" : "#000",
            fontWeight: currentRouteName === 'Prizes' ? "600" : "400"
        },
        articlesText: {
            color: currentRouteName === 'Articles' ? "#212C4D" : "#000",
            fontWeight: currentRouteName === 'Articles' ? "600" : "400"
        },
        profileText:{
            color: currentRouteName === 'Profile' ? "#212C4D" : "#000",
            fontWeight: currentRouteName === 'Profile' ? "600" : "400"
        }
    });

    return (
        <View style={styles.navContainer}>
            <View style={{flexDirection: "column", alignItems:"center"}}>
                <Pressable onPress={navigateHome} style={{alignItems:"center"}}>
                    <HomeIcon isActive={currentRouteName === 'Home'} />
                    <Text style={styles.homeText}>Home</Text>
                </Pressable>
            </View>
            <View style={styles.navStar}>
                <Pressable onPress={navigatePrizes} style={{alignItems:"center"}}>
                    <PrizesStarIcon isActive={currentRouteName === 'Prizes'} />
                    <Text style={styles.prizesText}>Prizes</Text>
                </Pressable>
            </View>
            <View style={styles.navCalendar}>
                <Pressable onPress={navigateArticles} style={{alignItems:"center"}}>
                    <ArticlesIcon isActive={currentRouteName === 'Articles'} />
                    <Text style={styles.articlesText}>Articles</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={navigateProfile} style={{alignItems:"center"}}>
                    <UserProfileIcon isActive={currentRouteName === 'Profile'} />
                    <Text style={styles.profileText}>Me</Text>
                </Pressable>
            </View>
        </View>        
    );
}