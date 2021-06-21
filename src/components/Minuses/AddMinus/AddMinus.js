import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import firebase from "../../../firebase";




const AddMinus = ()=> {

    //get states
    const employees = useSelector(state => state.employees);
    const myminuses = useSelector(state => state.minuses);
    const[employee, setEmployee] = useState(employees[0]?.id);
    const [number, setNumber] = useState(0);
    const [client, setClient] = useState('');


    const db = firebase.firestore();
    const dispatch = useDispatch();


    const addMinuses = () => {
      const newMinuse = {
          minus: number,
          employee: +employee,
          date: new Date(),
          client: client
      };

        db.collection('minuses').add(newMinuse).then(()=> {
            dispatch({type:'ADD_MINUSES', minuses: myminuses, minuse: newMinuse});
        });
    };

    const handleChange = (tags)=> {
      setNumber(tags);
      console.log(myminuses);
    };

    console.log(number);


    return(<div>
        <form>
            <select onChange={event => setEmployee(event.target.value)}>

                {
                    employees.map((one, index) => {
                        return (<option value={one.id} key={one.id}>{one.name + ' ' + one.lastname}</option> )
                    })
                }
            </select>
            {/*<TagsInput value={number} onChange={handleChange}/>*/}
            <input type="number" onChange={event => setNumber(event.target.value)} value={number}/>
            <input type="text" onChange={event => setClient(event.target.value)} value={client}/>
        </form>
        <button onClick={addMinuses}>Dodaj minusy</button>

    </div>)
};



export default AddMinus;