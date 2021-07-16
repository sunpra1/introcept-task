import React, { useState, useLayoutEffect, useContext, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import InputField from "../../components/InputField";
import Select from "../../components/Select";
import Validator from "validator";
import AppContext from "../../context/AppContext";

const countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo (The Democratic Republic of the Congo)", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of Iran)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (Democratic People's Republic of Korea)", "Korea (Republic of Korea)", "Kuwait", "Kyrgyzstan", "Lao (People's Democratic Republic of Lao)", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of Micronesia)", "Moldova (Republic of Moldova)", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

const AddItemScreen = ({ navigation }) => {
    const { add } = useContext(AppContext);
    const [country, setCountry] = useState("0");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [favouritePhoneBrand, setFavouritePhoneBrand] = useState("");
    const [errors, setErrors] = useState({});
    const phoneNumberRef = useRef();
    const favouritePhoneBrandRef = useRef();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add Item",
            headerRight: () => <Text style={styles.action} onPress={() => onSavePressed()} >SAVE</Text>
        });
    }, [navigation]);

    onSavePressed = () => {
        if (validate()) {
            add({ name, phoneNumber, country, favouritePhoneBrand });
            navigation.pop();
        }
    };

    onFocus = (fieldName) => {
        if (Object.keys(errors).includes(fieldName)) {
            delete errors[fieldName];
            setErrors({ ...errors });
        }
    };

    onBlur = (fieldName) => {
        var error = null;
        switch (fieldName) {
            case "name": {
                if (Validator.isEmpty(name))
                    error = "Name is required.";
                else if (!Validator.isEmpty(name) && Validator.isNumeric(name)) {
                    error = "Name cannot be numeric characters";
                } else if (!Validator.isEmpty(name)) {
                    let containsNumeric = false;
                    for (let i = 0; i <= 10; i++) {
                        if (name.indexOf(i) > -1) {
                            containsNumeric = true;
                            break;
                        }
                    }
                    if (containsNumeric) {
                        error = "Name cannot contain numeric characters";
                    }
                }
                break;
            }

            case "phoneNumber": {
                if (Validator.isEmpty(phoneNumber.toString())) {
                    error = "Phone number is required";
                } else if (Validator.trim(phoneNumber.toString()).length !== 10) {
                    error = "Phone number must be 10 characters long";
                } else if (!Validator.isNumeric(phoneNumber.toString())) {
                    error = "Phone number must be numeric value";
                }
                break;
            }

            case "favouritePhoneBrand": {
                if (Validator.isEmpty(favouritePhoneBrand)) {
                    error = "Favourite phone brand is required";
                }
                break;
            }

            default:
                break;
        }
        if (error) {
            setErrors({ ...errors, [fieldName]: error });
        }
        else if (Object.keys(errors).includes(fieldName)) {
            delete errors[fieldName];
            setErrors({ ...errors });
        }
    };

    validate = () => {
        const validarionErrors = {};
        if (Validator.isEmpty(name))
            validarionErrors.name = "Name is required.";
        else if (!Validator.isEmpty(name) && Validator.isNumeric(name)) {
            validarionErrors.name = "Name cannot be numeric characters";
        } else if (!Validator.isEmpty(name)) {
            let containsNumeric = false;
            for (let i = 0; i <= 10; i++) {
                if (name.indexOf(i) > -1) {
                    containsNumeric = true;
                    break;
                }
            }
            if (containsNumeric) {
                validarionErrors.name = "Name cannot contain numeric characters";
            }
        }

        if (Validator.isEmpty(phoneNumber)) {
            validarionErrors.phoneNumber = "Phone number is required";
        } else if (Validator.trim(phoneNumber).length !== 10) {
            validarionErrors.phoneNumber = "Phone number must be 10 characters long";
        } else if (!Validator.isNumeric(phoneNumber)) {
            validarionErrors.phoneNumber = "Phone number must be numeric value";
        }

        if (country === "0") {
            validarionErrors.country = "Country is required";
        } else if (!countries.includes(country)) {
            validarionErrors.country = "Invalid country provided.";
        }

        if (Validator.isEmpty(favouritePhoneBrand)) {
            validarionErrors.favouritePhoneBrand = "Favourite phone brand is required";
        }

        setErrors(validarionErrors);
        return Object.keys(validarionErrors).length === 0;
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>

                <Select error={errors.country} options={countries} defaultOption="SELECT COUNTRY" label="COUNTRY" value={country} setValue={setCountry} onFocus={() => onFocus("country")} />

                <InputField label="NAME" placeholder="e.g. John Doe" error={errors.name} onFocus={() => onFocus("name")} onBlur={() => onBlur("name")} value={name} setValue={setName} returnKeyType="next" onSubmitEditing={() => phoneNumberRef.current.focus()} />

                <InputField label="PHONE NUMBER" placeholder="e.g. 9849147995" keyboardType="number-pad" error={errors.phoneNumber} onFocus={() => onFocus("phoneNumber")} onBlur={() => onBlur("phoneNumber")} value={phoneNumber} setValue={setPhoneNumber} innerRef={phoneNumberRef} onSubmitEditing={() => favouritePhoneBrandRef.current.focus()} returnKeyType="next" />

                <InputField label="FAVORITE PHONE BRAND" placeholder="e.g. One Plus" error={errors.favouritePhoneBrand} onFocus={() => onFocus("favouritePhoneBrand")} onBlur={() => onBlur("favouritePhoneBrand")} value={favouritePhoneBrand} setValue={setFavouritePhoneBrand} innerRef={favouritePhoneBrandRef} returnKeyType="done" onSubmitEditing={() => onSavePressed()} />

            </Card>
        </View>
    );
};

export default AddItemScreen;

const styles = StyleSheet.create({
    container: {
        margin: 12,
        display: "flex"
    },
    action: {
        marginStart: 8,
        marginEnd: 12,
        color: "red"
    },
    card: {
        paddingVertical: 24,
        paddingHorizontal: 8
    }
});