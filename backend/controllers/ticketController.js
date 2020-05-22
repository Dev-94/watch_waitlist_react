const Ticket = require('../Data/TicketModel')

module.exports = {
    getTickets,
    addTicket,
    showTicket,
}


// async function index(req, res) {

//     try {
//         const ticket = await Ticket.find({});
//         res.status(200).json(ticket);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// }
function getTickets(req, res) {
    Ticket.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data })
    })
}

// not working
// ui not built??
function showTicket(req, res) {
    // req.params.id is undefined
    console.log('req type: ' + typeof (req.params))
    console.log('req keys: ' + Object.keys(req.params))
    console.log('req values: ' + Object.values(req.params))
    Ticket.findById(req.params, (err, data) => {
        // data is the _id for the selected ticket
        console.log('showTicket')
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data })
    })
}

function addTicket(req, res) {
    let ticket = new Ticket()

    console.log('ticket: ' + ticket)
    console.log('req: ' + Object.keys(req))
    console.log('res: ' + Object.keys(res))
    console.log('req.body: ' + Object.keys(req.body.input))
    // this is incorrect
    // what object is this referring to?
    // what does it have to align with?
    // what exactly is req.body doing? 
    // is this function recieving a req?
    const { inputFirstName, inputLastName, inputStreet, inputCity, inputState, inputZipCode, inputNumber, inputEmail, inputDateOrdered, inputWatchOrdered, inputDateFulfilled, inputFulfilled } = req.body.input
    console.log('inputFirstName: ' + inputFirstName)

    ticket.first_name = inputFirstName
    ticket.last_name = inputLastName
    ticket.street = inputStreet
    ticket.city = inputCity
    ticket.state = inputState
    ticket.zip_code = inputZipCode
    ticket.phone_number = inputNumber
    ticket.email = inputEmail
    ticket.date_ordered = inputDateOrdered
    ticket.watch_ordered = inputWatchOrdered
    ticket.date_fulfilled = inputDateFulfilled
    ticket.fulfilled = inputFulfilled

    // ticket.first_name = 'tom'
    // ticket.last_name = 'shark'
    // ticket.street = '2316 castle rock road'
    // ticket.city = "arlington"
    // ticket.state = "texas"
    // ticket.zip_code = "76007"
    // ticket.phone_number = "111-222-444"
    // ticket.email = "email@email.com"
    // ticket.date_ordered = "1999/02/03"
    // ticket.watch_ordered = "Tag Hueur"
    // ticket.date_fulfilled = "2000/02/02"
    // ticket.fulfilled = True
    // console.log("keys: " + Object.keys(ticket))
    // console.log("values: " + Object.values(ticket))

    ticket.save(err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    })
}
