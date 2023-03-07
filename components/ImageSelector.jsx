import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'
import * as imagePicker from "expo-image-picker"

import {COLORS} from "../constants"

const imageSelector = props => {
  const [pickedUri, setPickedUri] = useState()

  const verifyPermissions = async () => {
    const {status} = await imagePicker.requestCameraPermissionsAsync()

    if (status !== "granted") {
        Alert.alert(
            "Permisos insuficientes",
            "Necesita dar permisos de la camara para usar la aplicacion",
            [{ text: "OK" }]
        )
        return false
    }
    return true
  }

  const handleTakeImage = async () => {
    const isCamaraOk = await verifyPermissions()
    if (!isCamaraOk) return

    const image = await imagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
    })

    setPickedUri(image.assets[0].uri)
    props.onImage(image.assets[0].uri)
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUri ? (
            <Text>No hay imagen seleccionada</Text>
        ) : (
            <Image style={styles.image} source={{uri: pickedUri}}></Image>
        )}
      </View>
      <Button 
        title='Tomar Foto'
        color={COLORS.LIGTH_PINK}
        onPress={handleTakeImage}
      />
    </View>
  )
}

export default imageSelector

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
    image: {
        width: "100%",
        height: "100%",
    },
})