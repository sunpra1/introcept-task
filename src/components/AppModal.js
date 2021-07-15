import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';

const AppModal = ({ children, isModelVisible, setModelVisibility, actions = [] }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModelVisible}
            onRequestClose={() => {
                setModelVisibility(!isModelVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {
                        children
                    }
                    {
                        actions.length > 0 &&
                        <View style={styles.actionsWrapper}>
                            {
                                actions.map((action, index) => <Text key={index} style={[styles.action, action.style]} onPress={action.action} >{action.title}</Text>)
                            }
                        </View>
                    }
                </View>
            </View>
        </Modal>
    );
};

export default AppModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    modalView: {
        margin: 16,
        backgroundColor: "white",
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1.5
    },
    actionsWrapper: {
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 16
    },
    action: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    }
});
