import React from 'react';
import './settings.css'
import SettingsCard from './SettingsCard/SettingsCard.js';

import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';


const authCondition = (authUser) => !!authUser;



class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'Japanese',
    }
  }

  passLang = (lang) => {
    console.log(lang);
    //this.props.passLangUp(lang);

    //przesłać info o języku do jakiegoś komponenta nadrzędnego, żeby mogło trafić do STUDY i QUIZZES
  }

  render() {


    firebase.auth.onAuthStateChanged(authUser => {
      if (!authCondition(authUser)) {
        window.location = routes.SIGN_IN;
      }
    });
    return (
      <div>
        <SettingsCard languageChange={this.passLang} />
      </div>

    );
  }
}

export default Settings;