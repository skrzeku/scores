import React from 'react';
import {useSelector} from "react-redux";
import Styled from 'styled-components';
import {colorPrimary} from "../../variables";

const TotalWrapper = Styled.div`
display: flex;
justify-content: space-between;
width: 95%;
margin: 0 auto;
align-items: flex-end;
padding: 0 10px 10px;
`;

const TotalTitle = Styled.h2`
font-size: 50px;
color: ${colorPrimary};
font-weight: bold;
margin-bottom: 0
`;
const TotalMonth = Styled.h3`
font-weight: bold;
display: inline-block;
`;

const TotalSmall = Styled.div`
font-weight: bold;
tex-align: left;
span { 
display: block;
text-align: left;
}

`;

const LeftDays = Styled.span`
display: inline;
font-size: 15px;
margin-left: 10px;

`;


 const Total = () => {
        //Get states
    const Scores = useSelector(state => state.scores);
     const month = useSelector(state => state.month);
     const calendar = useSelector(state => state.calendar[month]);


     const endDate = calendar?.endDate.toDate();
     const today = new Date().getTime();
     const leftDays = Math.ceil((endDate?.getTime() - today)/ (1000*60*60*24));

     const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];



     const currentWeek = new Date().getWeek();

     const countScores = (what)=> {
         return Scores.filter(one => {
             const week = one?.date.seconds ? one.date.toDate().getWeek(): one.date.getWeek();
             const day = one?.date.seconds ? one.date.toDate().getDate(): one.date.getDate();
             return what === 'day' ? week === currentWeek && day === new Date().getDate() : week === currentWeek;

         }).map(score => +score.score)
             .reduce((a,b)=> a + b, 0);

     };

     console.log(countScores(true));



     const todayScore = new Date();
     console.log(todayScore);


    const MonthScore = Scores
        .filter(ont => {
        const date = ont?.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
        return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
    })
        .map(one => +one.score)
        .reduce((a,b)=> a + b, 0);


     return(<TotalWrapper>

         <div>
             <TotalMonth>{months[month] + ' ' + new Date().getFullYear()} </TotalMonth>
             <LeftDays>{leftDays > 0 ? 'Pozostały ' + leftDays + ' dni (' + endDate.toLocaleDateString() + ')': 'Miesiąc zakończony' }</LeftDays>

         </div>


         <TotalTitle>{MonthScore}</TotalTitle>
         <TotalSmall><span>Dziś: {countScores('day')}</span><span>W tym tygodniu: {countScores('week')}</span> </TotalSmall>
         </TotalWrapper>)
};


 export default Total;