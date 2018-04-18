import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      region: {
        latitude: 42.3601,
        longitude: -71.0589,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }


  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <MapView style={styles.map}
          initialRegion={this.state.region}>
          <MapView.Marker
          coordinate={ this.state.region }
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
    flex: 1,
    height: 100,
    width: 1200
  }
});
