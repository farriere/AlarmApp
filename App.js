import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Animated, Marker } from 'react-native-maps';

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
          <MapView.Animated style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      </View>
    );
  }
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
