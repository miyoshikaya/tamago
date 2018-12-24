//import React from 'react';
import './login-style.css';
import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';


//const authCondition = (authUser) => !!authUser;


const Logout = () => {


    auth.doSignOut();
    window.location = routes.SIGN_IN;


    return null;

}
export default Logout;