import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { black, gray } from '../utils/colors'

export const DeckHeader = ( props ) => {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>{`${props.title}`}</Text>
        <Text style={{fontSize: 15, color: gray}}>{`${props.numOfQuestions}`} cards</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: black,
    borderWidth: 1,
  },
})
