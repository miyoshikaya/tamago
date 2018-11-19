import React from 'react';
import './progresscard.css';
import Dropdown from './Dropdown/Dropdown.js';

class ProgressCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: 'animals'
    }
  }

  changeCategory = (cat) => {
    //-------------------------------------------------
    //
    //here send change the viewed words
    //
    //-------------------------------------------------
    this.setState({
      category: cat
    });
  }
 

  render () {
    return (
    <div className="centered" id="mainContainer">
        <div className="half purple">
          <div id="title">Category</div>
          <div id="colorsWrapper">
            <Dropdown handleCategoryChange={this.changeCategory}/>
          </div>
        </div>
        <div className="half">
          <div id="tableWrapper">
            {/**/}
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressCard;