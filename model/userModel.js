const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const fetch = require("node-fetch");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  pokemonList: {
    type: Array,
    required: true
  },
  created: { type: Date, default: Date.now }
});

UserSchema.pre("save", async function(next) {
  let user = this;
  if (!user.isModified("password")) return next();
  user.pokemonList = await user.pokemonList.map(obj => {
    return (obj = config.poke_api_url + obj);
  });
  // console.log(user.pokemonList)

  async function getTodos() {
    const promises = user.pokemonList.map(async (url, idx) => {
      const response = await fetch(url);
      url = await response.json();
      user.pokemonList[idx] = url;
    });

    await Promise.all(promises);

    user.pokemonList = user.pokemonList.map(
      ({ id, sprites, stats, types, weight, name, height }) => ({
        id,
        sprites,
        stats,
        types,
        weight,
        name,
        height
      })
    );

    console.log("Finished!");
  }
  await getTodos();
  user.password = await bcrypt.hash(user.password, 10);
  return next();
});

module.exports = mongoose.model("User", UserSchema);
