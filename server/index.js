const exp = require('express')
const cors = require('cors')
const { SQL } = require('./dbconfig')

const app = exp()


app.use(exp.json())
app.use(cors())

app.get('/menu',async (req, res)=> {
    try {
        const menu = await SQL('SELECT * FROM menu')
        console.table(menu) //תצוגת טבלה בטרמינל
        res.send(menu)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})
app.get('/customers',async (req, res)=> {
    try {
        const customers = await SQL('SELECT * FROM customers')
        console.table(customers) //תצוגת טבלה בטרמינל
        res.send(customers)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})
app.get('/order/:userid',async (req, res)=> {
    try {
        const orders = await SQL(`SELECT customers.name as customer ,
        customers.membership,
        menu.name as dish ,
        menu.price ,
        menu.img ,
        qt ,
        dish_id as dishid,
        created
         FROM orders
         INNER JOIN customers on orders.user_id = customers.id
         INNER JOIN menu on orders.dish_id = menu.id
         WHERE orders.user_id = ${req.params.userid}`)
         
         console.table(orders)
         res.send(orders)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})
app.post('/order',async (req, res)=> {
    try {
        const {userid , dishid} = req.body
        if(!userid || !dishid){
            return res.status(400).send({err:"missing info"})
        }

        const exist = await SQL(`SELECT * FROM orders WHERE user_id = ${userid} AND dish_id = ${dishid}`)
        if(!exist.length){
         
            await SQL(`INSERT INTO orders (user_id, dish_id)
            VALUES (${userid} , ${dishid})`)
        }else{
          
            await SQL(`UPDATE orders
            SET qt = qt+1 
            WHERE user_id = ${userid} AND dish_id = ${dishid}`)
        }

        res.send({msg:'order created'})
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.post('/order/:userid',async (req, res)=>{
    try {
        const {userid} = req.params
        const {dishid} = req.body
        if(!userid || !dishid){
            return res.status(400).send({err:"missing info"})
        }   
        await SQL(`UPDATE orders
        SET qt = qt+1 
        WHERE user_id = ${userid} AND dish_id = ${dishid}`)
        
        res.send({msg:'order update'})
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.put('/order/:userid',async (req, res)=>{
    try {
        const {userid} = req.params
        const {dishid} = req.body
        if(!userid || !dishid){
            return res.status(400).send({err:"missing info"})
        }   
        const exist = await SQL(`SELECT qt FROM orders WHERE user_id = ${userid} AND dish_id = ${dishid}`)
       
        console.log(exist[0].qt);
        if(exist[0].qt == 1){
            console.log("blah");
            await SQL(`DELETE FROM orders
            WHERE user_id = ${userid} AND dish_id = ${dishid}`)
        }else{ 
            console.log("not");
            await SQL(`UPDATE orders
            SET qt = qt-1 
            WHERE user_id = ${userid} AND dish_id = ${dishid}`)
        }
        res.send({msg:'order update'})
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.delete('/pay/:userid',async (req, res)=> {
    try {
        await SQL(`DELETE FROM orders WHERE user_id = ${req.params.userid}`)
        res.send({msg:'payment accepted'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.listen(1000 , () => console.log("rocking'1000") )