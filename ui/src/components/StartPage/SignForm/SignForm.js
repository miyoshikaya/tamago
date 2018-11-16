import React from 'react';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import './login-style.css';

class SignForm extends React.Component {
	constructor(){
  	super()
    this.state={
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

 onRouteChange = (route) => {
    this.setState({route: route});
  }
  

  test = (data) => {
    alert(data);
    //tutaj dodanie klasy active-dx i usunięcie inactive-dx to komponenta <SignIn />
  }

backClick = (data) => {
  alert(data);
  //tutaj dodanie klasy active-sx oraz usunięcie klasy inactive-sx to komponenta <SignUp />
}
	render() {
		//const { onRouteChange } = this.props;
		return (
		<div className="sign-form">
			<SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} loginClickChange={this.test} />
			<SignIn onRouteChange={this.onRouteChange} backClickChange={this.backClick} />
		</div>
		);
	}
}

export default SignForm;