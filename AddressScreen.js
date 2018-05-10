import React, { Component } from 'react';
import { StyleSheet, Text, View, Vibration, PermissionsAndroid, Button, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class AddressScreen extends React.Component {
    static navigationOptions = {
        title: 'Find Your Location',
      };
    render() {
    return (
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed={true}
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(details.geometry);
            this.props.navigation.state.params.setMarkerLocation(details.geometry.location.lat, details.geometry.location.lng);
            this.props.navigation.goBack();

          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyA9vmylTlBXWBpNeiRdLUKt_75LnjakXMQ',
            language: 'en', // language of the results
          }}
          styles={{
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch


          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderRightButton={() => <Text>Go Here!</Text>}
        />
      );
    }
}