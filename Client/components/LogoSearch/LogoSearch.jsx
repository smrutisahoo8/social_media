import React from 'react';
import Logo from '../../image/ghj.png';
import {UilSearch} from '@iconscout/react-unicons';
import './LogoSearch.css';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
        <div style={{maxWidth:"70px",marginTop:"4px"}}>
         <img src={Logo} alt="" style={{width:"80px"}}></img>
        </div>
        <div className="logo">
           <h3 style={{marginTop:"10px"}}>TriExpress</h3>
       </div>
    </div>
  )
}

export default LogoSearch