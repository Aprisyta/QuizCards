# QuizCards Project

QuizCards is a mobile flashcard app for android devices. The user can create decks of quiz, add questions to each deck and play with them. The app is a wonderful way to learn and revise lessons.

## Installation

To launch this project on your machine:

* clone this repository using `git clone https://github.com/Aprisyta/MyReads.git`
* install all project dependencies with `npm install`
* install following packages: react-navigation, react-redux, redux
* start the development server with `yarn start`

## Project Structure
App.js is the root file containing StackNavigator and TabNavigator. DeckList.js and AddDeck.js are the two tabs. You'll be able to see DeckList.js as the app loads. DeckList.js further contains DechHeader.js which forms the list. On clicking DeckHeader.js you will be directed to QuizEntryPage.js. Here, you can add cards to quiz using AddCard.js or play quiz using Card.js.

##License
QuizCards is a project built under Udacity's React Nanodegree. Any suggestion or modifiction in code to be done after request. QuizCards has been bootstrapped using Create React Native App.
