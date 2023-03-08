import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import * as Location from 'expo-location'

import {COLORS} from '../constants'
import MapPreview from './MapPreview'

const LocationSelector = (props) => {
  const [pickedLocation, setPickedLocation] = useState()

  const verifyPermissions = async () => {
    const { status } =await Location.requestForegroundPermissionsAsync()

    if (status !== "granted") {
        Alert.alert(
            "Permisos insuficientes",
            "Necesita dar permisos de la ubicacion para usar la aplicacion",
            [{ text: "ok" }]
        )
        return false
    }
    return true
  }

  const handeGetLocation = async () => {
    const isLocationOk = await verifyPermissions()
    if (!isLocationOk) return

    const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
    })

    setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
    })
    props.onLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
    })
  }

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text>Ubicacion en proceso...</Text>
      </MapPreview>
      <Button 
        title='Obtener ubicacion'
        color={COLORS.PEACH_PUFF}
        onPress={handeGetLocation}
      />
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    preview:{
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: "center",
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
    },
})