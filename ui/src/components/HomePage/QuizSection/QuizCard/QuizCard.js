import React, { Component } from 'react';
import './quizcard.css';
import Quiz from './../components/Quiz.js';
import Result from './../components/Result.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class QuizCard extends Component {
  constructor(props) {
    super(props);


    if (firebase.apps.length) {

      this.app = firebase.app().firestore();

      this.state = {
        counter: 0,
        questionId: 1,
        questions: [],
        ansOpt: [],
        currentAnswers: [],
        currQuestion: '',
        question: '',
        questionTotal: 10,
        answerOptions: [],
        answer: '',
        answersCount: {
          correct: 0,
          incorrect: 0,
        },
        result: '',
        category: '',
        quizDone: false,
        firstSetup: true,
      };

      this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
      this.loadDatabase = this.loadDatabase.bind(this);
      this.quizUndone = this.quizUndone.bind(this);
    }
  }

  async loadDatabase() {

    if (this.state.firstSetup === true) {

      await this.setState({
        firstSetup: false
      })
      this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/0/jpn-cards-animals");
      const questionList = [];

      this.props.generatedQuiz();
      await this.database.on('child_added', snap => {
        questionList.push({
          id: snap.key,
          eng: snap.val().eng,
          kan: snap.val().kan,
          rom: snap.val().rom
        })
      })
      console.log(questionList.length);
      this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/1/jpn-cards-people");

      this.props.generatedQuiz();
      await this.database.on('child_added', snap => {
        questionList.push({
          id: snap.key,
          eng: snap.val().eng,
          kan: snap.val().kan,
          rom: snap.val().rom
        })
      })
      console.log(questionList.length);
      this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/2/jpn-cards-food");

      this.props.generatedQuiz();
      await this.database.on('child_added', snap => {
        questionList.push({
          id: snap.key,
          eng: snap.val().eng,
          kan: snap.val().kan,
          rom: snap.val().rom
        })
      })
      console.log(questionList.length);


    }
    else {

      console.log(this.props.generateNew);
      if (this.props.generateNew === true) {
        this.app = firebase.app().firestore();

        switch (this.props.category) {
          case 'Animals':

            console.log(this.props.category);
            this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/0/jpn-cards-animals");
            break;
          case 'People':

            console.log(this.props.category);
            this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/1/jpn-cards-people");
            break;
          case 'Food':

            console.log(this.props.category);
            this.database = firebase.app().database().ref().child("flashcards/1/jpn-cards/2/jpn-cards-food");
            break;
          default:
            break;
        }
        const questionList = [];

        this.setState({
          counter: 0,
          questionId: 1,
          questions: [],
          ansOpt: [],
          currentAnswers: [],
          currQuestion: '',
          question: '',
          questionTotal: 10,
          answerOptions: [],
          answer: '',
          answersCount: {
            correct: 0,
            incorrect: 0,
          },
          result: '',
          category: '',
          quizDone: false,

        })
        this.props.generatedQuiz();
        await this.database.on('child_added', snap => {
          questionList.push({
            id: snap.key,
            eng: snap.val().eng,
            kan: snap.val().kan,
            rom: snap.val().rom
          })
        })
        console.log(questionList.length);
        if (questionList.length > 0) {

          this.shuffleArray(questionList);
          console.log(questionList[0].eng);
          this.setState({
            questions: questionList,

          })
        }
        this.fillQuestions();
      }
    }
  }

  fillQuestions() {

    if (firebase.apps.length) {

      const questionList = this.state.questions;
      const optionList = [];

      for (var index = 0; index < questionList.length; ++index) {

        var firstIndex = Math.floor(Math.random() * questionList.length);

        while (firstIndex === index) {
          firstIndex = Math.floor(Math.random() * questionList.length);
        }
        const options = [];
        options.push({
          type: "incorrect",
          content: questionList[firstIndex].kan,
        })

        var secondIndex = Math.floor(Math.random() * questionList.length);

        while (secondIndex === index || secondIndex === firstIndex) {
          secondIndex = Math.floor(Math.random() * questionList.length);
        }
        options.push({
          type: "incorrect",
          content: questionList[secondIndex].kan,
        })

        var thirdIndex = Math.floor(Math.random() * questionList.length);

        while (thirdIndex === index || thirdIndex === firstIndex || thirdIndex === secondIndex) {
          thirdIndex = Math.floor(Math.random() * questionList.length);
        }
        options.push({
          type: "incorrect",
          content: questionList[thirdIndex].kan,
        })

        var rightIndex = Math.floor(Math.random() * options.length);
        //console.log(rightIndex);
        options[rightIndex].type = "correct";
        options[rightIndex].content = questionList[index].kan;

        optionList.push({
          answers: options,
          rightAnswer: rightIndex,
        })
      }
      if (questionList.length > 0) {
        this.setState({

          ansOpt: optionList,
          currentAnswers: optionList[0].answers,
          currQuestion: 'Which word means ' + this.state.questions[0].eng + ' in Japanese ? ',

        });
      }
    }
  }

  componentWillMount() {


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

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: state.answersCount[answer] + 1
      },
      answer: answer
    }));
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < this.state.questionTotal) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }


  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      currQuestion: 'Which word means ' + this.state.questions[counter].eng + ' in Japanese?',
      currentAnswers: this.state.ansOpt[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const questionsTotal = this.state.questionTotal;
    var resultPercentage = answersCount.correct / questionsTotal;
    var resultString = resultPercentage * 100.0 + '%';

    if (resultPercentage * 100.0 < 50) {
      resultString = resultString + '. Score 70% an above to get stuff for your pet.';
    }
    return resultString;
  }

  quizUndone() {
    this.setState({
      quizDone: false,
    });
  }

  setResults(result) {
    this.setState({
      result: result,
      quizDone: true,
    });
    console.log('quiz completion: ' + this.state.quizDone);

    this.props.quizComplete(this.state.quizDone);
    this.loadDatabase();
  }

  renderQuiz() {
    return (
      <div>
        <Quiz
          answer={this.state.answer}
          currentAnswers={this.state.currentAnswers}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={this.state.questionTotal}
          onAnswerSelected={this.handleAnswerSelected}
          loadDatabase={this.loadDatabase}
          questions={this.state.questions}
          ansOpt={this.state.ansOpt}
          currQuestion={this.state.currQuestion}
          getQuestion={this.getQuestion}
          generateNew={this.props.generateNew}
        />
      </div >
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result}
      generateNew={this.props.generateNew}
      quizUndone={this.quizUndone} />;
  }

  startNewQuiz() {
    //(re-)starting new quiz
  }

  render() {
    return (
      <div>
        {this.state.quizDone ? this.renderResult() : this.renderQuiz()}
      </div >
    );
  }
}

export default QuizCard;