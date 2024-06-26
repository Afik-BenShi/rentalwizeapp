import { useEffect, useState } from "react";
import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import { Input } from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from "./imagePicker";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './addProduct.style'
import { COLORS } from "../../assets/theme";

import DateTimePickerExample from "./DatePick";
import SingleSelectedDropDown from "./SingleSelectListDropDown";
import {serverPath} from '../../backend.config.json';
import { getUser } from "../auth/auth";

const FillPersonalDetails = ({ sendDataToParent, sendStartDateToParent, sendEndDateToParent, sendCatToParent }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [imgSelected, setImgSelected] = useState(false);
    const [endDateHasChanged, setEndDateHasChanged] = useState(false)
    const [valueInInvalidInput, setValueInInvalidInput] = useState(null);

    const [valid, setValid] = useState(false);
    const [userToken, setToken] = useState('');

    const onStartDateChange = (selectedDate) => {
        // handle case that user selects start date after end date
        if (endDateHasChanged && selectedDate > endDate) {
            alert("Start date must be before end date, select availability dates again");
            setValid(false);
            setStartDate(selectedDate);

            sendStartDateToParent(selectedDate);
            sendEndDateToParent(selectedDate);
            return;
        }
        else if (!valid) {
            setStartDate(selectedDate);
            setValueInInvalidInput(selectedDate)

            sendStartDateToParent(selectedDate);
            sendEndDateToParent(selectedDate);
            setValid(true);
        }
        else {
            setValueInInvalidInput(null);
            setStartDate(selectedDate);
            sendStartDateToParent(selectedDate);
        }
    };

    const onEndDateChange = (selectedDate) => {
        setEndDate(selectedDate);
        setEndDateHasChanged(true);
        const end = endDate ? endDate.toLocaleString() : 'Not selected';

        sendEndDateToParent(selectedDate);
    };

    const pickImage = async (image) => {
        if (image) {
            setImgSelected(true);
            sendDataToParent("imageUri", image.uri)
        }
        else {
            setImgSelected(false);
        }
    };

    useEffect(() => {
        (async () => {
            setToken(await getUser()?.getIdToken());
        })()
    })


    const clearImgSelection = () => {
        setImgSelected(false);
        sendDataToParent("imageUri", "");
    };

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={styles.container}>


                <View style={styles.header}>
                    <Text style={styles.title}>Add your product here </Text>
                </View>
            </View>

            <ScrollView keyboardShouldPersistTaps='handled' >
                <View>
                    <Input
                        label="Product name"
                        labelStyle={styles.inputLabel}
                        placeholder=" Enter product name"
                        onChangeText={(text) => sendDataToParent("productName", text)}
                        inputStyle={styles.inputControl}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />

                    <View style={{ flex: 1, padding: 20 }}>
                        <Text style={{ ...styles.inputLabel, marginLeft: 0 }}>Product category</Text>
                        <SingleSelectedDropDown
                            onSelectCategory={sendCatToParent}
                        />
                    </View>

                    <View style={{ flex: 1, padding: 20 }}>
                        <Text style={{ ...styles.inputLabel, marginLeft: 0 }}>Location</Text>

                        <GooglePlacesAutocomplete
                            disableScroll={true}
                            placeholder="Enter your location"
                            minLength={3} 
                            fetchDetails={true}
                            returnKeyType={'default'}
                            onPress={(data, details = null) => {
                                sendDataToParent("address", details?.geometry?.location)
                            }}
                            onFail={error => console.log(error)}
                            onNotFound={() => console.log('no results')}
                            requestUrl={{
                                url: serverPath,
                                useOnPlatform: 'all',
                                headers: { Authorization: userToken },

                            }}
                            query={{
                                key: "",
                                language: 'en',
                            }}
                            styles={{
                                textInputContainer: styles.googleInputContainer,
                                textInput: styles.googleTextInput,
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                },
                            }}
                        />
                    </View>

                    <Input
                        label="Daily Price rate"
                        labelStyle={styles.inputLabel}
                        leftIcon={<Entypo color="#000" name="price-tag" size={16} />}
                        placeholder=" Enter desired daily price"
                        keyboardType="phone-pad"
                        onChangeText={(text) => sendDataToParent("price", text)}
                        inputStyle={styles.inputControl}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />

                    <View style={styles.divider}>
                        <View style={styles.dividerInset} /></View>

                    <View>
                        <View>
                            <Text style={styles.sectionTitle}>Choose a range of available days </Text>
                        </View>
                    </View>

                    <View style={styles.dateView}>
                        <Text style={styles.datesLables}>  Start day : </Text>
                        <DateTimePickerExample minDate={new Date()} onDateChange={onStartDateChange} />
                    </View>
                    <Text> </Text>
                    <View style={styles.dateView}>
                        <Text style={styles.datesLables}>  End day : </Text>
                        <DateTimePickerExample minDate={startDate} onDateChange={onEndDateChange}
                            valueToDisplay={valueInInvalidInput} />
                    </View>

                    <Text> </Text>

                    <Input
                        label="Description"
                        labelStyle={styles.inputLabel}
                        placeholder=" Enter product description"
                        onChangeText={(text) => sendDataToParent("productDescription", text)}
                        inputStyle={styles.inputControl}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />
                    <ImagePicker
                            showRevert={imgSelected}
                            onImagePicked={pickImage}
                            onRevert={clearImgSelection}
                        />
                </View>

            </ScrollView>
        </SafeAreaView >


    );
}

export default FillPersonalDetails;