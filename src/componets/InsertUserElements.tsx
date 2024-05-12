/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './css files/InsertUserElements.css';

interface InsertProps{
    provider_auth_token:string;
    provider:string;
}

const InsertUserElements:React.FC<InsertProps> =(Props)=> {
  return (
    <div className='insert-container'>
        <span>{Props.provider_auth_token}</span>
    </div>
  )
}

export default InsertUserElements