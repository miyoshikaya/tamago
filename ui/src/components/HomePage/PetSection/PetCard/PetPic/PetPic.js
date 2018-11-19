import React from 'react';
import './petpic.css';

class PetPic extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pet: ''
    }
  }
 
 animate(){
  console.log("animation WOOP WOOP");
 }

  render () {
    return (
    <div>
      <img className="pet-pic" src="https://image.flaticon.com/icons/svg/1089/1089427.svg" onClick={this.animate} alt="" />
    </div>
    );
  }
}

export default PetPic;