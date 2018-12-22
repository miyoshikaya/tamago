import React from 'react';
import './petpic.css';

class PetPic extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pet: '',
      alive: this.props.alive,
    }
  }
 
 animate(){
  console.log("animation WOOP WOOP");
 }

 renderAlivePet(){
  return (
    <div>
      <img className="pet-pic" src="https://image.flaticon.com/icons/svg/1089/1089427.svg" onClick={this.animate} alt="" />
    </div>
  );
 }

 renderDeadPet(){
  return (
    <div>
      <img className="pet-pic" src="https://image.flaticon.com/icons/svg/1089/1089376.svg" onClick={this.animate} alt="" />
    </div>
  );
 }

  render () {
    return (
    <div>
        {this.props.alive ? this.renderAlivePet() 
          : this.renderDeadPet()
        }
      </div>
    );
  }
}

export default PetPic;