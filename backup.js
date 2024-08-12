const { number } = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// --------------------------------connect to mongodb using mongoose library--------------------------------

const dbURI = 'mongodb://127.0.0.1:27017/polling-officer-and-voter';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database, thank goddd');
    })
    .catch(err => {
        console.error('Error connecting to the databaseeeeeeeeeeee:', err);
    });

// -----------------------------------------schema-------------------------------------------------

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    NA: { type: Number, required: true, min: 1, max: 10 },
    ps: { type: Number, required: true, min: 1, max: 10 },
    password: { type: String, required: true, min: 6, max: 100 },
});

schema.index({ NA: 1, ps: 1 }, { unique: true });

// ----------------------------------- encypt password in DB --------------------------

schema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it is modified or new
    if (!user.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Replace the plain password with the hashed one
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

schema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this.id, cnic: this.cnic, NA: this.NA, ps: this.ps }, 'jwtprivatekey')
    return token;
}

// -----------------------------------------model-------------------------------------------------
const Officer = mongoose.model('Officer', schema);

// ------------------------------------create a document (Officer)-------------------------------------------------

async function createOfficer() {
    const officer = new Officer({
        name: 'PO 11',
        cnic: '35200000000011',
        NA: 10,
        ps: 2,
        password: '000011'

    });
    // password starts from 000001
    try {
        const doc = await officer.save();
        console.log(doc);
    }

    catch (ex) {
        for (fields in ex.error) {
            console.log(ex.error[fields].message) // or ex.error[fields] ; it would be detailed stack.
            console.log('already made');

        }
    }
}

//createOfficer();

async function getOfficerDetails(cnic) {
    try {
        // Use findOne to find the officer by ID
        const officer = await Officer.findOne({ cnic: cnic });

        if (officer) {
            console.log('Polling Officer details:', officer);
        } else {
            console.log('Polling Officer not found');
        }
    } catch (error) {
        console.error('Error getting officer details:', error);
    } finally {
        // Close the database connection after retrieving details
        mongoose.connection.close();
    }
}

//getOfficerDetails('35200000000007');


module.exports = Officer;