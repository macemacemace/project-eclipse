const cors = require(`cors`)
const express = require(`express`)

const app = express()

app.use(cors({
    origin: ['https://localhost:5500', `http://127.0.0.1:5500`]
}))
app.get(`/`, (req, res) => {
    res.send(`hello`)
    

})

app.get(`/about`, (req,res) =>{
    res.send(`This is about the page`)
})

app.get(`/products`, (req,res)=>{
    res.json([
        {id: 1, name: `laptop`, price: 1000},
        {id: 111, name: `lol`, price: 10222201}
    ])
})

app.get(`/products/:id`, (req,res)=> {
    const id = Number(req.params.id)

    const products = [
        {id: 1, name: `laptop`, price: 1000},
        {id: 111, name: `lol`, price: 10222201}
    ]

    const neededProduct = products.find((product) => product.id === id)
    res.json(neededProduct);
    
})

app.get(`/message`, (req,res)=>{
    res.json({message:"hello from back end"})
})




app.listen(3000);