import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";







const Ranking = ()=> {

            //Getting from redux store
    const scoresAll = useSelector(state => state.scores);
    const month = useSelector(state => state.month);
    const employees = useSelector(state => state.employees);
    const calendar = useSelector(state => state.calendar[month]);


    const endDate = calendar?.endDate.toDate().getTime();
    const today = new Date().getTime();
    const leftDays = Math.floor((endDate - today)/ (1000*60*60*24));

    //Styles
    const Podium = Styled.div`
    display: flex;
    filter: drop-shadow(0 3px 8px rgba(0,0,0,0.37));
    width: 500px;
    align-items: flex-end;
  
        div {
        flex: 1;
        position: relative;
        height: 80px;
          background-color: white;
           color: #C0C0C0;
            &:nth-child(2) {
            height: 120px;
            border-left: solid 1px lightgray;
            border-right: solid 1px lightgray;
            color: #FFD700;
            }
             &:nth-child(3) {
            height: 100px;
            color: #cd7f32;
           
        }
    `;

    const PodriumNumber = Styled.span`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translatey(-50%);
     font-size: 50px;
     font-weight: bold;
      -webkit-text-stroke: 1px black;
    `;




    const monthScores = [...employees].map((one)=>{
        return scoresAll
            .filter((score)=> score.employee == one.id)
            .filter((ons)=> {
                const date = ons.date.seconds ? ons.date.toDate().getTime() : ons.date.getTime();
                return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
            })
            .reduce((a,b)=> {
                return {id: one.id, sum: +a.sum + +b.score, name: one.name + ' ' + one.lastname}
            }, {id: one.id, sum: 0, name: one.name + one.lastname})
    });


    console.log(monthScores);
    const sortedScores =  monthScores.sort((a, b) => (a.sum < b.sum) ? 1 : -1);
    console.log(sortedScores);

    return(<React.Fragment>
        <h3>Do końca miesiąca pozostało: {leftDays} dni ()</h3>
        <Podium>
            <div><PodriumNumber>2</PodriumNumber>{sortedScores[0]?.name} {sortedScores[0]?.sum} </div>
            <div><PodriumNumber>1</PodriumNumber>{sortedScores[1]?.name} {sortedScores[1]?.sum} </div>
            <div> <PodriumNumber>3</PodriumNumber>{sortedScores[2]?.name} {sortedScores[2]?.sum} </div>
        </Podium>)
        </React.Fragment>)

};



export default Ranking;