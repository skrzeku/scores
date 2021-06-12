import React from 'react';
import Logo from '../../assets/images/logo.png';
import Styled from "styled-components";
import {Link} from "@reach/router";
import {colorPrimary} from "../../variables";







const Navigation = ()=> {

    const Navi = Styled.div`
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            
           
        `;

    const Navi__img = Styled.img`
 
  
    
    `;

    const NavLink = Styled.i`
    font-size: 40px;
    color: white;
    margin-right: 20px
    `;

    const NavMenu = Styled.ul`
    background-color: ${colorPrimary};
    padding: 15px 30px;
    border-bottom-left-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    `;



    return(<Navi>
        <Navi__img src={Logo}/>
        <NavMenu>
            <Link to="/"><NavLink className="las la-home"></NavLink></Link>
            <Link to="/history"><NavLink className="las la-history"></NavLink></Link>
            <Link to="/login"><NavLink className="las la-sign-in-alt"></NavLink></Link>

        </NavMenu>
    </Navi>)
};





export default Navigation;