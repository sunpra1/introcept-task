import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        marginBottom: 8,
        padding: 12,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2.5
    }
});
