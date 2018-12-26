import React, { Component } from 'react';
import './cardscontainer.css';
import FlashCard from './FlashCard/FlashCard.js';
import DrawButton from './DrawButton/DrawButton.js';
import FlipButton from './FlipButton/FlipButton.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { default as fire } from '../../../../firebase';
import { db } from '../../../../firebase';



class CardsContainer extends Component {

  constructor(props) {
    super(props);




    this.state = {
      cards: [],
      currentCard: {},
      category: '',
      currentSide: 'front',
      user: null,
      databaseString: null,
      addedString: null,
      cardString: null
    }

    this.turnCard = this.turnCard.bind(this);
  }

  async getUserData() {
    var user = db.onceGetUser(this.props.uid).then(snapshot => snapshot.val());
    await user.then((value) => {
      this.setState({
        user: value
      })
    });
    console.log(this.props.uid);
    console.log(this.state.user);
    this.setData();
  }

  async setData() {
    if (firebase.apps.length) {
      var databaseString = "db/0/flashcards";
      var addedString = "";
      switch (this.state.user.language) {
        case 'Korean':
          databaseString += "/0/krn-cards";
          addedString = "krn-cards";
          break;
        case 'Japanese':
          databaseString += "/1/jpn-cards";
          addedString = "jpn-cards";
          break;
        case 'Polish':
          databaseString += "/2/pln-cards";
          addedString = "pln-cards";
          break;
      }

      await this.setState({
        databaseString: databaseString,
        addedString: addedString,
      })

      var cardString = null;
      this.app = firebase.app().firestore();
      switch (this.props.cardsCategory) {
        case 'Animals':
          console.log(this.props.cardsCategory);
          cardString = "/0/" + addedString + "-animals";
          break;
        case 'People':
          console.log(this.props.cardsCategory);
          cardString = "/1/" + addedString + "-people";
          break;
        case 'Food':
          console.log(this.props.cardsCategory);
          cardString = "/2/" + addedString + "-food";
          break;
        case 'School':
          console.log(this.props.cardsCategory);
          cardString = "/3/" + addedString + "-school";
          break;
        case 'House':
          console.log(this.props.cardsCategory);
          cardString = "/4/" + addedString + "-house";
          break;
        default:
          console.log("null");
          break;
      }
      await this.setState({
        cardString: cardString,
      })

      this.database = firebase.app().database().ref().child(databaseString + cardString);
      this.updateCard = this.updateCard.bind(this);
      const currentCards = this.state.cards;
      if (firebase.apps.length) {
        this.database.on('child_added', snap => {
          currentCards.push({
            id: snap.key,
            eng: snap.val().eng,
            kan: snap.val().kan,
            rom: snap.val().rom
          })

          this.setState({
            cards: currentCards,
            currentCard: this.getRandomCard(currentCards),
            category: this.props.cardsCategory
          })
        })
      }
      this.props.sendLanguage(this.state.user.language);
    }

  }

  componentWillMount() {
    this.getUserData();

  }


  getRandomCard(currentCards) {
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if (card === this.state.currentCard) {
      this.getRandomCard(currentCards)
    }

    return (card);
  }

  async updateCard() {
    const currentCards = this.state.cards;
    const newCards = [];
    if (this.state.category === this.props.category) {
      await this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      })
    }
    else {

      if (firebase.apps.length) {
        var cardString = null;
        switch (this.props.cardsCategory) {
          case 'Animals':
            console.log(this.props.cardsCategory);
            cardString = "/0/" + this.state.addedString + "-animals";

            break;
          case 'People':
            console.log(this.props.cardsCategory);

            cardString = "/1/" + this.state.addedString + "-people";

            break;
          case 'Food':
            console.log(this.props.cardsCategory);
            cardString = "/2/" + this.state.addedString + "-food";
            break;
          case 'School':
            console.log(this.props.cardsCategory);
            cardString = "/3/" + this.state.addedString + "-school";
            break;
          case 'House':
            console.log(this.props.cardsCategory);
            cardString = "/4/" + this.state.addedString + "-house";
            break;
          default:
            console.log("null");
            break;
        }

        await this.setState({
          cardString: cardString,
        })

        this.database = firebase.app().database().ref().child(this.state.databaseString + cardString);
        this.database.on('child_added', snap => {
          newCards.push({
            id: snap.key,
            eng: snap.val().eng,
            kan: snap.val().kan,
            rom: snap.val().rom
          })

          this.setState({
            cards: newCards,
            currentCard: this.getRandomCard(newCards),
            category: this.props.cardsCategory
          })

        })
        this.updateCard = this.updateCard.bind(this);
      }
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

}

export default CardsContainer;