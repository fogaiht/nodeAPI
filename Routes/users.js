const express = require('express')
const router = express.Router()
const Users = require('../model/userModel')
// const Pokemons = require('../model/pokemonModel')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) =>{
    try {
        const users = await Users.find({})
        return res.send(users)
    } catch (error) {
        return res.send({error: 'Erro na consulta de usuários' + error})
    }
})

router.post('/findByEmail', (req,res) => {
    const {email} = req.body
    if (!email) return res.send({error: "Dados insuficientes!"})

    Users.findOne({email}, (err, data) => {
        if(err) return res.send({ error: "Erro ao buscar usuário!" })
        if(data) {
            return res.send({message: data})
        }
    })
})

router.post('/create', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.send({error: "Dados insuficientes!"})

    Users.findOne({email}, (err, data) => {
        if(err) return res.send({ error: "Erro ao buscar usuário!" })
        if(data) return res.send({error: "Usuário já registrado!"})
        Users.create(req.body, (err, data) => {
            if(err) return res.send({ error: `Erro ao criar usuário!          ` + err })
            data.password = undefined
            return res.send(data)
        })
    })
})

router.post('/auth',  (req,res) => {
    const {email, password} = req.body
    if (!email || !password) return res.send({error: "Dados insuficientes!"})
    
    Users.findOne({email}, (err, data) => {
        if(err) return res.send({ error: "Erro ao buscar usuário!" })
        if(!data) return res.send({error: "Usuário já registrado!"})

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.send({error: "Erro ao autenticar usuário"})
            data.password = undefined
            return res.send(data)
        })
    }).select('+password')
})

module.exports = router