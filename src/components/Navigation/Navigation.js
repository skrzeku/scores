import React from 'react';
import Logo from '../../assets/images/logo.png';
import Styled from "styled-components";







const Navigation = ()=> {

    const Navi = Styled.div`
            text-align: left;
        `;

    const Navi__img = Styled.img`
 
  
    
    `;



    return(<Navi>
        <Navi__img src={Logo}/>
    </Navi>)
};





export default Navigation;