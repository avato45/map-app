import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import PlaceItem from '../components/PlaceItem'

const PlaceListScreen = ({ navigation }) => {
    const places = useSelector(state => state.places.places)

    const renderItem = ({item}) => (
        <PlaceItem 
        title={item.title}
        image={item.image}
        address="callefalsa 123"
        onSelect={() => navigation.navigate("Detalle")}
        />
    )
    return (
        <FlatList 
            data={places}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
