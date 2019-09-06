const express = require('express');
const pool = require('../database')
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('./layouts/index')
})

router.get('/signup', async(req,res)=>{       

    await pool.query('ALTER TABLE links AUTO_INCREMENT = 1')//reinicial id de la base de datos a 1
    console.log("paso");
    
    res.redirect("/links/")
    
})
module.exports = router;