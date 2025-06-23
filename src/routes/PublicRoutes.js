import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/welcome/Welcome';
import WelcomeLoader from '../screens/welcome/WelcomeLoader';
import PreviewDetails from '../screens/welcome/signupTabs/PreviewDetails';
import AllowAccess from '../screens/welcome/signupTabs/AllowAccess';
import PhysicalSelection from '../screens/welcome/signupTabs/PhysicalSelection';

import {
  RegularText,
  BoldText,
  SemiBold,
  MediumText } from "../components/AppTexts";

const Stack = createNativeStackNavigator();

export default function PublicRoutes() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{title: 'Welcome'}}
          />

          <Stack.Screen
            name="WelcomeLoader"
            component={WelcomeLoader}
            options={{title: 'Welcome'}}
          />

          <Stack.Screen
            name="PreviewDetails"
            component={PreviewDetails}
            options={{title: 'Welcome'}}
          />

          <Stack.Screen
            name="AllowAccess"
            component={AllowAccess}
            options={{title: 'AllowAccess'}}
          />

          <Stack.Screen
            name="PhysicalSelection"
            component={PhysicalSelection}
            options={{title: 'PhysicalSelection'}}
          />

      </Stack.Navigator>
  );
}
