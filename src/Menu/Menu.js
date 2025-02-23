import React from 'react';

import {
    Link
  } from "react-router-dom";
  
function Menu() {
  return (
    <nav>
            <ul>
                <li><Link to="/" aria-expanded="false">Home</Link></li>
                <li><Link to="/about" aria-expanded="false">About</Link></li>
                <li><Link to="/login" aria-expanded="false">Login</Link></li>
            </ul>
        </nav>
  );
}

export default Menu;
