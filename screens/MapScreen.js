import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from "react-native-maps"

const MapScreen = () => {
    const initialRegion = {
        latitude: 37.4219023,
        longitude: -122.0839984,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    return (
        <MapView 
        initialRegion={initialRegion}
        style={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MapScreen
