import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { purple, white, red, green, pink, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class Card extends Component {

  state = {
    isQuestion: true,
    questionCounter: 0,
    score: 0,
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener( ({value}) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard = () => {
    if(this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 800,
      }).start()
    }
    else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 800,
      }).start()
    }

    this.setState((prevState) => ({
      isQuestion: !prevState.isQuestion,
    }))
  }

  buttonClicked = (numOfQuestions, isCorrect, title) => {
    const { score } = this.state
    this.setState((prevState) => ({
      questionCounter: prevState.questionCounter + 1,
      score: isCorrect ? prevState.score + 10 : prevState.score,
    }))
  }

  restartQuiz = () => {
    this.setState({
      isQuestion: true,
      questionCounter: 0,
      score: 0,
    })
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'QuizEntryPage'}))
    console.log(NavigationActions.back());
  }

  render () {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    const title = this.props.navigation.state.params.entryId
    // const { key } =  this.props.navigation.state.params
    // console.log(this.props.navigation.state.params);
    const { isQuestion, questionCounter, score } = this.state
    const { decks } = this.props
    const { questions, numOfQuestions } = decks[title]
    if ( questionCounter === numOfQuestions ) {
      return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text style={{fontSize: 40, textAlign: 'center'}}>Your score is</Text>
          <Text style={{fontSize: 50, textAlign: 'center', color: gray}}>
            {score} out of { numOfQuestions * 10 }
          </Text>
          <TouchableOpacity
            onPress={this.restartQuiz}
            style={[styles.btn, {backgroundColor: purple, padding: 30}]}
          >
            <Text style={styles.btnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: pink, padding: 25}]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.btnText}>Back to decks</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.cardIndex}>{`${questionCounter + 1}/${numOfQuestions}`}</Text>
        <View style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.flipCard,
              frontAnimatedStyle,
              {opacity: this.frontOpacity}
            ]}
          >
            <Text style={styles.cardText}>{`${questions[questionCounter].question}`}</Text>
          </Animated.View>
          <Animated.View
            style={[
              backAnimatedStyle,
              styles.flipCard,
              styles.flipCardBack,
              {opacity: this.backOpacity}
            ]}
          >
            <Text style={styles.cardText}>{`${questions[questionCounter].answer}`}</Text>
          </Animated.View>
        </View>
        <TouchableOpacity
          onPress={() => this.flipCard()}
        >
          <Text style={[styles.cardControlText, {marginBottom: 10}]}>
            {isQuestion ? `Answer` : `Question`}
          </Text>
        </TouchableOpacity>
        <View style={{width: 250, flex: 1}}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: green}]}
            onPress={() => this.buttonClicked(numOfQuestions, true, title)}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: red}]}
            onPress={() => this.buttonClicked(numOfQuestions, false, title)}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardIndex: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  cardContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  flipCard: {
    height: 400,
    width: 300,
    backgroundColor: purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardBack: {
    backgroundColor: pink,
    position: 'absolute',
  },
  cardText: {
    textAlign: 'center',
    color: white,
    fontSize: 30,
  },
  cardControlText: {
    color: red,
    fontSize: 20,
  },
  btn: {
    margin: 10,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
  },
  btnText: {
    fontSize: 25,
    color: white,
  },
})

function mapStateToProps ( decks ) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Card)
