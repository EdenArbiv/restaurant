import React, { useState } from 'react';
import Menu from './components/Menu';
import Orders from './components/Orders';

export default function App() {

  const [update, setupdate] = useState(false);
  const [userid, setuserid] = useState(1);


  return <div  className='resapp'>
    <Menu setupdate={setupdate} userid={userid} />
    <Orders setupdate={setupdate} update={update} userid={userid} setuserid={setuserid} />
  </div>;
}
