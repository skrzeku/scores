import React, {useState} from 'react';
import {navigate, useParams} from "@reach/router";
import {useSelector} from "react-redux";
import {TabName} from "../../template-parts/TabName";
import Styled from "styled-components";
import {colorPrimary, GlobalTitle, Table} from "../../variables";
import {TextField} from "@material-ui/core";

const ClientsContainer = Styled.div`
margin-top: 80px;
`;

const ClientLink = Styled.p`
cursor: pointer;
text-align: left;
animation: showBg 1s;
    &:hover {
    color: ${colorPrimary};
    }
`;

const ClientLinksWrapper = Styled.div`
max-width: 900px;
margin: 0 auto;


padding: 0 15px;
// transition: 0.3s all ease;
`;




const Clients = ()=> {

    const {id} = useParams();
    const clients = useSelector(state => state.clients);
    const [inputValue, updateInputValue] = useState('');




    //store
    const allScores = useSelector(state => state.scores);
    const Employees = useSelector(state => state.employee);
    console.log(id);
    const currentEmployee = (id)=> {
        return Employees.find((employee) => employee.id === id );
    }

    const navigateToClient = (id) => {
        navigate('/client/' + id);
    };

    const headArray = ['l.p.', 'Wynik', 'Typ','Pracownik', 'Data'];
    console.log(useSelector(state => state.clients));

    const clientScores = allScores.filter((score)=> {
      return score.client === +id;
    });

    const filteredClients = clients.filter((client)=> {
       if (inputValue.length >= 3) {
            return client.Symbol.includes(inputValue) || client.Nazwa.toLowerCase().includes(inputValue.toLowerCase());
       }
     // return   inputValue.length > 3 && client.Symbol.contains(inputValue);

    })

    console.log(filteredClients);



    const scoreTable = clientScores.map((one, index)=> {
        return (<tr>
            <td>{index + 1}</td>
            <td>{one.score}</td>
            <td>{one.type}</td>
            <td>{currentEmployee(one.employee).name}</td>
            <td>{one.date.toDate().toLocaleDateString()}</td>
        </tr>)
    });

    return(<div>
        <TabName title={'Klienci'}/>
        <ClientsContainer>
        <div>
            <form>
                <GlobalTitle>Szukaj</GlobalTitle>
                <TextField label="Szukaj klienta..." type="text" onChange={event => updateInputValue(event.target.value) }/>
            </form>
        </div>
            <ClientLinksWrapper>
                <GlobalTitle>Wyniki wyszukiwania</GlobalTitle>
                {
                    filteredClients.map((client)=> {
                        return (<ClientLink key={client.Symbol} onClick={()=> navigateToClient(client.Symbol)}>{client.Symbol} | {client.Nazwa}</ClientLink>)
                    })
                }

            </ClientLinksWrapper>
            {/*<table>*/}
            {/*    <thead>*/}
            {/*    {*/}
            {/*        headArray.map((one)=> {*/}
            {/*            return(<th>*/}
            {/*                {one}*/}
            {/*            </th>)*/}
            {/*        })*/}
            {/*    }*/}
            {/*    </thead>*/}
            {/*</table>*/}
        </ClientsContainer>

    </div>)

}

export default Clients;