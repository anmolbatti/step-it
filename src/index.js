import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';
import AppFonts from './utils/AppFonts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppIntro from './screens/appIntro/AppIntro';
import { userStatus, fetchUserStatus, currentUserData } from "./store/reducers/userSlice";
import { useSelector, useDispatch } from 'react-redux';
// import { getItem } from './utils/storage';
import { get } from "./utils/axios";
import { AuthProvider } from "./hooks/AuthProvider";
import ErrorBoundary from './utils/ErrorBoundry';
import { getItem } from './utils/storage';
import AppLoading from './screens/AppLoading';

export default function AppRoot() {
  const [ showApp, setShowApp ] = useState(false); 
  const getUserStatus = useSelector((state) => state.user.userStatus);
  const getUser = useSelector((state) => state.user);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false); 
  const [ isAppLoaded, setIsAppLoaded ] = useState(false);

  const dispatch = useDispatch();

  const onDone = () => {
    setShowApp(true);
  }

  const fontsLoaded = AppFonts();

  const getUserData = async () => {
    try {
      const accessToken = await getItem("accessToken");
      if(accessToken){

        const userData = await get("profile/");
        
        var payload = {
          ...getUser.userSignUpData,
          "userLoginData": userData
        }
        
        dispatch(currentUserData(payload))
      }else{
        setIsLoggedIn(false);
      }
      
    } catch (err) {
      console.log("Error getting profile: ", err);
    }
  }
  
  useEffect(() => {
    setIsLoggedIn(false);
    dispatch(fetchUserStatus());
    getUserData();

    setTimeout(() => {
      setIsAppLoaded(true);
    }, 2000);
  }, []);

  useEffect(() => {
    getUserData();
    setIsLoggedIn(getUserStatus);
  }, [getUserStatus]);

  if(!isAppLoaded){
    return <AppLoading />
  }
  
  if (!fontsLoaded) {
    return null;
  }


  return (
        <SafeAreaProvider>
            <ErrorBoundary>
              <NavigationContainer>
                  <AuthProvider>
                    {isLoggedIn === true ? ( <ProtectedRoutes /> ) : 

                        ( showApp ? ( <PublicRoutes /> ) : (
                          <AppIntro onDone={onDone} />
                        ))
                    }
                  </AuthProvider>
              </NavigationContainer>
            </ErrorBoundary>
        </SafeAreaProvider>
  );
}