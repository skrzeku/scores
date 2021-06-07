import React from 'react';
import {useSelector} from "react-redux";






const Ranking = ()=> {


    const scoresAll = useSelector(state => state.scores);

    const month = useSelector(state => state.month);

    const employees = useSelector(state => state.employees);

    const calendar = useSelector(state => state.calendar[month]);


    const monthScores = [...employees].map((one)=>{
        return scoresAll
            .filter((score)=> score.employee == one.id)
            .filter((ons)=> {
                const date = ons.date.seconds ? ons.date.toDate().getTime() : ons.date.getTime();
                return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
            })
            .reduce((a,b)=> {
                return {id: one.id, sum: +a.sum + +b.score}
            }, {id: one.id, sum: 0})
            // .reduce((n, {score}) => {
            //     return +n + +score
            // }, 0)
            // .reduce((a, b)=> {
            //         // const obj = {
            //         //     id: one.id,
            //         //     sum: {...a.score} + +b.score
            //         // };
            //     a[b.id] = one.id;
            //     a[b.sum] = +a.sum + +b.score;
            //         return a;
            //     }, {})

            // .map((oni, index)=> oni.score)
            // .reduce((a, b)=> {
            //     return +a + +b
            //
            // }, 0)
            // .map((obj)=> {
            //     return {
            //         score: obj,
            //         id: one.id
            //     }
            // })

    });



    console.log(monthScores);

    // const sortedScores =  monthScores.sort();
    // console.log(sortedScores);

    return(<div>Siema</div>)
};



export default Ranking;