import React from 'react';
import './progresscard.css';
import Dropdown from './Dropdown/Dropdown.js';
import { db } from '../../../../firebase';

class ProgressCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: 'animals',
      users: null, 
    }
  }

  changeCategory = (cat) => {
    //-------------------------------------------------
    //
    //here send change the viewed words
    //
    //-------------------------------------------------
    this.setState({
      category: cat
    });
  }
 
  componentDidMount() { 
    db.onceGetUsers().then(snapshot => 
      this.setState(() => ({ 
        users: snapshot.val() })) 
    ); 
    console.log(this.state.users);
  }


  render () {
    const { users } = this.state;

    return (
      <div className="centered" id="mainContainer">
          <div className="half purple">
            <div id="title">Category</div>
            <div id="colorsWrapper">
              <Dropdown handleCategoryChange={this.changeCategory}/>
            </div>
          </div>
          <div className="half">
            <div id="tableWrapper">
              {/**/}
              <h2>hello</h2>
              { !!users && <UserList users={users} /> } 
            </div>
          </div>
        </div>
    );
  }
}

const UserList = ({ users }) => 
<div> 
  <h2>List of Usernames of Users</h2> 
  <p>(Saved on Sign Up in Firebase Database)</p>
  
  {Object.keys(users).map(key => 
    <div key={key}>{users[key].username}</div> 
    )} 
</div>

export default ProgressCard;