import React from 'react';


const Score = (props)=> {

        //timestamp format
        let time = props.scores.date.seconds ? props.scores.date.toDate().getMonth() : new Date(props.scores.date).getMonth();
        console.log(time);

    // const timstamp = time.data() && time.data().created_at && time.data().created_at.toDate();

    return(<div>
        {props.scores.score}
    </div>)
};


export default Score;



