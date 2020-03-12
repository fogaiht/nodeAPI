// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const PokemonSchema = new Schema({
//     _id: Schema.Types.ObjectId,
//     pokeNumber:  {type: Number,},
//     urlPokemon:  {type: String, default: "https://pokeapi.co/api/v2/pokemon/"},
//     registeredAt:  {type: Date, default: Date.now},
// });

// PokemonSchema.pre('save',  function(next) {
//     let pokemon = this;
//     pokemon.urlPokemon += `${pokemon.pokeNumber}/`
//     return next()
// })

// module.exports = mongoose.model('Pokemon',  PokemonSchema);