import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import ListItem from './ListItem';

const List = ({ data }) => {
    if (data.length === 0)
        return <Text style={styles.text}>NO RECORD(S) YET</Text>;

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};


const styles = StyleSheet.create({
    text: {
        marginTop: 16,
        fontWeight: "bold",
        color: "#FF0000",
        textAlign: "center"

    }
});

export default List;