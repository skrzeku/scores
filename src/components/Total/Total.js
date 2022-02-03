import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Styled from 'styled-components';
import {colorPrimary} from "../../variables";
import {indexMonth, months} from "../../service";

const TotalWrapper = Styled.div`
display: flex;
justify-content: space-between;
width: calc(100% - 600px);
margin-right: auto;
margin-left: 280px;
align-items: flex-end;
padding: 0 10px 10px;
`;

const TotalTitle = Styled.h2`
font-size: 50px;
color: ${colorPrimary};
font-weight: bold;
margin-bottom: 0
`;
const MonthWrapper = Styled.div`

`;
const TotalMonth = Styled.h3`
font-weight: bold;
display: inline-block;
`;

const TotalSmall = Styled.div`
font-weight: bold;
tex-align: left;
p { 
display: block;
text-align: left;
margin-bottom: 0;
}

`;
const TotalSmallScore = Styled.span`
color: ${colorPrimary}


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
     const year = useSelector(state => state.year);
     const calendars = useSelector(state => state.calendar)
     // const calendar = useSelector(state => state.calendar[month]);
     const calendar = useSelector(state => state.calendar[indexMonth(year, months[month], calendars)]);
     // const year = useSelector(state => state.year);
     const dispatch = useDispatch();

     console.log(year);



     const endDate = calendar?.endDate.toDate();
     console.log(endDate);
     // const today = new Date().getTime();
     const today = new Date();

     const leftDays = Math.ceil((endDate?.getTime() - today.getTime())/ (1000*60*60*24));





     // const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];



     const currentWeek = new Date().getWeek();

     const countScores = (what)=> {
         return Scores.filter(one => {
             const week = one?.date.seconds ? one.date.toDate().getWeek(): one.date.getWeek();
             const day = one?.date.seconds ? one.date.toDate().getDate(): one.date.getDate();
             return what === 'day' ? week === currentWeek && day === new Date().getDate() : week === currentWeek;

         }).map(score => +score.score)
             .reduce((a,b)=> a + b, 0);

     };

     // const today = new Date();
     const currMonth = calendars?.find((one) => {
         const date = today.getTime() >= one.startDate?.toDate().getTime() && today.getTime() <= one.endDate?.toDate().getTime();
         return date;
     });
     useEffect(()=> {
         // const today = new Date();
         // const currMonth = calendars?.find((one) => {
         //     const date = today.getTime() >= one.startDate?.toDate().getTime() && today.getTime() <= one.endDate?.toDate().getTime();
         //     return date;
         // });
         // if (currMonth) {
         //     dispatch({type:'CHANGE_MONTH', month: currMonth?.id});
         //     return false;
         // }

     }, [calendars])


     const getBusinessDatesCount = (start, endDate)=> {
         let count = 0;
         const curDate = new Date(start);
         // console.log(curDate);
         // console.log(endDate);

         // while (curDate <= endDate) {
         //     const dayOfWeek = curDate.getDay();
         //     console.log(dayOfWeek);
         //     if(!(dayOfWeek in [0, 6])) count++;
         //     curDate.setDate(curDate.getDate() + 1);
         // }
         let arr = [];

         while (curDate <= endDate) {
             const dayOfWeek = curDate.getDay();
             if(!((dayOfWeek === 6) || (dayOfWeek === 0))) {
                 arr.push(curDate);
             }
             curDate.setDate(curDate.getDate() + 1);
         }
         // console.log(count);
         // console.log(arr.length);

         return arr.length;
     };

     const leftBussyDays = getBusinessDatesCount(today, endDate);

     // console.log(leftBussyDays);





    const MonthScore = Scores
        .filter(ont => {
        const date = ont?.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
        return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
    })
        .map(one => +one.score)
        .reduce((a,b)=> a + b, 0);


     return(<TotalWrapper>

         <div>
             <TotalMonth>{months[month] + ' ' + year} </TotalMonth>
             <LeftDays>{leftBussyDays > 0 ? '' + leftBussyDays+ ' dni robocze (' + endDate?.toLocaleDateString()  + ')': 'Miesiąc zakończony' }</LeftDays>
         </div>


         <TotalTitle>{MonthScore}</TotalTitle>
         <TotalSmall><p>Dziś: <TotalSmallScore>{countScores('day')}</TotalSmallScore></p><p>W tym tygodniu: <TotalSmallScore>{countScores('week')}</TotalSmallScore></p> </TotalSmall>
         </TotalWrapper>)
};


 export default React.memo(Total);
 // export default Total;