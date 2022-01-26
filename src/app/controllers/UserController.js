import User from '../models/User';
import bcrypt from 'bcrypt'

class UserController {
  async create (req, res) {
    const {id, name, email, password} = req.body
    
    const userExists = await User.findOne({where: { email : email }})

    if ( userExists ){
      return res.status(400).json({ error: 'User already exists. '});
    }
    
    const password_hash  = await bcrypt.hash(password, 10)

    const user =  await User.create({ id, name, email, password_hash});
    
    return res.json(user)
  }

  async list (req, res) {
      
    const users = await User.findAll()
    
    return res.json(users)
  }
  
  async update (req, res){ 

    const {name, email, password} = req.body

    const userExists = await User.findOne({where: { email : email }})
    
    if(!userExists){
      return res.status(400).json({ error: 'User not found. '});
    }

    if(password){
      const password_hash  = await bcrypt.hash(password, 10)
      await User.update({ name: name , email: email, password_hash: password_hash}, {where: {email:email}} );
      
      const userUpdate = await User.findOne({where: { email : email }})

      return res.json(userUpdate)
    }
        
    await User.update({ name: name }, {where: {email:email}} );
    
    const userUpdate = await User.findOne({where: { email : email }})

    return res.json(userUpdate)
  }

  async delete(req, res){
    const {id} = req.params

    const userExists = await User.findOne({where: { id : id }})
   
    if(!userExists){
      return res.status(400).json({ error: 'User not found. '});
    }

    await User.destroy({where:{id: id}})
    return res.status(200).json({ mgs: 'User deleted.', user: userExists.email});

  }
}

export default new UserController();