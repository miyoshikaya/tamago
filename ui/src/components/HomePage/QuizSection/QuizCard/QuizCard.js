import React, { Component } from 'react';
import './quizcard.css';
import Quiz from './../components/Quiz.js';
import Result from './../components/Result.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { db } from '../../../../firebase';
//import { default as fire } from '../../../../firebase';

class QuizCard extends Component {
  constructor(props) {
    super(props);


    if (firebase.apps.length) {

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

        foodItems: 0,
        playItems: 0,
        washItems: 0,
        musicItems: 0,

        user: null,
        languageIndex: null,
        addedString: null,
      };

      this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
      this.loadDatabase = this.loadDatabase.bind(this);
      this.quizUndone = this.quizUndone.bind(this);
    }
  }

  async getUserData() {
    var user = db.onceGetUser(this.props.uid).then(snapshot => snapshot.val());
    await user.then((value) => {
      this.setState({
        user: value
      })
    });
  }

  async truncCards(cards) {
    var comparedCards = [];
    var userDBCards = db.getUserCards(this.props.uid).then(snapshot => snapshot.val());
    console.log(this.props.uid);
    await userDBCards.then((value) => {
      comparedCards = value;
    });

    var queryString = "";

    switch (this.state.user.language) {
      case 'Korean':
        queryString = "0_";
        break;
      case 'Japanese':
        queryString = "1_";
        break;
      case 'Polish':
        queryString = "2_";
        break;
      default:
        break;
    }

    switch (this.props.category) {
      case 'Animals':
        console.log(this.props.category);
        queryString += "0_";
        break;
      case 'People':
        console.log(this.props.category);
        queryString += "1_";
        break;
      case 'Food':
        console.log(this.props.category);
        queryString += "2_";
        break;
      case 'School':
        console.log(this.props.category);
        queryString += "3_";
        break;
      case 'House':
        console.log(this.props.category);
        queryString += "4_";
        break;
      default:
        console.log("null");
        break;
    }

    var newList = [];
    console.log(queryString);
    console.log(cards);
    console.log(comparedCards);
    for (var i = 0; i < cards.length; ++i) {
      for (var j = 0; j < comparedCards.length; ++j) {
        if (comparedCards[j].id === (queryString + i) && comparedCards[j].status !== 'Mastered') {
          newList.push(cards[i]);
        }
      }
    }
    return newList;
  }


  async loadDatabase() {

    //console.log(this.props.generateNew);
    if (this.props.generateNew === true) {

      await this.props.generatedQuiz();

      await this.setState({
        counter: 0,
        questionId: 1,
        ansOpt: [],
        questions: [],
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

      console.log("lel");

      var addedString = "";
      var languageIndex = 0;
      switch (this.state.user.language) {
        case 'Korean':
          languageIndex = 0;
          addedString = "krn-cards";
          break;
        case 'Japanese':
          languageIndex = 1;
          addedString = "jpn-cards";
          break;
        case 'Polish':
          languageIndex = 2;
          addedString = "pln-cards";
          break;
        default:
          break;
      }
      await this.setState({
        languageIndex: languageIndex,
        addedString: addedString,
      });

      var categoryIndex = 0;
      var categoryString = null;
      switch (this.props.category) {
        case 'Animals':
          console.log(this.props.category);
          categoryIndex = 0;
          categoryString = addedString + "-animals";
          break;
        case 'People':
          console.log(this.props.category);
          categoryIndex = 1;
          categoryString = addedString + "-people";
          break;
        case 'Food':
          console.log(this.props.category);
          categoryIndex = 2;
          categoryString = addedString + "-food";
          break;
        case 'School':
          console.log(this.props.category);
          categoryIndex = 3;
          categoryString = addedString + "-school";
          break;
        case 'House':
          console.log(this.props.category);
          categoryIndex = 4;
          categoryString = addedString + "-house";
          break;
        default:
          console.log("null");
          break;
      }
      var allCards = null;


      var data = db.getCards(languageIndex, addedString, categoryIndex, categoryString).then(snapshot => snapshot.val());
      await data.then((value) => {
        allCards = value;
      });

      console.log(allCards);
      var userCards = await this.truncCards(allCards);
      await this.shuffleArray(userCards);
      await this.setState({
        questions: userCards,

      })
      console.log(userCards);

      await this.fillQuestions();

    }
  }

  async fillQuestions() {

    const questionList = this.state.questions;
    const optionList = [];
    if (questionList.length > 2) {

      for (var index = 0; index < questionList.length; ++index) {

        var firstIndex = Math.floor(Math.random() * questionList.length);

        while (firstIndex === index) {
          firstIndex = Math.floor(Math.random() * questionList.length);
        }
        const options = [];
        options.push({
          type: "incorrect",
          content: (questionList[firstIndex].kan !== '') ? questionList[firstIndex].kan : questionList[firstIndex].rom,
        })

        var secondIndex = Math.floor(Math.random() * questionList.length);

        while (secondIndex === index || secondIndex === firstIndex) {
          secondIndex = Math.floor(Math.random() * questionList.length);
        }
        options.push({
          type: "incorrect",
          content: (questionList[secondIndex].kan !== '') ? questionList[secondIndex].kan : questionList[secondIndex].rom,
        })

        var thirdIndex = Math.floor(Math.random() * questionList.length);

        while (thirdIndex === index || thirdIndex === firstIndex || thirdIndex === secondIndex) {
          thirdIndex = Math.floor(Math.random() * questionList.length);
        }
        options.push({
          type: "incorrect",
          content: (questionList[thirdIndex].kan !== '') ? questionList[thirdIndex].kan : questionList[thirdIndex].rom,
        })

        var rightIndex = Math.floor(Math.random() * options.length);
        //console.log(rightIndex);
        options[rightIndex].type = "correct";
        options[rightIndex].content = (questionList[index].kan !== '') ? questionList[index].kan : questionList[index].rom;

        optionList.push({
          answers: options,
          rightAnswer: rightIndex,
        })
      }
      if (questionList.length > 0) {
        this.setState({

          ansOpt: optionList,
          currentAnswers: optionList[0].answers,
          currQuestion: 'Which word means ' + this.state.questions[0].eng + ' in ' + this.state.user.language + ' ? ',

        });
      }
    }
  }

  componentWillMount() {
    this.getUserData();
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
    console.log(answer);
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
      currQuestion: 'Which word means ' + this.state.questions[counter].eng + ' in ' + this.state.user.language + '?',
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
      resultString = resultString + '. Score 70% an above to receive items for your pet.';
    }
    else {
      //losowanie itemków
      const min = 1;
      const max = 4;
      const itemType = Math.floor(min + Math.random() * (max - min));

      switch (itemType) {
        case 1:
          if (resultPercentage > 0.49 && resultPercentage < 0.71) {
            resultString = resultString + '! You receive 1 ⚾!';
            this.setState({
              playItems: 1,
            });
          }
          if (resultPercentage > 0.7 && resultPercentage < 0.91) {
            resultString = resultString + '! You receive 2 ⚾!';
            this.setState({
              playItems: 2,
            });
          }
          if (resultPercentage > 0.9) {
            resultString = resultString + '! You receive 3 ⚾!';
            this.setState({
              playItems: 3,
            });

          }
          db.setItem(this.props.uid, 0, 'play', this.state.user.pet_items[0].number + this.state.playItems);
          break;
        case 2:
          if (resultPercentage > 0.49 && resultPercentage < 0.71) {
            resultString = resultString + '! You receive 1 🍌!';
            this.setState({
              foodItems: 1,
            });
          }
          if (resultPercentage > 0.7 && resultPercentage < 0.91) {
            resultString = resultString + '! You receive 2 🍌!';
            this.setState({
              foodItems: 2,
            });
          }
          if (resultPercentage > 0.9) {
            resultString = resultString + '! You receive 3 🍌!';
            this.setState({
              foodItems: 3,
            });
          }
          db.setItem(this.props.uid, 1, 'food', this.state.user.pet_items[1].number + this.state.foodItems);
          break;
        case 3:
          if (resultPercentage > 0.49 && resultPercentage < 0.71) {
            resultString = resultString + '! You receive 1 💦!';
            this.setState({
              washItems: 1,
            });
          }
          if (resultPercentage > 0.7 && resultPercentage < 0.91) {
            resultString = resultString + '! You receive 2 💦!';
            this.setState({
              washItems: 2,
            });
          }
          if (resultPercentage > 0.9) {
            resultString = resultString + '! You receive 3 💦!';
            this.setState({
              washItems: 3,
            });
          }
          db.setItem(this.props.uid, 2, 'wash', this.state.user.pet_items[2].number + this.state.washItems);
          break;
        case 4:
          if (resultPercentage > 0.49 && resultPercentage < 0.71) {
            resultString = resultString + '! You receive 1 🎹!';
            this.setState({
              musicItems: 1,
            });
          }
          if (resultPercentage > 0.7 && resultPercentage < 0.91) {
            resultString = resultString + '! You receive 2 🎹!';
            this.setState({
              musicItems: 2,
            });
          }
          if (resultPercentage > 0.9) {
            resultString = resultString + '! You receive 3 🎹!';
            this.setState({
              musicItems: 3,
            });
          }
          db.setItem(this.props.uid, 3, 'music', this.state.user.pet_items[3].number + this.state.musicItems);
          break;
        default:
          break;
      }
    }
    console.log(
      'play items: ' + this.state.playItems + ',' +
      'food items: ' + this.state.foodItems + ',' +
      'wash items: ' + this.state.washItems + ',' +
      'music items: ' + this.state.musicItems + '.'
    );

    //tutaj dodanie do aktualnej liczby itemków do bazy danych
    //
    //

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

    this.props.quizComplete(this.state.quizDone);
    this.loadDatabase();
  }

  renderQuiz() {
    if (this.state.user !== null) {
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
            generateNew={this.props.generateNew}
          />
        </div >
      );
    }
    else {
      return null;
    }
  }

  renderResult() {
    return <Result quizResult={this.state.result}
      generateNew={this.props.generateNew}
      quizUndone={this.quizUndone} />;
  }

  render() {
    return (
      <div>
        {this.state.quizDone ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default QuizCard;