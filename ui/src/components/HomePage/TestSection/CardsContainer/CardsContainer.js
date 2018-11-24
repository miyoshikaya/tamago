import React, { Component } from 'react';
import './cardscontainer.css';
import FlashCard from './FlashCard/FlashCard.js';
import DrawButton from './DrawButton/DrawButton.js';
import FlipButton from './FlipButton/FlipButton.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

import { DB_CONFIG } from './Config/Firebase/db_config';


class CardsContainer extends Component {

	constructor(props){
    super(props);

    if (!firebase.apps.length){

      this.app = firebase.initializeApp(DB_CONFIG);

      switch(this.props.cardsCategory) {
        case 'Animals':
          console.log(this.props.cardsCategory);
          this.database = this.app.database().ref().child("jpn-cards/0/jpn-cards-animals");
          break;
        case 'People':
          console.log(this.props.cardsCategory);
          this.database = this.app.database().ref().child("jpn-cards/1/jpn-cards-people");
          break;
        case 'Food':
          console.log(this.props.cardsCategory);
          this.database = this.app.database().ref().child("jpn-cards/2/jpn-cards-food");
          break;
        default:
          console.log("null");
          break;
      }
      this.updateCard = this.updateCard.bind(this);
    }
    else {
      this.app = firebase.app().firestore();
      switch(this.props.cardsCategory) {
        case 'Animals':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("jpn-cards/0/jpn-cards-animals");
          break;
        case 'People':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("jpn-cards/1/jpn-cards-people");
          break;
        case 'Food':
          console.log(this.props.cardsCategory);
          this.database =  firebase.app().database().ref().child("jpn-cards/2/jpn-cards-food");
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
      category: ''
    }
    

  }



  componentWillMount(){
    const currentCards = this.state.cards;
    if (firebase.apps.length){
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


  getRandomCard(currentCards){
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if(card === this.state.currentCard){
      this.getRandomCard(currentCards)
    }

    return(card);
  }

  async updateCard(){
    const currentCards = this.state.cards;
    await this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
    console.log(this.props.cardsCategory);

    if (firebase.apps.length){
      console.log("lala jestem tu");
      switch(this.props.cardsCategory) {
        case 'Animals':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("jpn-cards/0/jpn-cards-animals");
          break;
        case 'People':
          console.log(this.props.cardsCategory);
          this.database = firebase.app().database().ref().child("jpn-cards/1/jpn-cards-people");
          break;
        case 'Food':
          console.log(this.props.cardsCategory);
          this.database =  firebase.app().database().ref().child("jpn-cards/2/jpn-cards-food");
          break;
        default:
          console.log("null");
          break;
        }
        this.updateCard = this.updateCard.bind(this);
    }

  }

  turnCard(){

  }

  render() {
    return (
      <div className="card-container">
        <div className="cardCol">
          <div className="cardRow">
            <FlashCard	eng={this.state.currentCard.eng}
              			kan={this.state.currentCard.kan}
              			rom={this.state.currentCard.rom} />
          </div>
          <div className="buttonRow">
            <DrawButton drawCard={this.updateCard}/>
            <FlipButton flipCard={this.turnCard}/>
          </div>
        </div>
      </div>

    );
  }

}

export default CardsContainer;