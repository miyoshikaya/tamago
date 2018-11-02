import React, { Component } from 'react';
import './App.css';
import TamagoBar from './components/StartPage/Title/Tamago-Bar.js';
import SignIn from './components/StartPage/SignIn/SignIn.js';
import SignUp from './components/StartPage/SignIn/SignUp.js';
import HomePage from './components/HomePage/HomePage.js';
import Navigation from './components/Navigation/Navigation.js';
import Pet from './components/HomePage/PetSection/Pet.js'
import Progress from './components/HomePage/ProgressSection/Progress.js';
import Tests from './components/HomePage/TestSection/Tests.js';
import Settings from './components/HomePage/SettingSection/Settings.js';

class App extends Component {
  constructor(){
  super()
    this.state={
      showMe:true,
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

  operation()
  {
    this.setState({
      showMe:!this.state.showMe
    })
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  test = (data) => {
    alert(data);
  }



  render() {
    return (
        <div>
          {
            this.state.route === 'signIn' ?
            <div>
              <TamagoBar />
              <SignIn onRouteChange={this.onRouteChange}/>
              <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} borys={this.test}/>
              
              {
                /*this.state.showMe === true ?
                <SignIn onRouteChange={this.onRouteChange}  />
                :<SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />*/
              }
            </div>

            //<button type="button" className="block form-btn sx back" onClick={()=>this.operation()}>Log In/Register</button>
            :
            this.state.route==='signUp'?
            <div> <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> </div>
            :
            this.state.route==='home'? 
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <HomePage />
            </div>
            :
            this.state.route==='pet'?
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Pet />
            </div>
            :
            this.state.route==='progress'?
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Progress />
            </div>
            :
            this.state.route==='tests'?
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Tests />
            </div>
            :
            this.state.route==='settings'?
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Settings />
            </div>
            :null
          }
          
        </div>
      );
  }
}

export default App;
