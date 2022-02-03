import React from "react";
import Styled from "styled-components";
import {tabName} from "../variables";

const Tabname = Styled.h2`
${tabName};
display: block;
`;


export const TabName = ({title})=> {
    return(<>
        <Tabname><span>{title}</span></Tabname>
    </>)
}

