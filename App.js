import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Animated, Marker } from 'react-native-maps';

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      region: {
        latitude: 42.3601,
        longitude: -71.0589,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      marker: {
        latitude: 42.3601,
        longitude: -71.0589
      }
    };
  }

  getCurrentLocation() {
     return new Promise((resolve, reject) => {
       navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
     });
   };

  componentDidMount() {

  }


  onRegionChange(region) {
    this.setState({ region });
  }

  onPress(event) {
    this.setState({marker: event.nativeEvent.coordinate});
    this.getCurrentLocation().then((res) => {
      let difflat = res.coords.latitude - this.state.marker.latitude;
      if (Math.abs(difflat) <  0.0025) {
        console.log(difflat);
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%'
  }
});
