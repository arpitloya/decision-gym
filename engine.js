
export function applyDecision(state, decision){
  if(state.budget < decision.cost) return state;
  let s={...state}; s.budget -= decision.cost;
  if(decision.immediateEffects){Object.entries(decision.immediateEffects).forEach(([k,v])=>s[k]+=v)}
  if(decision.delayedEffects){s._delayed=(s._delayed||[]).concat(decision.delayedEffects)}
  return s;
}
export function applyDelayedEffects(state){
  if(!state._delayed) return state;
  state._delayed.forEach(e=>Object.entries(e).forEach(([k,v])=>state[k]+=v));
  state._delayed=[]; return state;
}
