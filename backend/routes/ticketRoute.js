const express = require('express')
const router = express.Router()
const ticketCtrl = require('../controllers/ticketController')

router
    .get('/getTickets', ticketCtrl.getTickets)
    .post('/add/addTickets', ticketCtrl.addTicket)
    .get('/show/:d', ticketCtrl.showTicket)

module.exports = router;