const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/', auth,  (req,res) => {
    console.log(res.locals.auth_data)
    return res.send({message: `Tudo OK com o método GET da raíz!`});
});

router.post('/',  (req,res) => {
    return res.send({message: 'Tudo OK com o método POST da raíz!'});
});

module.exports = router;