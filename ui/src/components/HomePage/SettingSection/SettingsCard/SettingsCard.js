import React from 'react';
import './settingscard.css';
import Dropdown from './Dropdown/Dropdown.js';
import PwdChangeForm from './PwdChange.js';


class SettingsCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      languageB: 'Jp',
      languageS: 'Japanese',
    }
  }

  changeLanguage = (lang) => {
    if(lang==='Japanese'){
      this.setState({
        languageB: 'Jp',
        languageS: lang
      });
    } else if(lang==='Korean'){
      this.setState({
        languageB: 'Kr',
        languageS: lang
      });
    } else if(lang==='Polish'){
      this.setState({
        languageB: 'Pl',
        languageS: lang
      });
    }
    this.props.languageChange(lang);
  }

  render () {
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
                <Dropdown handleLanguageChange={this.changeLanguage}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsCard;