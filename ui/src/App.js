import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import * as routes from './constants/routes.js';
import './App.css';
import withAuthentication from './withAuthentication.js';

import SignUp from './components/StartPage/SignForm/SignUp.js';
import SignIn from './components/StartPage/SignForm/SignIn.js';
import PwdReset from './components/StartPage/SignForm/PwdReset.js';
import Navigation from './Navigation.js';

import Pet from './components/HomePage/PetSection/Pet.js'
import Tests from './components/HomePage/TestSection/Tests.js';
import Quizzes from './components/HomePage/QuizSection/Quizzes.js';
import Progress from './components/HomePage/ProgressSection/Progress.js';
import Settings from './components/HomePage/SettingSection/Settings.js';

const App = () => 

	<Router>
		<div className="App">
			<Navigation />
			<Route exact path={routes.LANDING} component={SignIn} />

			<Route exact path={routes.SIGN_IN} component={SignIn} />

			<Route exact path={routes.SIGN_UP} component={SignUp} />

			<Route exact path={routes.PASSWORD_FORGET} component={PwdReset} /> 

			<Route exact path={routes.PET} component={Pet} /> 
			{/*<Route exact path={routes.PET} component={Navigation} />*/}
			<Route exact path={routes.STUDY} component={Tests} />
			{/*<Route exact path={routes.STUDY} component={Navigation} />*/}
			<Route exact path={routes.QUIZ} component={Quizzes} />
			{/*<Route exact path={routes.QUIZ} component={Navigation} /> */}
			<Route exact path={routes.PROGRESS} component={Progress} />
			{/*<Route exact path={routes.PROGRESS} component={Navigation} />*/}
			<Route exact path={routes.SETTINGS} component={Settings} /> 
			{/*<Route exact path={routes.SETTINGS} component={Navigation} />*/}
		</div> 
	</Router>


export default withAuthentication(App);
