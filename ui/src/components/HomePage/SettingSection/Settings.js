import React from 'react';
import './settings.css'
import SettingsCard from './SettingsCard/SettingsCard.js';

import { firebase } from '../../../firebase';
//import { db } from '../../../firebase';
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


  componentDidMount() {
  }

  render() {


    firebase.auth.onAuthStateChanged(authUser => {
      if (!authCondition(authUser)) {
        window.location = routes.SIGN_IN;
      }
    });
    console.log(this.state);
    if (firebase.auth.currentUser !== null) {
      return (
        <div>
          <SettingsCard languageChange={this.changeLang}
            languageB={this.state.languageB}
            languageS={this.state.languageS}
            userid={firebase.auth.currentUser.uid} />
        </div>

      );
    }
    else {
      return null;
    }
  }
}

export default Settings;