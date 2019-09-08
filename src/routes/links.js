const express = require('express');
const router = express.Router();

const pool = require('../database')
const helpers = require('../lib/handlebars')
const {isLoggedIn} =require('../lib/auth');

router.get('/add',isLoggedIn,(req,res)=>{  
    
    
    res.render('links/add')

})

router.post('/add',isLoggedIn,async(req,res)=>{
    
    
    const {title, url, description} = req.body;
    const newLink ={
        title,
        url,
        user_id:req.user.id,
        description
        
        

    }
    
    

    //enviamos los datos a la base de datos a traves de 
    await pool.query('INSERT INTO links set?',[newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links/')
})

router.get('/',isLoggedIn,async(req,res)=>{
    
    try{
    
    
        const result = await pool.query('SELECT * FROM users WHERE username = ?',"camicasii2")       
       
        console.log(result);
        
        
        
    
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id])
    if(links[0] === undefined ||links[0] === null ){
        console.log(links);
        res.render('./links/list',links)
    }
    else if(links.length>0){
        console.log(links);
        
        res.render('./links/list',{links})    
    }
    
    }
    catch{
        console.log("error");
        
    }
})

router.get('/delete/:id',isLoggedIn, async(req,res)=>{
    
    const {id} = req.params;

    await pool.query('DELETE FROM links WHERE ID = ?',[id])

    req.flash('success', 'Link Removed successfully');
    res.redirect("/links/")
    
})
router.get('/edit/:id',isLoggedIn, async(req,res)=>{    
    const {id} = req.params;         
    const link = await pool.query('SELECT * FROM links WHERE id = ?',id)             
    res.render('./links/edit',{link: link[0]})    
})

router.post('/edit/:id',isLoggedIn, async(req,res)=>{
    const {id}  = req.params;         
    const {title, url, description} = req.body;
    const newLink ={
        title,
        url,
        description        
    }
    await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id])
    req.flash('success', 'Link Updated successfully');
    res.redirect("/links/")
})



module.exports = router;