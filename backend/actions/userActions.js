const User = require('../db/models/user')

module.exports = {
//login
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login, password });
      console.log('user', user)
      if(user===null) {
        throw new error;
      } else {
        res.status(200).json(user);
      }
    } catch(error) {
      res.status(404).json({ message: error.message })
    }
  },
//register
  async register(req,res) {
    const { email, login, password, typeUser } = req.body;
    try {
      let newUser = new User({ email, login, password, typeUser });
      await newUser.save();
      res.status(201).json(newUser)
      console.log('newUser', newUser)
    } catch(error) {
      return res.status(500).json({ message: error.message });
    }
  },
//boughtOrders
  async boughtOrders(req, res) {
    const { _id, order, time } = req.body;
      try {
        if (order.length===0) {
          return res.status(400).json({ message: 'basket is empty' });
        } else {
          const user = await User.findOne({ _id })
          const fromBasket = {order, time}
          user.boughtOrders.push(fromBasket)
          await user.save()
          console.log(user)
          res.status(200).json(user);
        }
      }catch(error) {
        return res.status(500).json({ message: error.message });
      }
  },
//rentedOrders
  async rentedOrders(req, res) {
    const { _id, order, time } = req.body;
      try {
        if (order.length===0) {
          return res.status(400).json({ message: 'basket is empty' });
        } else {
          const user = await User.findOne({ _id })
          const fromBasket = { order, time: time,}
          user.rentedOrders.push(fromBasket)
          await user.save()
          console.log(user)
          res.status(200).json(user);
        }
      }catch(error) {
        return res.status(500).json({ message: error.message });
      }
  },
//get data from One User 
  async account(req, res) {
    const _id = req.params.id;
    const user = await User.findOne({ _id })
    return res.status(200).send(user)
  },
}