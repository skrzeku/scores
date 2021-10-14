import React from 'react';
import Logo from '../../assets/images/logo.png';
import Styled from "styled-components";
import {Link, useLocation} from "@reach/router";
import {colorPrimary} from "../../variables";







const Navigation = (props)=> {




    const Navi = Styled.div`
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: absolute;
            top: 0;
            width: auto;
            z-index: 20;
           right: 0;
        `;
    const NaviTitle = Styled.div`
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
    `;

    const Navi__img = Styled.img`
 
    padding: 20px;
    height: 140px;
    width: auto;
  
    
    `;

    const NavLink = Styled.i`
    font-size: 40px;
    color: white;
    margin-right: 20px;
    transition: 0.2s all ease;
        &:hover {
        opacity: 0.6;
        }
    `;

    const NavMenu = Styled.ul`
    background-color: ${colorPrimary};
    padding: 15px 30px;
    border-bottom-left-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    `;



    return(<Navi>
        {/*<Navi__img src={Logo}/>*/}
        <NaviTitle></NaviTitle>

        <NavMenu>
            <Link to="/"><NavLink className="las la-home"></NavLink></Link>
            <Link to="/stats"><NavLink className="las la-chart-bar"></NavLink></Link>
            <Link to="/ranking"><NavLink className="las la-medal"></NavLink></Link>
            <Link to="/login"><NavLink className="las la-sign-in-alt"></NavLink></Link>


        </NavMenu>
    </Navi>)
};





export default Navigation;