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
`;


export const formInner =`
width: 600px;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
animation: .5s rollout;
position: relative;
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
padding: 5px 30px;
text-transform: uppercase;
`;