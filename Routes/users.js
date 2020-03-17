const express = require('express')
const router = express.Router()
const Users = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const auth = require('../middlewares/auth')


const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, {expiresIn: config.jwt_expires_in})
}

router.get('/', auth, async (req, res) =>{
    try {
        if(res.locals.auth_data.id == "5e6bf2b30ea1a02d08cea0ad") {
            const users = await Users.find({})
            return res.send(users)
        }else {
            return res.send({error: "Entre com um usuário que possua as permissões necessárias!"})
        }        
    } catch (err) {
        return res.status(500).send({error: 'Erro na consulta de usuários' + err})
    }
})

router.get('/findUserById', auth, async (req,res) => {
    try {        
        const user = await Users.findById({_id: res.locals.auth_data.id})
        return res.status(200).send(user)
    } catch (err) {
        if(err) res.status(500).send({ error: "Usuário não encontrado!" + err})
    }
})


router.post('/addPokemon', auth, async (req,res) => {
    const {pokeNumber} = req.body
    if (!pokeNumber) return res.status(400).send({error: "Dados insuficientes!"})
    try {
        const user = await Users.findById({_id: res.locals.auth_data.id})        
        if(user.pokemonList.includes(config.poke_api_url+pokeNumber))
            return res.status(200).send({error: "Pokemon já adicionado!"}) 
        await Users.findByIdAndUpdate(res.locals.auth_data.id, {$push: {pokemonList: config.poke_api_url+pokeNumber}})
        // const user = await Users.findById({_id: res.locals.auth_data.id})
        return res.status(200).send(user)
    } catch (err) {
        if(err) res.status(500).send({ error: "Erro ao buscar usuário!" + err})
    }
})

router.post('/create', async (req, res) => {
    const { email, password, pokemonList } = req.body

    if (!email || !password || !pokemonList) return res.status(400).send({error: "Dados insuficientes!"})
    
    try {
        if(await Users.findOne({email})) return res.status(400).send({error: "Usuário já registrado!"})
        const user = await Users.create(req.body)
        user.password = undefined
        return res.status(201).send(user)
    } catch (err) {
        if(err) res.status(500).send({ error: "Erro ao buscar usuário!" + err})
    }
})

router.post('/login',  async (req,res) => {
    const {email, password} = req.body
    if (!email || !password) return res.status(400).send({error: "Dados insuficientes!"})

    try {
        const user = await Users.findOne({email}).select('+password')
        if(!user) return res.status(400).send({error: "Usuário não registrado!"})

        const pass_ok = await bcrypt.compare(password, user.password) 

        if(!pass_ok) return res.status(401).send({error: "Senha incorreta!"})

        user.password = undefined
        return res.send({user, token: createUserToken(user.id)});
    } catch (err) {
        return res.status(500).send({ error: "Erro ao buscar usuário!     " + err})
    }
})

module.exports = router


/*

200 - OK
201 - Created
202 - Accepted

400 - Bad request
401 - Unauthorized              -- AUTENTICAÇÃO -- Caráter Temporário (Ex: Token expirado)
403 - Forbidden                 -- AUTORIZAÇÃO  -- Caráter Permanente (Ex: User não autorizado)
404 - Not Found

500 - Internal server error
501 - Not implemented           -- Serviço inexistente
503 - Service Unavailable       -- Serviço indisponível

*/ 