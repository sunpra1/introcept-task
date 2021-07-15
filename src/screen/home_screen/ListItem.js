import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from 'react-native-reanimated';
import Card from '../../components/Card';

const ListItem = ({ item }) => {
    return (
        <Card style={styles.card}>
            <Text style={styles.headline}>{item.name}</Text>
            <View style={styles.row}>
                <View style={styles.rowItem}>
                    <Text style={styles.subTitle}>COUNTRY: {item.country}</Text>
                </View>
                <View style={styles.rowItem}>
                    <Text style={styles.subTitle}>PHONE BRAND: {item.favouritePhoneBrand}</Text>
                </View>
                <View style={styles.rowItem}>
                    <Text style={styles.subTitle}>PHONE NUMBER: {item.phoneNumber}</Text>
                </View>
            </View>
        </Card>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    headline: {
        fontWeight: "400",
        color: "#0000FF"
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowItem: {
        flex: 1
    },
    subTitle: {
        color: "#808080",
        fontSize: 11

    },
    card: {
        padding: 12,
        marginBottom: 12
    }
});
