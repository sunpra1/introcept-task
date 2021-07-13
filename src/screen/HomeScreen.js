import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppContext from '../context/AppContext';

const HomeScreen = () => {
    const data = useContext(AppContext);
    return (
        <View style={styles.container}>
            <Text>Welcome to home screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        margin: 12
    }
});

export default HomeScreen;
