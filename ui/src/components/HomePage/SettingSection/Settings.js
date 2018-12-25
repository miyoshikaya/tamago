import React from 'react';
import './settings.css'
import SettingsCard from './SettingsCard/SettingsCard.js';

import { firebase } from '../../../firebase';
import { db } from '../../../firebase';
import * as routes from '../../../constants/routes';


const authCondition = (authUser) => !!authUser;



class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      languageB: null,
      languageS: null,
    }

    this.changeLang = this.changeLang.bind(this);
  }

  changeLang(lang) {
    db.setLang(firebase.auth.currentUser.uid, lang);
    if (lang === 'Japanese') {
      this.setState({
        languageB: 'Jp',
        languageS: lang
      });
    } else if (lang === 'Korean') {
      this.setState({
        languageB: 'Kr',
        languageS: lang
      });
    } else if (lang === 'Polish') {
      this.setState({
        languageB: 'Pl',
        languageS: lang
      });
    }
  }

  async getUserData() {
    if (firebase.auth.currentUser !== null) {
      var user = db.onceGetUser(firebase.auth.currentUser.uid).then(snapshot => snapshot.val());
      await user.then((value) => {
        this.setState({
          user: value
        })
      });
      console.log(this.state.user);
      switch (this.state.user.language) {
        case 'Korean':
          await this.setState({
            languageB: 'Kr',
            languageS: 'Korean',
          });
          break;
        case 'Japanese':
          await this.setState({
            languageB: 'Jp',
            languageS: 'Japanese',
          });
          break;
        case 'Polish':
          await this.setState({
            languageB: 'Pl',
            languageS: 'Polish',
          });
          break;
      }
    }
  }
  componentDidMount() {
    this.getUserData();
  }

  render() {


    firebase.auth.onAuthStateChanged(authUser => {
      if (!authCondition(authUser)) {
        window.location = routes.SIGN_IN;
      }
    });
    if (this.state.user !== null && firebase.auth.currentUser !== null) {
      console.log(this.state);
      return (
        <div>
          <SettingsCard languageChange={this.changeLang}
            languageB={this.state.languageB}
            languageS={this.state.languageS} />
        </div>

      );
    }
    else {
      return null;
    }
  }
}

export default Settings;