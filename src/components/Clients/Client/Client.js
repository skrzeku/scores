import React, {useEffect} from 'react';
import {useParams} from "@reach/router";
import {TabName} from "../../../template-parts/TabName";
import Styled from 'styled-components';
import {colorPrimary, sendBtn} from "../../../variables";
import {useSelector} from "react-redux";
import ClientTable from "./ClientTable";
import {types} from "../../../service";
import ClientNotes from "./ClientNotes";
import {Button} from "@material-ui/core";
import firebase from "../../../firebase";
import {fetchNotes} from "../../../actions";



const ClientDataRow = Styled.div`
display: flex;
max-width: 1400px;
text-align: center;
margin: 120px auto 30px;
border-bottom: solid 1px ${colorPrimary};
justify-content: space-between;
padding-bottom: 10px;
align-items: flex-end;
`;
const AddNoteBtn = Styled.button`
${sendBtn};
`;

const ClientName = Styled.h3`
font-weight: bold;
margin-bottom: 0;
`;

const TypesToSell = Styled.div`
display: flex;
max-width: 900px;
margin: 0 auto;
justify-content: center;
flex-flow: row wrap;
p {
padding: 5px 10px;
margin-bottom: 0;
}
`;

const TypesToSellTitle = Styled.h2`
font-weight: 600;
margin-top: 60px;
i {
font-size: 60px;
color: ${colorPrimary};
}
`;





const Client = ()=> {
    const {id} = useParams();
    const db = firebase.firestore();

    const client = useSelector(state => state.clients?.find(one => one?.Symbol === id));
    const clientScores = useSelector(state => state.scores?.filter(one => one.client === id));

    // const oneClient = client.find(one => one.Symbol === id);


    const clientScoresTypes = clientScores.map((score)=> score.type);

    const whatToSell = types.map((type)=> {
        if (!clientScoresTypes.includes(type))  {
            return type
        }
    }).filter(m => m);

    console.log(whatToSell);



    console.log(clientScores);




    return (<>
        <TabName title={'Dane Klienta'}/>
        <ClientDataRow>
        {
            client ? (
                <>
                <div>
                    {client?.Symbol}
                </div>
                <ClientName>
                    {client?.Nazwa}
                </ClientName>
                <div>
                    NIP: {client?.NIP}
                </div>
                </>
           )
                :
                (<ClientName>Brak klienta w bazie</ClientName>)
        }
        </ClientDataRow>

        <ClientTable client={client} id={id} />
        <TypesToSellTitle>Co jeszcze można sprzedać? <i className="las la-hand-holding-usd"></i></TypesToSellTitle>
        <TypesToSell>
            {
                whatToSell.map((type)=> {
                   return(<p>{type}</p>)
                })
            }
        </TypesToSell>


        <ClientNotes/>


    </>)
}


export default Client;