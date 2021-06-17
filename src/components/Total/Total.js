import React from 'react';
import {useSelector} from "react-redux";



 const Total = () => {
        //Get states
    const Scores = useSelector(state => state.scores);
     const month = useSelector(state => state.month);
     const calendar = useSelector(state => state.calendar[month]);


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


    return(<div>{MonthScore} W tym tygodniu: {countScores('week')} Dziś sprzedano: {countScores('day')}</div>)
};


 export default Total;