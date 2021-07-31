const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BankSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    phone: String,
    branch: String,
    address: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accounts: [
        {
            accountId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Account"
            }
        }
    ]

})

const BankModel = mongoose.model("Bank", BankSchema);

module.exports = BankModel;