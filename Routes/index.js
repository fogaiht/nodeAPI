const express = require('express');
const router = express.Router();

router.get('/',  (req,res) => {
    return res.send({message: `Tudo OK com o método GET da raíz!`});
});

router.post('/',  (req,res) => {
    return res.send({message: 'Tudo OK com o método POST da raíz!'});
});

module.exports = router;