const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const config = require('../config/config')

const UserSchema = new Schema({
    email:  {type: String, required: true, unique: true, lowercase: true},
    password:  {type: String, required: true, select: false},
    pokemonList: {
        type: Array, required: true
    },
    created:  {type: Date, default: Date.now},
});

UserSchema.pre('save',  async function(next) {
    let user = this;
    if (!user.isModified('password')) return next()

    user.pokemonList =  await user.pokemonList.map(obj => {
        return obj = config.poke_api_url + obj
    })

    user.password = await bcrypt.hash(user.password, 10)
    return next()   
})

module.exports = mongoose.model('User', UserSchema);