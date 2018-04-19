import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
var Vibration = require('react-native-vibration');
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      region: {
        latitude: 42.3601,
        longitude: -71.0589,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      marker: {
        latitude: 42.3601,
        longitude: -71.0589
      },
      user: {

      }
    };
  }

  componentDidMount() {

  }


  onRegionChange(region) {
    this.setState({ region });
  }

  onPress(event) {
    this.setState({marker: event.nativeEvent.coordinate});

      Vibration.vibrate(1000);
    getCurrentLocation().then((res) => {
      let difflat = res.coords.latitude - this.state.marker.latitude;
      if (Math.abs(difflat) <  0.0025) {
        console.log(difflat);
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.marker.latitude}
        </Text>
      <MapView style={styles.map}
        provider={'google'}
        showsUserLocation={true}
        initialRegion={this.state.region}
        onPress={ event => this.onPress(event) }
        >
        <MapView.Marker
        coordinate={ this.state.marker }
        />
      </MapView>
      </View>
    );
  }
}

function markerClick() {
  console.log('test?');
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: 740,
    width: 360
  }
});
