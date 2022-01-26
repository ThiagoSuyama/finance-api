import User from '../models/User';
import bcrypt from 'bcrypt'

class UserController {
  async create (req, res) {
    
    const userExists = await User.findOne({where: { email : req.body.email }})

    if ( userExists ){
      return res.status(400).json({ error: 'User already exists. '});
    }

    const {id, name, email, password} = req.body
    const password_hash  = await bcrypt.hash(password, 10)

    const user =  await User.create({ id, name, email, password_hash});
    
    return res.json(user)
  }

}

export default new UserController();