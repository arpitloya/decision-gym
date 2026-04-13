
import { NextResponse } from 'next/server';
import { applyDecision, applyDelayedEffects } from '../../simulation/[id]/engine';
export async function POST(req){const {state,decision}=await req.json();return NextResponse.json(applyDecision(state,decision));}
export async function PUT(req){const {state}=await req.json();return NextResponse.json(applyDelayedEffects(state));}
