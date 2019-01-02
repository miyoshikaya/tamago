import React from 'react';
import './tests-style.css';
import CardsContainer from './CardsContainer/CardsContainer.js';
import SettingsContainer from './SettingsContainer/SettingsContainer.js';
import CardTitle from './CardsContainer/CardTitle/CardTitle.js';
import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';
import { db } from '../../../firebase';


const authCondition = (authUser) => !!authUser;

class StudyCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      cardCategory: 'People',
      cardLanguage: '',
      cardStatus: null,
      cardIndex: null,
      cardId: null,
    };

    this.getCategory = this.getCategory.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getCard = this.getCard.bind(this);
    this.getStatusWithoutSetting = this.getStatusWithoutSetting.bind(this);
  }


  async getCategory(val) {
    await this.setState({
      cardCategory: val
    })
  }

  async getCard(id, val) {
    await this.setState({
      cardId: id,
      cardIndex: val
    });
  }

  async getLanguage(val) {
    await this.setState({
      cardLanguage: val
    })
  }

  async getStatus(val) {
    await this.setState({
      cardStatus: val
    })
    db.setCard(firebase.auth.currentUser.uid, this.state.cardId, this.state.cardIndex, val);
  }

  async getStatusWithoutSetting(val) {
    await this.setState({
      cardStatus: val
    });
  }


  componentDidMount() {
  }

  render() {

    firebase.auth.onAuthStateChanged(authUser => {
      if (!authCondition(authUser)) {
        window.location = routes.SIGN_IN;
      }
    });
    if (firebase.auth.currentUser !== null) {

      return (
        <div className="centered-study" id="mainWrap">
          <div className="half">
            <div id="lang-title">
              <CardTitle category={this.state.cardCategory} language={this.state.cardLanguage} status={this.state.cardStatus} />
              <hr />
              <CardsContainer cardsCategory={this.state.cardCategory}
                uid={firebase.auth.currentUser.uid}
                sendLanguage={this.getLanguage}
                setCard={this.getCard}
                setStatus={this.getStatusWithoutSetting}
              />
            </div>

          </div>
          <div className="half purple">
            <div id="settingsWrapperCard">
              <SettingsContainer sendCategory={this.getCategory} sendStatus={this.getStatus} status={this.state.cardStatus} />
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

export default StudyCard;