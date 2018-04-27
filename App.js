import React, { Component } from 'react';
import { StyleSheet, Text, View, Vibration, PermissionsAndroid } from 'react-native';
import MapView, { Animated, Marker } from 'react-native-maps';
import Video from 'react-native-video';

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default class App extends React.Component {

  video: Video;

  async requestLocationPermission() {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission',
          'message': 'Cool Location App needs access to your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

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
      },
      user: {
        latitude: 200,
        longitude: 200
      },
      sound: {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
      }
    };
  }


  getCurrentLocation() {
     return new Promise((resolve, reject) => {
       navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
     });
   };

  componentDidMount() {
      this.requestLocationPermission();
      navigator.geolocation.watchPosition(event => this.onUserLocationChange(event));
  }


  onRegionChange(region) {
    this.setState({ region: region });
  }

  onUserLocationChange(event) {
    this.setState({user: event.coords});
    let diffLat = event.coords.latitude - this.state.marker.latitude;
    let diffLong =  event.coords.longitude - this.state.marker.longitude;
    if (Math.abs(diffLat) <  0.0025 && Math.abs(diffLong) <  0.0025) {
      console.log(diffLat);
      Vibration.vibrate(1000);
      this.setState({sound.paused: !this.state.sound.paused})
    };
  }

  onPress(event) {
    this.setState({marker: event.nativeEvent.coordinate});
  }

  render() {
    return (
      <View style={styles.container}>
      <MapView style={styles.map}
        provider={'google'}
        showsUserLocation={true}
        initialRegion={this.state.region}
        onPress={ event => this.onPress(event) }
        showsCompass={true}
        paused={this.state.video.paused}
        >
        <MapView.Marker
        coordinate={ this.state.marker }
        />
      </MapView>
      <Text>
        {this.state.user.latitude}
      </Text>
      <Video
        ref = {(ref: Video) => {this.video = ref}}

        >
      </Video>
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
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
   },
});
