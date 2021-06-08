import React from 'react';
import {useSelector} from "react-redux";






const Ranking = ()=> {

            //Getting from redux store
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
                return {id: one.id, sum: +a.sum + +b.score, name: one.name + ' ' + one.lastname}
            }, {id: one.id, sum: 0, name: one.name + one.lastname})
    });


    console.log(monthScores);
    const sortedScores =  monthScores.sort((a, b) => (a.sum < b.sum) ? 1 : -1);
    console.log(sortedScores);

    return(<div><h3>Najlepsi w miesiącu</h3>
    <div>Pierwszy : {sortedScores[0]?.name} {sortedScores[0]?.sum} </div>
    <div>Drugi : {sortedScores[1]?.name} {sortedScores[1]?.sum} </div>
    <div>Trzeci : {sortedScores[2]?.name} {sortedScores[2]?.sum} </div>
    </div>)
};



export default Ranking;