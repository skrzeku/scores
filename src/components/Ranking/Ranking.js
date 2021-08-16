import React, {Fragment, useState} from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";
import {colorPrimary, globalTitle, tabName} from "../../variables";
import {MenuItem, Select} from "@material-ui/core";
//Styles


const PodriumNumber = Styled.span`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translatey(-50%);
     font-size: 50px;
     font-weight: bold;
    
                 color: ${colorPrimary};

    `;
const PodriumName = Styled.span`
    display: block;
    text-align: center;    
     font-weight: bold;
     position: absolute;
     top: -35px;
     font-size: 20px;
     left: 0;
     width: 100%;
     text-align: center;
    `;


const RankingRow = Styled.div`
display: flex;
text-align: left;
width: 600px;
margin: 0 auto;
align-items: center;
    &:last-child {
    margin-bottom: 50px;
    }
`;

    const RankingName = Styled.p`
    width: 200px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 0;
    margin-left: 30px;
    `;

    const RankingPlace = Styled.span`
    width: 70px;
    `;



const Title = Styled.div`
${globalTitle}
margin-bottom: 20px;
`;

const TabName = Styled.h2`
${tabName}
`;

const NameWrapper = Styled.div`
display: flex;
width: 65%;
margin: 0 auto;
justify-content: space-between;
`;

const SelectWrapper = Styled.div`
text-align: center;
input, div {
min-width: 130px;
}
`;






const Ranking = (props)=> {

    const Podium = Styled.div`
    // position: ${!props.showAll && 'absolute'};
    // left: ${!props.showAll && '50%'};
    // transform: ${!props.showAll && 'translateX(-50%)'};
    // bottom: ${!props.showAll && '0px'};
  
    
    display: flex;
    filter: drop-shadow(0 3px 8px rgba(0,0,0,0.37));
    width: 500px;
    align-items: flex-end;
    margin: 100px auto 50px;  
        div {
        flex: 1;
        position: relative;
        height: 100px;
          background-color: white;
            &:nth-child(2) {
            height: 120px;
            border-left: solid 1px lightgray;
            border-right: solid 1px lightgray;
            }
             &:nth-child(3) {
            height: 80px;
           
        }
    `;

    //Getting from redux store
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);

    const storeMonth = useSelector(state => state.month);

    //local state
    const [month, setMonth] = useState(storeMonth);
    const calendar = useSelector(state => state.calendar[month]);

    const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];


    const podium = [2, 1, 3];






    const monthScores = [...employees].map((one)=>{
        return scoresAll
            .filter((score)=> score.employee == one.id)
            .filter((ons)=> {
                const date = ons.date.seconds ? ons.date.toDate().getTime() : ons.date.getTime();
                return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
            })
            .reduce((a,b)=> {
                return {id: one.id, sum: +a.sum + +b.score, name: one.name + ' ' + one.lastname[0] + '.'}
            }, {id: one.id, sum: 0, name: one.name + ' '+ one.lastname[0] + '.'})
    });

    const sortedScores =  monthScores.sort((a, b) => (a.sum < b.sum) ? 1 : -1);

    return(<React.Fragment>
        {
            props.showAll &&   <div>  <TabName><span>Ranking</span></TabName><NameWrapper>
                <Title>{months[month] + ' 2021'} </Title>
                <SelectWrapper>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={month}
                        value={month}
                        onChange={event => setMonth(event.target.value)}
                    >
                        {months.map((option, index) => (
                            <MenuItem key={index} value={index}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </SelectWrapper>
            </NameWrapper></div>

        }




        <Podium>
            {
                podium.map((place, index)=> {
                    return(<div key={index}><PodriumNumber>{place}</PodriumNumber><PodriumName>{sortedScores[place - 1]?.name}</PodriumName> {sortedScores[place - 1]?.sum} </div>)
                })
            }

        </Podium>

        {
            props.showAll &&

            sortedScores.map((one, index)=> {
                return (<RankingRow><RankingPlace>{index + 1}</RankingPlace><RankingName>{one.name}</RankingName> <span>{one.sum}</span></RankingRow>)
            })
        }
    </React.Fragment>)

};



export default Ranking;