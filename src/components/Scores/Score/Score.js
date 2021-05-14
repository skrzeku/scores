import React from 'react';


const Score = (props)=> {


        let time = props.scores.date.toDate().getMonth();
        console.log(time);

    // const timstamp = time.data() && time.data().created_at && time.data().created_at.toDate();

    return(<div>
        {props.scores.score}
    </div>)
};


export default Score;



