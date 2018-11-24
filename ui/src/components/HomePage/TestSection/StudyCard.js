import React from 'react';
import './tests-style.css';
import CardsContainer from './CardsContainer/CardsContainer.js';
import SettingsContainer from './SettingsContainer/SettingsContainer.js';
import CardTitle from './CardsContainer/CardTitle/CardTitle.js';


class StudyCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardCategory: 'Animals',
      cardLanguage: 'LANGUAGE',
      cardStatus: 'Learning'  
    };

    this.getCategory = this.getCategory.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }


async getCategory(val){
    await this.setState({
      cardCategory: val
    })
}

async getLanguage(val){
  await this.setState({
    cardLanguage: val
  })
}

async getStatus(val){
  await this.setState({
    cardStatus: val
  })
}

  render () {
    
    return (
      <div className="centered-study" id="mainWrap">
      <div className="half">
        <div id="lang-title">
          <CardTitle category={this.state.cardCategory} language={this.state.cardLanguage} status={this.state.cardStatus} />
          <hr className="hr-class" />
          <CardsContainer cardsCategory={this.state.cardCategory} />
        </div>
        
      </div>
      <div className="half purple">
        <div id="settingsWrapperCard">
            <SettingsContainer sendCategory={this.getCategory} sendStatus={this.getStatus} />
        </div>
      </div>
    </div>
    );
  }
}

export default StudyCard;