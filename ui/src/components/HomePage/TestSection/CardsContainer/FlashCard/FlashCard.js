import React from 'react';
import './flashcard-style.css';

class FlashCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            front: this.props.side,
        }
    }

    render() {
        let frontClass = ["card"];
        let backClass = ["card back-class"];

        if (this.props.side === 'front') {
            if (this.props.kan === '' || this.props.kan === ' '){
                frontClass.push('active');
                return (
                    <div className="card-container">
                        <div className={frontClass.join(' ')}>
                            <div className="front">
                                <div className="eng">{this.props.eng} {/*this.props.side*/}</div>
                            </div>
                            <div className="back">
                                <hr id="hr-flashcard" />
                                <div className="rom">{this.props.rom}</div>
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                frontClass.push('active');
                return (
                    <div className="card-container">
                        <div className={frontClass.join(' ')}>
                            <div className="front">
                                <div className="eng">{this.props.eng} {/*this.props.side*/}</div>
                            </div>
                            <div className="back">
                                <div className="kan">{this.props.kan}</div>
                                <div className="rom">{this.props.rom}</div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else {
             if (this.props.kan === '' || this.props.kan === ' '){
                backClass.push('active');
                return (
                    <div className="card-container">
                        <div className={backClass.join(' ')}>
                            <div className="front">
                                <div className="eng">{this.props.eng} {/*this.props.side*/}</div>
                            </div>
                            <div className="back">
                                <hr id="hr-flashcard" />
                                <div className="rom">{this.props.rom}</div>
                            </div>
                        </div>
                    </div>
                );
             }
             else{
                //console.log('BACK');
                backClass.push('active');
                return (
                    <div className="card-container">
                        <div className={backClass.join(' ')}>
                            <div className="front">
                                <div className="eng">{this.props.eng} {/*this.props.side*/}</div>
                            </div>
                            <div className="back">
                                <div className="kan">{this.props.kan}</div>
                                <div className="rom">{this.props.rom}</div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default FlashCard