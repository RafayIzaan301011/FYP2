const { number } = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// --------------------------------connect to mongodb using mongoose library--------------------------------

// const dbURI = 'mongodb://127.0.0.1:27017/polling-officer-and-voter';

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to the database, thank goddd');
//     })
//     .catch(err => {
//         console.error('Error connecting to the databaseeeeeeeeeeee:', err);
//     });

// -----------------------------------------schema-------------------------------------------------

const schema = new mongoose.Schema({
    party: { type: String, required: true, enum: ['party-A', 'party-B', 'party-C'] },
    votes: { type: Number, required: true },

    NA: { type: Number, required: true, min: 1, max: 10 },
    ps: { type: Number, required: true, min: 1, max: 10 },
    // password: { type: String, required: true, min: 6, max: 100 },
});

//schema.index({ NA: 1, ps: 1 }, { unique: true });

// ----------------------------------- encypt password in DB --------------------------

// schema.pre('save', async function (next) {
//     const user = this;

//     // Only hash the password if it is modified or new
//     if (!user.isModified('password')) {
//         return next();
//     }

//     try {
//         // Generate a salt and hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(user.password, salt);

//         // Replace the plain password with the hashed one
//         user.password = hashedPassword;
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

// schema.methods.generateToken = function () {
//     const token = jwt.sign({ _id: this.id, cnic: this.cnic, NA: this.NA, ps: this.ps }, 'jwtprivatekey')
//     return token;
// }

// -----------------------------------------model-------------------------------------------------
const Result = mongoose.model('Result', schema);

// ------------------------------------create a document (Result)-------------------------------------------------

async function createResult(partyname, vote) {
    const result = new Result({
        party: partyname,
        votes: vote,
        NA: 5,
        ps: 2

    });
    // password starts from 000001
    try {
        const doc = await result.save();
        console.log(doc);
    }

    catch (ex) {
        for (fields in ex.error) {
            console.log(ex.error[fields].message) // or ex.error[fields] ; it would be detailed stack.
            console.log('already made');

        }
    }
}
// async function create() {
//     createResult("party-A", 520);
//     createResult("party-B", 630);
//     createResult("party-C", 740);
// }

//create();



async function getOfficerDetails(cnic) {
    try {
        // Use findOne to find the officer by ID
        const result = await Result.findOne({ cnic: cnic });

        if (result) {
            console.log('Polling Officer details:', result);
        } else {
            console.log('Polling Officer not found');
        }
    } catch (error) {
        console.error('Error getting result details:', error);
    } finally {
        // Close the database connection after retrieving details
        mongoose.connection.close();
    }
}

//getOfficerDetails('35200000000007');


module.exports = Result;