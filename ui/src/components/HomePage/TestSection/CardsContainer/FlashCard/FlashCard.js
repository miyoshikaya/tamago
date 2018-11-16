import React from 'react';
import './flashcard-style.css';

const FlashCard = (props) => (
    <div className="card-container">
        <div className="card">
            <div className="front">
                <div className="eng">{props.eng}</div>
            </div>
            <div className="front back">
                <div className="kan">{props.kan}</div>
                <div className="rom">{props.rom}</div>
            </div>
        </div>
    </div>
)

export default FlashCard