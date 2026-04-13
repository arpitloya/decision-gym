
'use client';
import { useState } from 'react';
export default function SimulationClient({ simulation }) {
  const [state,setState]=useState({...simulation.initialState,history:[]});
  const round = simulation.rounds.find(r=>r.round===state.round);
  async function decide(id){
    const res = await fetch('/api/simulation',{method:'POST',body:JSON.stringify({state,decision:simulation.decisions[id]})});
    setState(await res.json());
  }
  async function next(){
    const res = await fetch('/api/simulation',{method:'PUT',body:JSON.stringify({state})});
    const s = await res.json(); setState({...s,round:state.round+1});
  }
  if(!round){
    const score = Object.entries(simulation.scoring.weights).reduce((t,[k,w])=>t+state[k]*w,0);
    return <h2>Final Score: {Math.round(score)}</h2>;
  }
  return (<div style={{padding:30}}><h2>{round.name}</h2><p>Budget: {state.budget}</p>{round.decisionsAllowed.map(d=><button key={d} onClick={()=>decide(d)}>{simulation.decisions[d].name}</button>)}<br/><button onClick={next}>Commit & Next Round</button></div>);
}
