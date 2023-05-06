const mongoose = require('mongoose')

const cardSchema = mongoose.Schema(
    {
        card_number: {
            type: Number,
            required: [true, "Please enter a product name"]
        },
        card_type: {
            type: String,
            required: true,
            default: 0
        },
        currency_code: {
            type: String,
            required: true,
        },
        balance: {
            type: String,
            required: true,
        }
    }
)

const userSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: [true, "Please enter a product name"],
            default: 0
        },
        last_name: {
            type: String,
            required: [true, "Please enter a product name"],
        },
        email: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
        card: {
            type: cardSchema,
            required: false,
        },
        married_status: {
            type: Boolean,
            required: true,
        }
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;