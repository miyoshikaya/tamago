import React, { Component } from 'react';
import './cardscontainer.css';
import FlashCard from './FlashCard/FlashCard.js';
import DrawButton from './DrawButton/DrawButton.js';
import FlipButton from './FlipButton/FlipButton.js';
//import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
//import { default as fire } from '../../../../firebase';
import { db } from '../../../../firebase';



class CardsContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: null,
      currentCard: null,
      category: null,
      currentSide: 'front',
      user: null,
      languageIndex: null,
      addedString: null,
      categoryIndex: null,
      categoryString: null,
      cardString: null,
      foundIndex: null,
    }

    this.updateCard = this.updateCard.bind(this);
    this.turnCard = this.turnCard.bind(this);
  }

  async setCardData(Cards) {


    var card = await this.getRandomCard(Cards);
    await this.setState({
      currentCard: card,
    })
  }

  async getUserData() {
    var user = db.onceGetUser(this.props.uid).then(snapshot => snapshot.val());
    await user.then((value) => {
      this.setState({
        user: value
      })
    });
    console.log(this.state.user);
    if (this.state.cards === null) {
      await this.setData();
    }
  }


  async setData() {
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
    switch (this.props.cardsCategory) {
      case 'Animals':
        console.log(this.props.cardsCategory);
        categoryIndex = 0;
        categoryString = addedString + "-animals";
        break;
      case 'People':
        console.log(this.props.cardsCategory);
        categoryIndex = 1;
        categoryString = addedString + "-people";
        break;
      case 'Food':
        console.log(this.props.cardsCategory);
        categoryIndex = 2;
        categoryString = addedString + "-food";
        break;
      case 'School':
        console.log(this.props.cardsCategory);
        categoryIndex = 3;
        categoryString = addedString + "-school";
        break;
      case 'House':
        console.log(this.props.cardsCategory);
        categoryIndex = 4;
        categoryString = addedString + "-house";
        break;
      default:
        console.log("null");
        break;
    }

    await this.setState({
      categoryIndex: categoryIndex,
      categoryString: categoryString,
    });

    var currentCards = null;

    var data = db.getCards(languageIndex, addedString, categoryIndex, categoryString).then(snapshot => snapshot.val());
    await data.then((value) => {
      currentCards = value;
    });

    console.log(currentCards);
    await this.setState({
      cards: currentCards,
      category: this.props.cardsCategory,
      currentCard: await this.getRandomCard(currentCards)
    });
    await this.props.sendLanguage(this.state.user.language);

  }

  componentDidMount() {
    this.getUserData();

  }

  async findCard(index) {
    var queryString = null;
    switch (this.state.user.language) {
      case 'Korean':
        queryString = "0";
        break;
      case 'Japanese':
        queryString = "1";
        break;
      case 'Polish':
        queryString = "2";
        break;
      default:
        break;
    }
    switch (this.props.cardsCategory) {
      case 'Animals':
        console.log(this.props.cardsCategory);
        queryString += "_0";

        break;
      case 'People':
        console.log(this.props.cardsCategory);

        queryString += "_1";

        break;
      case 'Food':
        console.log(this.props.cardsCategory);
        queryString += "_2";
        break;
      case 'School':
        console.log(this.props.cardsCategory);
        queryString += "_3";
        break;
      case 'House':
        console.log(this.props.cardsCategory);
        queryString += "_4";
        break;
      default:
        break;
    }
    queryString += "_" + index;
    var found = false;
    var foundIndex = null;

    for (var i = 0; i < this.state.user.flashcards.length; ++i) {
      if (this.state.user.flashcards[i].id === queryString) {
        found = true;
        foundIndex = i;
      }
    }
    if (found) {
      await this.setState({
        foundIndex: foundIndex
      })
      await this.props.setCard(queryString, foundIndex);
      await this.props.setStatus(this.state.user.flashcards[foundIndex].status);
    }
    else {
      foundIndex = this.state.user.flashcards.length;
      var user = db.onceGetUser(this.props.uid).then(snapshot => snapshot.val());
      await user.then((value) => {
        this.setState({
          user: value
        })
      });
      var newCards = this.state.user.flashcards;
      newCards.push({
        "id": queryString,
        "status": "Learning",
      })
      db.setCards(this.props.uid, newCards);
      await this.setState({
        foundIndex: foundIndex
      })
      await this.props.setCard(queryString, foundIndex);
      await this.props.setStatus('Learning');
    }
  }

  async getRandomCard(currentCards) {

    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];

    while (card === this.state.currentCard) {
      randomIndex = Math.floor(Math.random() * currentCards.length);
      card = currentCards[randomIndex];
    }

    this.findCard(randomIndex);

    console.log(card);
    return (card);
  }

  async updateCard() {
    var currentCards = this.state.cards;
    var newCards = [];
    if (this.state.category === this.props.category) {
      var card = await this.getRandomCard(currentCards);
      await this.setState({
        cards: currentCards,
      })
    }
    else {

      var categoryIndex = 0;
      var categoryString = null;
      switch (this.props.cardsCategory) {
        case 'Animals':
          console.log(this.props.cardsCategory);
          categoryIndex = 0;
          categoryString = this.state.addedString + "-animals";
          break;
        case 'People':
          console.log(this.props.cardsCategory);
          categoryIndex = 1;
          categoryString = this.state.addedString + "-people";
          break;
        case 'Food':
          console.log(this.props.cardsCategory);
          categoryIndex = 2;
          categoryString = this.state.addedString + "-food";
          break;
        case 'School':
          console.log(this.props.cardsCategory);
          categoryIndex = 3;
          categoryString = this.state.addedString + "-school";
          break;
        case 'House':
          console.log(this.props.cardsCategory);
          categoryIndex = 4;
          categoryString = this.state.addedString + "-house";
          break;
        default:
          console.log("null");
          break;
      }

      await this.setState({
        categoryIndex: categoryIndex,
        categoryString: categoryString,
      });

      var data = db.getCards(this.state.languageIndex, this.state.addedString, categoryIndex, categoryString).then(snapshot => snapshot.val());
      await data.then((value) => {
        newCards = value;
      });

      card = await this.getRandomCard(newCards);

      await this.setState({
        cards: newCards,
        category: this.props.cardsCategory,
        currentCard: card,
      });
    }
    console.log(this.state.currentSide);
  }

  async turnCard() {
    if (this.state.currentSide === 'front') {
      await this.setState({
        currentSide: 'back',
      });
    }
    else {
      await this.setState({
        currentSide: 'front',
      });
    }
    console.log(this.state.currentSide);
  }

  render() {
    if (this.state.currentCard !== null) {
      return (
        <div className="card-container">
          <div className="cardCol">
            <div className="cardRow">
              <FlashCard eng={this.state.currentCard.eng}
                kan={this.state.currentCard.kan}
                rom={this.state.currentCard.rom}
                side={this.state.currentSide} />
            </div>
            <div className="buttonRow">
              <DrawButton drawCard={this.updateCard} />
              <FlipButton flipCard={this.turnCard} />
            </div>
          </div>
        </div>

      );
    }
    else {
      return null;
    }
  }

}

export default CardsContainer;