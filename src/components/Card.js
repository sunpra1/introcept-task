import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ style, children }) {
    return (
        <View style={[styles.card, style]}>
            {
                children
            }
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        borderColor: "#fff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2.5
    }
});
