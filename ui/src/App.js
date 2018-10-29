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
      route: 'signIn'
    }
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

  render() {
    return (
        <div>
          {
            this.state.route === 'signIn' ?
            <div>
              <TamagoBar />
              {
                this.state.showMe === true ?
                <SignIn onRouteChange={this.onRouteChange} />
                :<SignUp  onRouteChange={this.onRouteChange} />
              }
              <button type="button" className="block form-btn sx back" onClick={()=>this.operation()}>Log In/Register</button>
            </div>
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
