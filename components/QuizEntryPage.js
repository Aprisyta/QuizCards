import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { black, white, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class QuizEntryPage extends Component {

  static navigationOptions = ({ navigation}) => {
    const { title } = navigation.state.params.entryId
    return {
      title,
    }
  }

  startQuiz = () => {
    clearLocalNotification().then(setLocalNotification)
    this.props.navigation.navigate(
      'Card',
      {entryId: title}
    )
  }

  render () {
    const { title } = this.props.navigation.state.params.entryId
    const { decks } = this.props
    const { numOfQuestions } = decks[title]
    // const { key } = this.props.navigation.state
    // console.log(key);
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={{fontSize: 30}}>{title}</Text>
          <Text style={{fontSize: 20, color: gray}}>{numOfQuestions} card</Text>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={[styles.button, styles.addCardButton]}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              {
                entryId: title,
              }
            )}
          >
            <Text style={{fontSize: 20}}>Add Card</Text>
          </TouchableOpacity>
          {
            numOfQuestions > 0
              ? <TouchableOpacity
                style={[styles.button, {backgroundColor: black}]}
                onPress={this.startQuiz}
              >
                <Text style={{color: white, fontSize: 20}}>Start Quiz</Text>
              </TouchableOpacity>
            : null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 3,
    margin: 10,
  },
  addCardButton: {
    borderColor: black,
    borderWidth: 2,
  }
})

function mapStateToProps ( decks ) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(QuizEntryPage)
