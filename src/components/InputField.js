import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const InputField = (props) => {

    const { error, label, setValue, innerRef } = props;

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput {...props} onChangeText={setValue} style={[styles.inputField, error && styles.inputFieldError]} ref={innerRef} />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        marginHorizontal: 12,
        marginBottom: 12
    },
    label: {
        color: "blue",
        marginBottom: 8
    },
    inputField: {
        padding: 8,
        borderWidth: 1,
        borderColor: "grey"
    },
    inputFieldError: {
        borderColor: "red"
    },
    errorText: {
        marginTop: 4,
        color: "red"
    }
});
