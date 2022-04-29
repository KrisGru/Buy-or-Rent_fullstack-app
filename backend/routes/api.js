const express = require('express');
const router = express.Router();

const userActions = require('../actions/userActions.js')

// login
router.post('/login', userActions.login);
//register new user
router.post('/register', userActions.register);
// buyBooks
router.post('/boughtOrders', userActions.boughtOrders)
// rentBooks
router.post('/rentedOrders', userActions.rentedOrders)
// get all data from one user
router.get('/account/:id', userActions.account)
// api do edycji danych 

//
module.exports = router;
