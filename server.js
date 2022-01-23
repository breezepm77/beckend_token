const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const fs = require('fs')
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use(cors())

app.post('/login', (req, res) => {
    fs.readFile(path.resolve(__dirname, './users.json'), (err, data) => {
        if(err) throw err
        let arr = JSON.parse(data)

        const token = jwt.sign(req.body, 'SECRET_KEY')

        arr.push(req.body)

        fs.writeFile(path.resolve(__dirname, './users.json'), JSON.stringify(arr, null, 4), (err) => {
           if(err) throw err
           res.send(token)
        })
    })
})

app.listen(8000, console.log(8000))