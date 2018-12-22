import React from 'react';
import './flashcard-style.css';

class FlashCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            front: this.props.side,
        }
    }

    /*how to force re-render?*/

    render() {
        let frontClass = ["card"];
        let backClass = ["card back-class"];

        if (this.props.side === 'front') {
            console.log('FRONT');
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
        else {
            console.log('BACK');
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

        // return (

        //     <div className="card-container">
        //         <div className={frontClass.join(' ')}>
        //             <div className="front">
        //                 <div className="eng">{this.props.eng} {/*this.props.side*/}</div>
        //             </div>
        //             <div className="front back">
        //                 <div className="kan">{this.props.kan}</div>
        //                 <div className="rom">{this.props.rom}</div>
        //             </div>
        //         </div>
        //     </div>
        // );
    }
}

export default FlashCard