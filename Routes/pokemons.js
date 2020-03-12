// const express = require('express')
// const router = express.Router()
// const Pokemons = require('../model/pokemonModel')

// router.get('/', async (req, res) =>{
//     try {
//         const users = await Users.find({})
//         .populate('pokemonList')
//         .exec()
//         return res.send(users)
//     } catch (error) {
//         return res.send({error: 'Erro na consulta de usuários' + error})
//     }
// })

// router.get('/',  (req, res) => {
//     Pokemons.find({})
//     .select()
//     .exec()
//     .then(docs => {

//     })


//     try {
//         const pokemons = await Pokemons.find({})
//             .select()
//             .exec()
//         return res.send(pokemons)
//     } catch (error) {
        
//     }
    
    
    
    
// })

// router.post('/addPokemon',  (req,res) => {
//     const { pokeNumber } = req.body

//     if (!pokeNumber) return res.send({error: "Dados insuficientes!"})

//     Pokemons.findOne({pokeNumber}, (err, data) => {
//         if(err) return res.send({ error: "Erro ao buscar pokemon!" })
//         if(data) {
//             return res.send({error: "Pokemon já registrado!"})
//         }

//         Pokemons.create(req.body, (err, data) => {            
//             if(err) return res.send({ error: `Erro ao criar pokemon!` + err })
//             return res.send(data)
//         })
//     })
// })

// router.post('/registerPokedex', (req,res) => {

// })

// module.exports = router