import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import List from './List';
import AppContext from '../../context/AppContext';
import AppModal from '../../components/AppModal';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
    let { data } = useContext(AppContext);
    const [isModelVisible, setModelVisibility] = useState(false);
    const [isFilterApplied, setFilter] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("0");
    const [selectedFavouritePhoneBrand, setSelectedFavouritePhoneBrand] = useState("0");

    var country = [];
    var favouritePhoneBrand = [];

    data.forEach(element => {
        if (!country.includes(element.country))
            country.push(element.country);
        if (!favouritePhoneBrand.includes(element.favouritePhoneBrand))
            favouritePhoneBrand.push(element.favouritePhoneBrand);
    });

    if (isFilterApplied && selectedCountry !== "0") {
        data = data.filter(element => element.country === selectedCountry);
    }

    if (isFilterApplied && selectedFavouritePhoneBrand !== "0") {
        data = data.filter(element => element.favouritePhoneBrand === selectedFavouritePhoneBrand);
    }

    applyFilter = () => {
        setFilter(true);
        setModelVisibility(false);
    };

    clearFilter = () => {
        setModelVisibility(false);
        setFilter(false);
        setSelectedCountry("0");
        setSelectedFavouritePhoneBrand("0");
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <View style={styles.actionWrapper}>
                    <Text style={styles.action} onPress={() => setModelVisibility(true)} >FILTER</Text>
                    <Text onPress={() => navigation.push("AddItem")} style={styles.action} >ADD</Text>
                </View>
        });
    }, [navigation]);

    return (
        <>
            <View style={styles.container}>
                <List data={data} />
                <AppModal isModelVisible={isModelVisible} setModelVisibility={setModelVisibility} actions={[
                    { title: "CANCEL", action: () => setModelVisibility(false), style: { color: "red" } },
                    { title: "CLEAR", action: () => clearFilter(), style: { color: "#0000FF" } },
                    { title: "APPLY", action: () => applyFilter() }]}>
                    <View style={styles.filterOptionsWrapper}>
                        <Text style={styles.cardHeader}>FILTER OPTIONS</Text>
                        <View style={styles.line} />
                        <Picker style={styles.picker} selectedValue={selectedCountry} mode="dropdown" onValueChange={(value, _) => setSelectedCountry(value)}>
                            <Picker.Item key="0" value={"0"} label={"COUNTRY"} enabled={false} />
                            {
                                country.map((item, index) => <Picker.Item key={index} value={item} label={item} />)
                            }
                        </Picker>

                        <Picker style={styles.picker} selectedValue={selectedFavouritePhoneBrand} mode="dropdown" onValueChange={(value, _) => setSelectedFavouritePhoneBrand(value)}>
                            <Picker.Item key="0" value={"0"} label={"PHONE BRAND"} enabled={false} />
                            {
                                favouritePhoneBrand.map((item, index) => <Picker.Item key={index} value={item} label={item} />)
                            }
                        </Picker>
                    </View>
                </AppModal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        margin: 8
    },
    action: {
        marginHorizontal: 8,
        color: "red"
    },
    actionWrapper: {
        flexDirection: "row"
    },
    filterOptionsWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    picker: {
        display: "flex",
        marginVertical: 12,
        width: (Dimensions.get("window").width / 100) * 60
    },
    cardHeader: {
        fontWeight: "500",
        fontSize: 16,
        color: "#0000FF"
    },
    line: {
        height: 0.5,
        backgroundColor: "#000000",
        display: "flex",
        marginTop: 8,
        marginBottom: 8,
        width: (Dimensions.get("window").width / 100) * 60
    }
});

export default HomeScreen;