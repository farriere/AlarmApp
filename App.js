import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import AddressScreen from './AddressScreen';
import MapScreen from './MapScreen';

const RootStack = StackNavigator(
    {
        Home: {
            screen: MapScreen
        },
        AddressScreen: {
            screen: AddressScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
 );


export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
 }


