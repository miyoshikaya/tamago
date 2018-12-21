import React, { Component } from 'react';
import './quizcard.css';
import quizQuestions from './api/quizQuestions.js';
import Quiz from './components/Quiz.js';
import Result from './components/Result.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class QuizCard extends Component {
  constructor(props) {
    super(props);

    if (firebase.apps.length) {
      this.app = firebase.app().firestore();
      this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/0/jpn-cards-animals");
    }


    this.state = {
      counter: 0,
      questionId: 1,
      questions: [],
      ansOpt: [],
      currentAnswers: [],
      currQuestion: 'Which word means lel in Japanese?',
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        correct: 0,
        incorrect: 0,
      },
      result: '',
      category: this.props.category,
      quizDone: false,
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }



  componentWillMount() {

    const questionList = this.state.questions;

    this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/0/jpn-cards-animals");
    this.database.on('child_added', snap => {
      questionList.push({
        id: snap.key,
        eng: snap.val().eng,
        kan: snap.val().kan,
        rom: snap.val().rom
      })
    })


    if (firebase.apps.length) {

      this.setState({
        questions: questionList,
      })
      this.shuffleArray(this.state.questions);

      // this.setState({
      //   questions: questionList,
      // })

      const optionList = this.state.ansOpt;

      console.log(questionList.length);
      for (var index = 0; index < questionList.length; ++index) {
        console.log(questionList.length);
        var randomIndex = Math.floor(Math.random() * questionList.length);

        var options = [];
        options.push({
          type: "incorrect",
          content: questionList[randomIndex].kan,
        })

        randomIndex = Math.floor(Math.random() * questionList.length);
        options.push({
          type: "incorrect",
          content: questionList[randomIndex].kan,
        })

        randomIndex = Math.floor(Math.random() * questionList.length);
        options.push({
          type: "incorrect",
          content: questionList[randomIndex].kan,
        })
        var rightIndex = Math.floor(Math.random() * questionList.length);
        options[rightIndex].type = "correct";
        options[rightIndex].content = questionList[index].kan;

        optionList.push({
          answers: options,
          rightAnswer: rightIndex,
        })
      }
      /*
      this.setState({

        ansOpt: optionList,
        currentAnswers: optionList[0].answers,
        currQuestion: 'Which word means lel in Japanese?',
      });
      */
    }
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: state.answersCount[answer] + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      currQuestion: 'Which word means ' + this.questionList[counter].eng + ' in Japanese?',
      currentAnswers: this.ansOpt[counter],
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    //tutaj zedytować tak, żeby dostać % poprawnych odpowiedzi
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: '50% correct. Score 70% an above to get stuff for your pet' });
    }
    this.setState({
      quizDone: true,
    })
    this.props.quizComplete(this.state.quizDone);
  }

  renderQuiz() {
    return (
      <div>
      {console.log(this.props.category)}
      <Quiz
        answer={this.state.answer}
        currentAnswers={this.state.currentAnswers}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        questions={this.state.questions}
        ansOpt={this.state.ansOpt}
        currQuestion={this.state.currQuestion}
      />
      </div>
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default QuizCard;