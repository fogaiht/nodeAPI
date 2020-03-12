const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email:  {type: String, required: true, unique: true, lowercase: true},
    password:  {type: String, required: true, select: false},
    pokemonList: [{
        type: String,
    }],
    created:  {type: Date, default: Date.now},
});

UserSchema.pre('save',  function(next) {
    let user = this;
    if (!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted
        return next()
    })    
   user.pokemonList =  user.pokemonList.map(obj => {
        return obj = "https://pokeapi.co/api/v2/pokemon/" + obj
    })
})
module.exports = mongoose.model('User', UserSchema);