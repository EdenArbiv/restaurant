import React, { useEffect, useState } from 'react';
import Dish from './Dish';

export default function Menu({ setupdate, userid}) {

    const [menuArr, setmenuArr] = useState([]);

    useEffect(() => {
        (async () => {
          const res = await fetch("http://localhost:1000/menu")
          const data = await res.json();
          setmenuArr(data);
          console.log(data);
        })();
      }, []);
    
  return <div className='menu'>
      {
          menuArr.map(dish => <Dish key={dish.id} dish={dish} setupdate={setupdate} userid={userid} />)
      }
  </div>;
}
