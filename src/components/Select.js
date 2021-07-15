import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Select = (props) => {
    const { error, style, label, options, value, setValue, defaultOption } = props;
    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputField, error && styles.inputFieldError]}>
                <Picker {...props} style={[styles.inputField, style]} selectedValue={value} mode="dropdown" onValueChange={(value, _) => setValue(value)} >
                    { defaultOption && <Picker.Item key="0" value={"0"} label={defaultOption} enabled={false} />}
                    {
                        options.map((item, index) => <Picker.Item key={index} value={item} label={item} />)
                    }
                </Picker>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default Select;

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
        paddingVertical: 10,
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
