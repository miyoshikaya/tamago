import React, { Component } from 'react';
import './cardscontainer.css';
import FlashCard from './FlashCard/FlashCard.js';
import DrawButton from './DrawButton/DrawButton.js';
import FlipButton from './FlipButton/FlipButton.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';


class CardsContainer extends Component {

  constructor(props) {
    super(props);

    if (firebase.apps.length) {
      this.app = firebase.app().firestore();
      switch (this.props.cardsCategory) {
        case 'Animals':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/0/pln-cards-animals");
          break;
        case 'People':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/1/pln-cards-people");
          break;
        case 'Food':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/2/pln-cards-food");
          break;
        case 'School':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/3/pln-cards-school");
          break;
        case 'House':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/4/pln-cards-house");
          break;
        default:
          console.log("null");
          break;
      }
      this.updateCard = this.updateCard.bind(this);
    }


    this.state = {
      cards: [],
      currentCard: {},
      category: '',
      currentSide: 'front',
    }

    this.turnCard = this.turnCard.bind(this);
  }



  componentWillMount() {
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

    if (firebase.apps.length) {
      switch (this.props.cardsCategory) {
        case 'Animals':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/0/pln-cards-animals");
          if (this.state.category !== this.props.category) {
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
          }
          break;
        case 'People':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/1/pln-cards-people");

          if (this.state.category !== this.props.category) {
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
          }
          break;
        case 'Food':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/2/pln-cards-food");
          if (this.state.category !== this.props.category) {
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
          }
          break;
        case 'School':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/3/pln-cards-school");
          if (this.state.category !== this.props.category) {
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
          }
          break;
        case 'House':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("db/0/flashcards/2/pln-cards/4/pln-cards-house");
          if (this.state.category !== this.props.category) {
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
          }
          break;
        default:
          console.log("null");
          break;
      }
      this.updateCard = this.updateCard.bind(this);
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