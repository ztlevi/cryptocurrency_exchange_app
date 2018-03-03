import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Navigation.css';

var style = {
  position: 'relative',
  top: '15px'
};
const navigation = () => (
  <div className ={classes.Navigation}>
    <ul className = "nav nav-pills nav-fill" style={style}>
      <li className = "nav-item nav-link">  
        <NavLink to='/' exact>Intra-Day</NavLink>
      </li>
      <li className = "nav-item nav-link">
        <NavLink to='/'>Historical Daily</NavLink>
      </li>
      <li className = "nav-item nav-link">
        <NavLink to='/'>Trading</NavLink>
      </li>
      <li className = "nav-item nav-link">
        <NavLink to='/'>LeaderBoard</NavLink>
      </li>
    </ul>
  </div>
);

export default navigation;