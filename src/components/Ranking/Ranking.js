import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";
import {colorPrimary} from "../../variables";
//Styles
const Podium = Styled.div`
    display: flex;
    filter: drop-shadow(0 3px 8px rgba(0,0,0,0.37));
    width: 500px;
    align-items: flex-end;
    margin: 50px auto;  
        div {
        flex: 1;
        position: relative;
        height: 80px;
          background-color: white;
            &:nth-child(2) {
            height: 120px;
            border-left: solid 1px lightgray;
            border-right: solid 1px lightgray;
            }
             &:nth-child(3) {
            height: 100px;
           
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
                 color: ${colorPrimary};

    `;
const PodriumName = Styled.span`
    display: block;
    text-align: center;    
     font-weight: bold;
     position: absolute;
     top: -25px;
     left: 0;
     width: 100%;
     text-align: center;
    `;






const Ranking = ()=> {

            //Getting from redux store
    const scoresAll = useSelector(state => state.scores);
    const month = useSelector(state => state.month);
    const employees = useSelector(state => state.employees);
    const calendar = useSelector(state => state.calendar[month]);


    const endDate = calendar?.endDate.toDate();
    const today = new Date().getTime();
    const leftDays = Math.ceil((endDate?.getTime() - today)/ (1000*60*60*24));
    console.log(today);
    const podium = [2, 1, 3];






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
        <h3>{leftDays > 0 ? 'Do końca pozostało ' + leftDays + ' dni (' + endDate.toLocaleDateString() + ')': 'Miesiąc zakończony' }</h3>
        <Podium>
            {
                podium.map((place, index)=> {
                    return(<div key={index}><PodriumNumber>{place}</PodriumNumber><PodriumName>{sortedScores[index]?.name}</PodriumName> {sortedScores[index]?.sum} </div>)
                })
            }

        </Podium>
        </React.Fragment>)

};



export default Ranking;