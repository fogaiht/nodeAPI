const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    email:  {type: String, required: true, unique: true, lowercase: true},
    password:  {type: String, required: true, select: false},
    pokemonList: [{
        type: String,
    }],
    created:  {type: Date, default: Date.now},
});

UserSchema.pre('save',  async function(next) {
    let user = this;
    if (!user.isModified('password')) return next()

    user.pokemonList =  await user.pokemonList.map(obj => {
        return obj = "https://pokeapi.co/api/v2/pokemon/" + obj
    })

    user.password = await bcrypt.hash(user.password, 10)
    return next()   
})

module.exports = mongoose.model('User', UserSchema);