import React from 'react';
import './petpic.css';

class PetPic extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pet: '',
      alive: this.props.alive,
      reason: this.props.reason,
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

//https://image.flaticon.com/icons/svg/1089/1089376.svg
 renderDeadPet(){
  return (
    <div>
      <img className="pet-pic" src="https://imgur.com/DejIcwJ.png" onClick={this.animate} alt="" />
      {/*alert('Your pet is dead :( It died because of ' + this.props.reason + '.')*/}
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