const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema(

    {
        first_name: { type: String },
        last_name: { type: String },
        // required: true

        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip_code: { type: String },
        // // required: true


        phone_number: { type: String },
        email: { type: String },
        // // required: true

        employee_responsible: { type: String },
        date_ordered: { type: Date },
        watch_ordered: { type: String }, // enum?
        fulfilled: { type: Boolean },
        date_fulfilled: { type: Date, default: '' }, // how to have multiple types?
        // required: true
    },
    { timestamps: true }
)

module.exports = mongoose.model('Ticket', TicketSchema)