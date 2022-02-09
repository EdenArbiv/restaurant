import React from 'react';

export default function Dish({dish, setupdate, userid}) {

    const neworder = async (dishid) => {
        const res = await fetch(`http://localhost:1000/order`,{
            method: "post",
            headers: {'content-type':'application/json'},
            body:JSON.stringify({userid , dishid}),
        })
        const data = await res.json();
        console.log(data);
        setupdate(up => !up)
    }

  return <div className='dish'>
      <img src={dish.img} alt="image" />
      <h4>{dish.name}</h4>
      <h4>{dish.price}$</h4>
      <button onClick={() => neworder(dish.id)}>Add to order</button>
  </div>
}
