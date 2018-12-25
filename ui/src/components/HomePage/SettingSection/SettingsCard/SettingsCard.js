import React from 'react';
import './settingscard.css';
import Dropdown from './Dropdown/Dropdown.js';
import PwdChangeForm from './PwdChange.js';
import { firebase } from '../../../../firebase';
import { db } from '../../../../firebase';


class SettingsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      languageB: this.props.languageB,
      languageS: this.props.languageS,
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

    console.log(firebase.auth.currentUser);
    this.getUserData();
    console.log(firebase.auth.currentUser);
  }

  changeLanguage = (lang) => {
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
    db.setLang(firebase.auth.currentUser.uid, lang);
  }

  render() {
    if (this.state.languageS !== null) {
      return (
        <div className="centered" id="mainWrapper">
          <div className="half purple">
            <div id="title">Tamago settings</div>
            <div id="preview">
              <div id="previewText">{this.state.languageB}</div>
              <div id="previewTitle"><span>{this.state.languageS}</span> Language</div>
            </div>
            <div id="switchWrapper">
              <div id="switchOuter">
              </div>
            </div>
          </div>
          <div className="half">
            <div id="settingsWrapper">
              <PwdChangeForm />
              <div id="colorPicker">
                <div className="dropdownTitle">Language</div>
                <div id="colorsWrapper">
                  <Dropdown handleLanguageChange={this.changeLanguage}
                    currentLanguage={this.state.languageS} />
                </div>
              </div>
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

export default SettingsCard;