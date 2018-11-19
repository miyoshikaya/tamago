import React from 'react';
import './wordstatuscheckbox.css';

class WordStatusCheckbox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cb1status: 'false'
    }
  }

  lala(){
    
  }

  render () {
    return (
      <div className="center-on-page">
        <input type="checkbox" name="cb" id="cb1" onClick={this.lala} />
        <label htmlFor="cb1">Learning</label>
        <input type="checkbox" name="cb" id="cb2" />
        <label htmlFor="cb2">Learnt</label>
        <input type="checkbox" name="cb" id="cb3" />
        <label htmlFor="cb3">Mastered</label>
      </div>
    );
  }
}

export default WordStatusCheckbox;



