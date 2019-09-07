const helpers={ }
const bcrypt = require('bcryptjs')

helpers.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10); //generamos los hash para dar seguridad a nuestro password
    const hash =  await bcrypt.hash(password,salt);
    return hash;
}

helpers.matchPassword = async(password,savedPassword)=>{//desencyptamos la contraceña
    try{
    return await bcrypt.compare(password,savedPassword);
    }catch(e){
         console.log(e);         
     }

}

module.exports = helpers;