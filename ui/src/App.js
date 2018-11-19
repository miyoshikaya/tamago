import React, { Component } from 'react';
import './App.css';
import TamagoBar from './components/StartPage/Title/Tamago-Bar.js';
import SignUp from './components/StartPage/SignForm/SignUp.js';
import SignIn from './components/StartPage/SignForm/SignIn.js';
import Navigation from './components/Navigation/Navigation.js';
import Pet from './components/HomePage/PetSection/Pet.js'
import Progress from './components/HomePage/ProgressSection/Progress.js';
import Tests from './components/HomePage/TestSection/Tests.js';
import Settings from './components/HomePage/SettingSection/Settings.js';
import Quizzes from './components/HomePage/QuizSection/Quizzes.js';

class App extends Component {
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
    return (
        <div className="App">
          {
            this.state.route === 'signIn' ?
            <div>
              <TamagoBar />
              <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} loginClickChange={this.test} />
              <SignIn onRouteChange={this.onRouteChange} backClickChange={this.backClick} />
              
              {
                /*this.state.showMe === true ?
                <SignIn onRouteChange={this.onRouteChange}  />
                :<SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />*/
              }
            </div>

            //<button type="button" className="block form-btn sx back" onClick={()=>this.operation()}>Log In/Register</button>
            
            :
            this.state.route==='home'? 
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              {/*<HomePage />*/}
              <Pet />
            </div>
            :
            this.state.route==='pet'?
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Pet />
            </div>
            :
            this.state.route==='quiz'?
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Quizzes />
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
