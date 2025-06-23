import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import CloseIcon from "../assets/icons/CloseIcon";

export default UseModal = ({isModalOpen, onClose, showHeader=true, children}) => {

    const styles = StyleSheet.create({
        modalContent: {
            flex: 1,
            justifyContent: 'center',
            marginLeft: 20,
            marginRight: 20
        },
        modalView: {
            backgroundColor: '#ffff',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: "100%",
            paddingVertical: showHeader ? 32 : 22,
            paddingHorizontal: 28,
            flexDirection: "column",
            gap: 20
            
        },
        modalClose: {
            alignItems: "flex-end",
            marginRight: 6
        },
        innerContent: {
            paddingHorizontal: showHeader ? 26 : 10
        },
        modalOverlay: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    });

    return (
        <Modal animationType="fade" transparent={true} backgroundColor={"#2E2B53"} visible={isModalOpen}>
            <TouchableWithoutFeedback onPress={onClose} >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalView}>
                            {showHeader && (
                                <View style={styles.modalClose}>
                                    <Pressable onPress={onClose}>
                                        <CloseIcon />
                                    </Pressable>
                                </View>
                            )}

                            <View style={styles.innerContent}>
                                {children}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}