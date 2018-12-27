import React, { Component } from 'react';
//import QuizCard from './QuizCard.js';
import QuizCard from './QuizCard/QuizCard.js';
import QuizSettings from './settings/QuizSettings.js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

import { firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';
import { db } from '../../../firebase';


const authCondition = (authUser) => !!authUser;


class QuizContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: 'Animals',
			quizComplete: false,
			generateNew: false,
		}

		this.receiveCategory = this.receiveCategory.bind(this);
		this.generatedQuiz = this.generatedQuiz.bind(this);
	}

	generatedQuiz() {
		this.setState({
			generateNew: false
		})
	}

	receiveCategory = (cat) => {
		//check if the quiz is complete
		if (!this.state.quizComplete) {
			confirmAlert({
				title: 'Confirm to submit',
				message: 'Are you sure you want to restart the quiz? You will lose all progress.',
				buttons: [
					{
						label: 'Yes',
						onClick: () => {
							this.setState({
								category: cat,
								generateNew: true,
							});
							console.log('new quiz starting');
						}
					},
					{
						label: 'No'
						//nothing -> continue with the quiz
					}
				]
			})
		}
		else {
			//wygenerowanie nowego quizu

			this.setState({
				category: cat,
				quizComplete: false,
				generateNew: true,
			});
			console.log('new quiz starting');
		}

	}

	getQuizComplete = (completion) => {
		this.setState({
			quizComplete: completion,
		});
		console.log(completion);
	}

	render() {
		firebase.auth.onAuthStateChanged(authUser => {
			if (!authCondition(authUser)) {
				window.location = routes.SIGN_IN;
			}
		});
		if (firebase.auth.currentUser !== null) {
			return (
				<div className="centered" id="main-Container">
					<div className="half purple">
						<QuizSettings changeCat={this.receiveCategory} />
					</div>
					<div className="other-half">
						<hr />
						<QuizCard category={this.state.category}
							quizComplete={this.getQuizComplete}
							generateNew={this.state.generateNew}
							generatedQuiz={this.generatedQuiz}
							quizCompleted={this.quizComplete}
							uid={firebase.auth.currentUser.uid} />
					</div>
				</div>
			);
		}
		else {
			return null;
		}
	}
}

export default QuizContainer;
