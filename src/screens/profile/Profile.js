import { View, Image, Pressable } from "react-native";
import ProfileLayout from "../ProfileLayout";
import styles from "./Profile.styles";
import defaultProfile from '../../assets/images/defaultProfile.png';
import RightArrow from "../../assets/icons/RightArrow";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clear } from "../../utils/storage";
import { saveUserStatus, currentUserData, userCoins, stepsCount } from "../../store/reducers/userSlice";
import UseModal from "../../components/UseModal";
import typography from "../../utils/typography";

import {
    RegularText,
    BoldText,
    SemiBold,
    MediumText } from "../../components/AppTexts";
import { useState } from "react";

export default Profile = () => {
    const getUser = useSelector((state) => state.user);
    const [ openConfirmSignOut, setOpenConfirmSignOut ] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const profileImgUrl = getUser?.userSignUpData?.userLoginData?.photo ? {uri: getUser?.userSignUpData?.userLoginData?.photo} : defaultProfile;

    const goToRedeemHistory = () => {
        navigation.navigate("RedemptionHistory");
    }

    const cancelLogout = () => {

    }

    const confirmSignOut = () => {
        setOpenConfirmSignOut(true);
    }

    const signOut = () => {
        clear();
        dispatch(currentUserData({}));
        dispatch(userCoins(0));
        dispatch(stepsCount(0));
        dispatch(saveUserStatus(false));
    }

    return (
        <ProfileLayout pageName={"Account"}>
            <View style={styles.container}>
                <UseModal isModalOpen={openConfirmSignOut} onClose={cancelLogout} showHeader={false}>
                    <View style={{flexDirection: "column", gap: 20, alignItems: "center"}}>
                        <View style={{flexDirection: "column", gap: 10}}>
                            <SemiBold style={{textAlign: "center", fontSize:20}}>Sign out?</SemiBold>
                            <MediumText style={{textAlign: "center"}}>Are you sure you want to sign out?</MediumText>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
                            <Pressable onPress={() => setOpenConfirmSignOut(false)} style={styles.cancelSignOut}>
                                <MediumText style={{textAlign: "center"}}>Cancel</MediumText>
                            </Pressable>

                            <Pressable onPress={signOut} style={styles.confirmSignOut}>
                                <MediumText style={{color: "#fff", textAlign: "center"}}>Yes, sign out</MediumText>
                            </Pressable>
                        </View>
                    </View>
                </UseModal>
                <View style={styles.userDetails}>
                    <Image source={profileImgUrl} style={styles.profileImg} />
                    <View style={styles.userInfo}>
                        <SemiBold style={{fontSize: 18, color: "#0C1433"}}>{getUser?.userSignUpData?.userLoginData?.name }</SemiBold>
                        <RegularText style={{fontSize: 14, color: "#0C1433"}}>{getUser?.userSignUpData?.userLoginData?.email }</RegularText>
                    </View>
                    <View style={styles.rightArrow}>
                        {/* <RightArrow /> */}
                    </View>
                </View>

                <View style={styles.detailTabs}>
                    {/* <View style={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        ...styles.detailSingleTab
                    }}>
                        <View style={styles.detailTabs}>
                            <RegularText style={styles.tabsText}>Personal Details</RegularText>
                        </View>

                        <View style={styles.rightArrow}>
                            <RightArrow />
                        </View>
                    </View> */}

                    {/* <View style={{
                        ...styles.detailSingleTab,
                        borderRadius: 0,
                    }}>
                        <View style={styles.detailTabs}>
                            <RegularText style={styles.tabsText}>Change Move Goal</RegularText>
                        </View>

                        <View style={styles.rightArrow}>
                            <RightArrow />
                        </View>
                    </View> */}


                    {/* <View style={{
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                        ...styles.detailSingleTab
                    }}>
                        <View style={styles.detailTabs}>
                            <RegularText style={styles.tabsText}>Units of Measure</RegularText>
                        </View>

                        <View style={styles.rightArrow}>
                            <RightArrow />
                        </View>
                    </View> */}

                {/* </View>

                <View style={styles.detailTabs}>
                    <View style={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        ...styles.detailSingleTab
                    }}>
                        <View style={styles.detailTabs}>
                            <RegularText style={styles.tabsText}>Notifications</RegularText>
                        </View>

                        <View style={styles.rightArrow}>
                            <RightArrow />
                        </View>
                    </View> */}

                    <Pressable onPress={goToRedeemHistory}>
                        <View style={{
                            ...styles.detailSingleTab,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            // borderRadius: 0,
                        }}>
                                <View style={styles.detailTabs}>
                                    <RegularText style={styles.tabsText}>My Rewards</RegularText>
                                </View>

                            <View style={styles.rightArrow}>
                                <RightArrow />
                            </View>
                        </View>
                    </Pressable>


                    {/* <View style={{
                        ...styles.detailSingleTab,
                        borderRadius: 0,
                    }}>
                        <View style={styles.detailTabs}>
                            <RegularText style={styles.tabsText}>Coins Conversion History</RegularText>
                        </View>

                        <View style={styles.rightArrow}>
                            <RightArrow />
                        </View>
                    </View> */}

                    {/* <View style={{
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                        ...styles.detailSingleTab
                    }}>
                        <View style={styles.detailTabs}>
                            <RegularText style={styles.tabsText}>Privacy Policy</RegularText>
                        </View>

                        <View style={styles.rightArrow}>
                            <RightArrow />
                        </View>
                    </View> */}


                    <Pressable onPress={confirmSignOut}>
                        <View style={{
                            borderTopRightRadius: 0,
                            borderTopLeftRadius: 0,
                            ...styles.detailSingleTab
                        }}>
                            <View style={styles.detailTabs}>
                                <RegularText style={styles.tabsText}>Sign Out</RegularText>
                            </View>

                            <View style={styles.rightArrow}>
                                <RightArrow />
                            </View>
                        </View>
                    </Pressable>

                </View>

                <View>
                    <MediumText style={{color: "#2E2B53", textAlign: "center", fontSize: 14}}>App Version: 1.0.0.0</MediumText>
                </View>
            </View>
        </ProfileLayout>
    );
}
