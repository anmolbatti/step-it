import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Dimensions } from "react-native";

import Home from '../screens/home/Home';
import Articles from '../screens/articles/Articles';
import Prizes from '../screens/prizes/Prizes';
import Profile from '../screens/profile/Profile';
import DailyActivities from '../screens/dailyActivities/DailyActivities';

import HomeIcon from '../assets/icons/HomeIcon';
import PrizesStarIcon from '../assets/icons/PrizesStarIcon';
import ArticlesIcon from '../assets/icons/ArticlesIcon';
import UserProfileIcon from '../assets/icons/UserProfileIcon';
import { Text } from 'react-native';
import SinglePrize from '../screens/singlePrize/SinglePrize';
import RedemptionDetail from '../screens/redemptionDetail/RedemptionDetails';
import SingleArticle from '../screens/singleArticle/SingleArticle';
import RedemptionHistory from '../screens/redemptionHistory/RedemptionHistory';
import PhysicalSelection from '../screens/welcome/signupTabs/PhysicalSelection';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  RegularText,
  BoldText,
  SemiBold,
  MediumText } from "../components/AppTexts";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabsNav() {

  const screenOptions = {
    tabBarStyle:{
      backgroundColor:'#ffff',
      height: 70,
      paddingTop: 14,
      paddingBottom: 14
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff', // Change this to your desired background color
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator {...{ screenOptions }}>
        <Tab.Screen name="Home" component={Home} 
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <HomeIcon isActive={focused ? true : false } />
              );
            },
            headerShown:false,
            tabBarActiveTintColor: 'black',
            tabBarLabel: ({ focused }) => (
              <MediumText style={{fontWeight: focused ? "600" : "400", fontSize: 16}}>Home</MediumText>
            )
          }}
        />
        <Tab.Screen name="Prizes" component={Prizes} 
          options={{
            title: 'Prizes',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <PrizesStarIcon isActive={focused ? true : false} />
              );
            },
            headerShown:false,
            tabBarActiveTintColor: 'black',
            tabBarLabel: ({ focused }) => (
              <MediumText style={{fontWeight: focused ? "600" : "400", fontSize: 16}}>Rewards</MediumText>
            )
          }}
        />
        <Tab.Screen name="Articles" component={Articles}
          options={{
            title: 'Articles',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <ArticlesIcon isActive={focused ? true : false} />
              );
            },
            headerShown:false,
            tabBarActiveTintColor: 'black',
            tabBarLabel: ({ focused }) => (
              <MediumText style={{fontWeight: focused ? "600" : "400", fontSize: 16}}>Articles</MediumText>
            )
          }}
        />
        <Tab.Screen name="Profile" component={Profile} 
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <UserProfileIcon isActive={focused ? true : false} />
              );
            },
            headerShown:false,
            tabBarActiveTintColor: 'black',
            tabBarLabel: ({ focused }) => (
              <MediumText style={{fontWeight: focused ? "600" : "400", fontSize: 16}}>Profile</MediumText>
            )
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function ProtectedRoutes() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Tabs"
            component={BottomTabsNav}
          />

          <Stack.Screen
            name="DailyActivities"
            component={DailyActivities}
            options={{title: 'DailyActivities'}}
          />

          <Stack.Screen
            name="SinglePrize"
            component={SinglePrize}
            options={{title: 'SinglePrize'}}
          />

          <Stack.Screen
            name="RedemptionDetail"
            component={RedemptionDetail}
            options={{title: 'RedemptionDetail'}}
          />

          <Stack.Screen
            name="SingleArticle"
            component={SingleArticle}
            options={{title: 'SingleArticle'}}
          />

          <Stack.Screen
            name="RedemptionHistory"
            component={RedemptionHistory}
            options={{title: 'RedemptionHistory'}}
          />

      </Stack.Navigator>
  );
}
