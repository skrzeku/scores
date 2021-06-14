import React from 'react';
import {useSelector} from "react-redux";




const Minuses = (props)=> {


  const minuses = useSelector(state => state.minuses);


  const MonthMinuses = minuses.filter((one)=> one.employee === props.id);

  console.log(minuses);
  return(<td>{
    MonthMinuses.map((one)=> {
      console.log(one);
      one.minus.map((min)=> {
        return(<p>{min}</p>)
      });

    })
  }</td>)
};



export default Minuses;