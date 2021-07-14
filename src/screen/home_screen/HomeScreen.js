import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import List from './List';
import AppContext from '../../context/AppContext';

const HomeScreen = () => {
    const {data} = useContext(AppContext);
    return (
        <View style={styles.container}>
           <List data={data} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        margin: 8
    }
});

export default HomeScreen;
