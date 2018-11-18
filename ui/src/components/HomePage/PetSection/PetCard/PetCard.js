import React from 'react';
import './petcard.css';
import CardTitle from './CardTitle/CardTitle.js';
import PetPic from './PetPic/PetPic.js';
import PlayButtons from './PlayButtons/PlayButtons.js'

class PetCard extends React.Component {
  constructor(props) {
    super(props);
    
  }
 
  render () {
    return (
      <div className="centered-study" id="mainWrap">
      <div className="half">
        <div id="settingsWrapperCard">
            
        </div>
      </div>
      <div className="half purple">
        <div id="lang-title">
          <CardTitle />
          <hr />
          <PetPic />
          <hr />
          <PlayButtons />
        </div>
      </div>
    </div>
    );
  }
}

export default PetCard;