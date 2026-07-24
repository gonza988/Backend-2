import {userModel} from '../models/user.model.js'
import {generateToken} from '../utils/jwt.js'

export const register = async(req, res)=>{
    const { first_name, last_name, email , age , password}= req.body;   

    if(!first_name || last_name || email || age || password){
        return res.status(400).json({status: 'error' , message: 'Faltan datos obligatorios'})
    }
    if(await UserModel.findByEmail(email){
            return res.status(409).json({status: 'error',message: ' el email ya esta registrado '})
    }
    })
}