
import * as Yup from 'yup'
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.js'

class SessionController{
    async store(request, response){
            
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()

        })

        

       if(!(await schema.isValid(request.body))){
        return response.status(400).json({error: "Email ou senha inválidos."})
       }

       const { email, password } = request.body
       const user = await User.findOne({
        where: { email },
       })

       if(!user){
        return response.status(400).json({error: "Email ou senha inválidos."})
       }

       if( user && !(await user.checkPassword(password))){
        return response.status(400).json({error: "Email ou senha inválidos."})
       }

       return response.json({
        id: user.id, 
        email, 
        name:user.name, 
        admin: user.admin,
        token: jwt.sign({id: user.id, name:user.name}, authConfig.secret , {
            expiresIn: authConfig.expiresIn,
        }),
    
    })
    }
}

export default new SessionController()