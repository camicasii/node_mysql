const express = require('express');
const pool = require('../database')
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('./layouts/index')
})


module.exports = router;