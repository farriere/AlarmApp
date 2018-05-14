import React, { Component } from 'react';
import { StyleSheet, Text, View, Vibration, PermissionsAndroid, TouchableOpacity } from 'react-native';
import MapView, { Animated, Marker } from 'react-native-maps';
import Video from 'react-native-video';

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default class MapScreen extends React.Component {
  static navigationOptions = {
          title: 'Alarm',
        };
  video: Video;

  async requestLocationPermission() {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission',
          'message': 'Location Alarm needs access to your location (who\'da thunk it?)'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("Location permission denied")
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
      this.video.seek(0);
      this.setState({sound: {paused: !this.state.sound.paused}});
    };
  }

  onPress(event) {
    this.setState({marker: event.nativeEvent.coordinate});
  }

  setMarkerLocation(latitude, longitude) {
    this.setState({marker: {latitude: latitude, longitude: longitude}});
  }


  render() {
    const {navigation} = this.props;
    return (

      <View style={styles.container}>


          <MapView style={styles.map}
            provider={'google'}
            showsUserLocation={true}
            initialRegion={this.state.region}
            onPress={ event => this.onPress(event) }
            showsCompass={true}
            >
            <MapView.Marker
            coordinate={this.state.marker}
            />

          </MapView>
            <TouchableOpacity style={styles.overlay} onPress={() => this.props.navigation.navigate('AddressScreen', {setMarkerLocation: this.setMarkerLocation.bind(this)})}>
                            <Text style={styles.buttonText}>YA LOST DUMBASS?</Text>
                        </TouchableOpacity>

          <Video
            source={require('./assets/sounds/Roland-JV-2080-Pick-Bass-C2.wav')}
            ref = {(ref) => {this.video = ref}}
            paused={this.state.sound.paused}
            volume={this.state.sound.volume}
            muted={this.state.sound.muted}
            repeat={true}
            >
          </Video>
      </View>
     );
   }
}




const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%'
  },
  textInput: {
    position:'absolute',
    borderWidth: 10
   },
  backgroundVideo: {
      height: 0,
      width: 0
   },
   overlay: {
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    padding: 10,
    backgroundColor: 'rgba(237,45,255,.5)',
    borderRadius: 10,
    borderWidth: 1
   },
   buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic'
   }
});