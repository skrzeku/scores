import Styled from "styled-components";


export const colorPrimary = '#1d8fed';
export const formWrapper =`
position: fixed;
width: 100%;
height: 100%;
left: 0;
top: 0;
background-color: rgba(0,0,0, 0.3);
animation: .3s showBg;
display: flex;
align-items: center;
justify-content: center;
z-index: 10;

`;

export const GlobalTitle = Styled.h2`
font-size: 30px;
font-weight: bold;
position: relative;
margin-top: 50px;
margin-bottom: 30px;
  
`;


export const formInner =`
width: 600px;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
animation: .5s rollout;
position: relative;
border-radius: 10px;
`;


export const sendBtn = `
-webkit-appearance: none;
display: inline-block;
background-color: ${colorPrimary};
color: white;
padding: 10px 35px;
border: none;
position: absolute;
right: 0;
bottom: 0;
z-index: 2;
font-weight: 600;
`;

export const cancelBtn = `
position: absolute;
padding: 20px;
border: none;
position: absolute;
right: 0;
top: 0;
z-index: 2;
color: black;
text-decoration: none;
cursor: pointer;
font-size: 30px;
background-color: transparent;
`;

export const globalTitle = `
width: 200px;
background-color: ${colorPrimary} !important;
color: white;
font-weight: 700;
padding: 7px 30px 7px 15px;
text-transform: uppercase;
border-bottom-right-radius: 10px;
`;

export const buttonWrapper = `
margin-top: 30px;
`;


export const tabName = `
position: absolute;
top:0;
left: 35%;
display: none;
transform: translateX(-50%);
font-weight: 400;
text-transform: uppercase;
line-height: 80px;
padding: 0 10px;
            span {
            position: relative;
            
            &:before, &:after {
                content: '';
                top: 48%;
                position: absolute;
                width: 50px;
                height: 2px;
                background-color: ${colorPrimary}
            
                }
                    &:before {
                   left: -70px;
                   }
                    &:after {
                    right: -70px;
                    }
            }

    
`;

export const Table = `
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    margin: 0 auto;
    width: 95%;
    border-radius: 15px;
    table-layout: fixed;
    overflow: auto;
  
    thead {
    top: 0;
    z-index: 3;
    background-color: white;
    box-shadow: inset 0 -2px ${colorPrimary};
     tr{
     box-shadow: inset 0px 1px 0px 0px #dee2e6;
     border-width: 0 !important;
     }
    }
  `;

export const ClientLink = `
text-decoration: underline;
color: ${colorPrimary};
cursor: pointer;
  &:hover {
    opacity: .6;
 }
`;