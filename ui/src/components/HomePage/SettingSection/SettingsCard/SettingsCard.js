import React from 'react';
import './settingscard.css';
import Dropdown from './Dropdown/Dropdown.js';


class SettingsCard extends React.Component {
  constructor() {
    super();
    
    this.state = {
      languageB: 'Jp',
      languageS: 'Japanese'
    }
  }

  changeLanguage = (lang) => {
    //-------------------------------------------------
    //
    //here send change of the language that is being taught
    //
    //-------------------------------------------------
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
              {/*<div id="switchInner"></div>*/}
            </div>
          </div>
        </div>
        <div className="half">
          <div id="settingsWrapper">
            <div className="dropdownWrapper">
              <div className="dropdown">
                <div className="dropdownTitle">Old password:</div>
                <div className="dropdownOption">
                  <input type="password" placeholder="Insert old password" required className="pwd" />
                </div>
              </div>
            </div>
            <div className="dropdownWrapper">
              <div className="dropdown">
                <div className="dropdownTitle">New password:</div>
                <div className="dropdownOption">
                  <input type="password" placeholder="Insert new password" required className="pwd" />
                </div>
              </div>
            </div>
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