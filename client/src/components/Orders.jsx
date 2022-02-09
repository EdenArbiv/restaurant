import React, { useEffect, useState } from 'react';

export default function Orders({setupdate, update, userid , setuserid}) {
    const [customersArr, setcustomersArr] = useState([]);
    const [dishArr, setdishArr] = useState([]);


    useEffect(() => {
        (async () => {
          const res = await fetch("http://localhost:1000/customers")
          const data = await res.json();
          setcustomersArr(data);
          console.log(data)
        })();
      }, [])

    useEffect(() => {
        (async () => {
          const res = await fetch(`http://localhost:1000/order/${userid}`)
          const data = await res.json();
          console.log(data)
          setdishArr(data)
        })();
    }, [update, userid])

    const deleteorder = async () => {
        const res = await fetch(`http://localhost:1000/pay/${userid}`,{
            method: "delete",
        })
        const data = await res.json();
        console.log(data);
        setupdate(up => !up)
    }

    const adddish = async (dishid) => {
        const res = await fetch(`http://localhost:1000/order/${userid}`,{
            method: "post",
            headers: {'content-type':'application/json'},
            body:JSON.stringify({dishid}),
        })
        const data = await res.json();
        console.log(data);
        setupdate(up => !up)
    }

    const deletedish = async (dishid) => {
        const res = await fetch(`http://localhost:1000/order/${userid}`,{
            method: "put",
            headers: {'content-type':'application/json'},
            body:JSON.stringify({dishid}),
        })
        const data = await res.json();
        console.log(data)
        setupdate(up => !up)
    }

  return <div className='orders'>
      <h5>select customer:</h5>
      <select onChange={e=> setuserid(e.target.value)}>
        {
            customersArr.map(customer =><option value={customer.id}>{customer.name}</option>)
        }
      </select>
      <ul>
          {
              dishArr.length ? dishArr.map(dish => <li><img className='minimg' src={dish.img}/> {dish.dish}  {dish.price * dish.qt}$ <button onClick={()=> adddish(dish.dishid)}>+</button  > <button onClick={()=> deletedish(dish.dishid)}>-</button> x{dish.qt}</li>) : <h4>No orders yet😕</h4>
          }
          
      </ul>
      <h5 style={{textAlign:"center"}}>The Total Price: {
          dishArr.reduce((prev,cur)=> prev + cur.price * cur.qt, 0) 
    } $</h5>
      <button onClick={deleteorder}>Pay Now</button>
      
  </div>;
}
