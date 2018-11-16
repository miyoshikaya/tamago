import React from 'react';
import './settingscard.css';
import Dropdown from './Dropdown/Dropdown.js';

class SettingsCard extends React.Component {
  constructor() {
    super();
    
    this.state = {
      
    }
  }

  render () {
    return (
      <div class="centered" id="mainWrapper">
        <div class="half purple">
          <div id="title">Tamago settings</div>
          <div id="preview">
            <div id="previewText">Jp</div>
            <div id="previewTitle"><span>Japanese</span> Language</div>
          </div>
          <div id="switchWrapper">
            <div id="switchOuter">
              {/*<div id="switchInner"></div>*/}
            </div>
          </div>
        </div>
        <div class="half">
          <div id="settingsWrapper">
            <div class="dropdownWrapper">
              <div class="dropdown">
                <div class="dropdownTitle">New password:</div>
                <div class="dropdownOption">
                  <input type="password" placeholder="Insert password" required className="pwd" />
                </div>
              </div>
            </div>
            <div class="dropdownWrapper">
              <div class="dropdown">
                <div class="dropdownTitle">Repeat password:</div>
                <div class="dropdownOption">
                  <input type="password" placeholder="Confirm password" required className="pwd" />
                </div>
              </div>
            </div>
            <div id="colorPicker">
              <div class="settingTitle">Language</div>
              <div id="colorsWrapper">
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsCard;