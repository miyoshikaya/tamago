import React, { Component } from 'react';
import './language-choice.css';


const fonts = ['Arial', 'Helvetica', 'Times', 'Palatino', 'Times New Roman', 'Arial Black', 'Gadget', 'Comic Sans MS', 'cursive', 'Impact', 'Charcoal', 'Tahoma', 'Geneva', 'Verdana'];

class LanguageChoiceContainer extends React.Component {
  render () {
    const {
      show,
      value,
      handleToggle,
      handleBlur,
      handleChange,
    } = this.props;
    
    return (
      <div className="dropdown-container">
        <label className="arrow">
          <input
            type="button"
            value={value}
            className="dropdown-btn"
            style={{ fontFamily: value }}
            onClick={handleToggle}
            onBlur={handleBlur}
          />
        </label>
        <ul className="dropdown-list" hidden={!show}>
          {fonts.map((font) => (
            <li
              className="option"
              style={{ fontFamily: font }}
              onClick={handleChange(font)}
            >
              {font}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LanguageChoiceContainer;