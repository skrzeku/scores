import React, {useState} from 'react';
import {colorPrimary, GlobalTitle} from "../../../variables";
import {Button} from "@material-ui/core";
import ClientNoteForm from "./ClientNoteForm";
import {useSelector} from "react-redux";
import {useParams} from "@reach/router";
import CreateIcon from '@material-ui/icons/Create';
import RateReviewIcon from '@material-ui/icons/RateReview';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Styled from 'styled-components';


import {clients} from "../../../reducers/clients";
const Note = Styled.div`
border-bottom: solid 1px #D3D3D3;
padding: 20px 0;
max-width: 1400px;
margin: 0 auto;
display: flex;
justify-content: space-between;
svg {
color: ${colorPrimary};
margin-right: 10px;
font-size: 30px;
}
p {
margin-bottom: 0;
font-weight: bold;
}
`;

const NoteTxt = Styled.p`
// margin-left: 40px;
line-height: 1.7;
font-weight: 400 !important;
`;

const NotesWrapper = Styled.div`
margin-bottom: 40px;
`;



const ClientNotes = ()=> {

    const [shownForm, showForm] = useState(false);
    const [note, setCurrentNote] = useState(null);
    const {id} = useParams();

    const notes = useSelector(state => state.notes?.filter(one=> one.client === id));
    const employees = useSelector(state => state.employees);
    const user = useSelector(state => state.user);

    console.log(notes);

    const closeForm = ()=> {
        showForm(false);
        setCurrentNote(null);
    }
    const findEmployee = (id)=> {
        const correctEmployee = employees?.find(employee => employee.id === id);
        return correctEmployee.name + ' ' +correctEmployee.lastname;
    }

    const showEditForm = (note)=> {
        setCurrentNote(note);
        showForm(true);
    }




return(
    <div>
        <GlobalTitle>Notatki</GlobalTitle>



        <NotesWrapper>
            {notes.map((note)=> {
                return(<Note>
                    <p><RateReviewIcon/>{note.date.seconds ? note.date.toDate().toLocaleDateString() : note.date.toLocaleDateString()}<span> | {findEmployee(note.employee)}</span></p>

                    <NoteTxt>"{note.text}"</NoteTxt>
                    {
                        user &&  <Button
                            variant="text"
                            onClick={()=> showEditForm(note)}

                        ><EditIcon/>Edytuj</Button>
                    }

                </Note>)
            })}

        </NotesWrapper>
        {
            user &&     <Button
                variant="contained"
                color="primary" onClick={()=> showForm(true)}>Dodaj notatkę<AddIcon/></Button> }
        {
            shownForm &&  <ClientNoteForm note={note} onClose={()=> closeForm()}/>
        }
    </div>
)
}


export default ClientNotes;