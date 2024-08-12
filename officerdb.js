// --------------------------------connect to mongodb using mongoose library--------------------------------
// const { number } = require('joi');
const mongoose = require('mongoose');

// const dbURI = 'mongodb://127.0.0.1:27017/practice-polling-officer-and-voter';

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to the database, thank goddd');
//   })
//   .catch(err => {
//     console.error('Error connecting to the databaseeeeeeeeeeee:', err);
//   });

// -----------------------------------------schema-------------------------------------------------

const schema = new mongoose.Schema({
  name: { type: String, required: true },

});

// -----------------------------------------model-------------------------------------------------
const Officer = mongoose.model('Officer', schema);

// ------------------------------------create a document (Officer)-------------------------------------------------

// async function createOfficer() {
//   const officer = new Officer({
//     name: 'Polling Officer 1',
//   });

//   try {
//     const doc = await officer.save();
//     console.log(doc);
//   }

//   catch (ex) {
//     for (fields in ex.error) {
//       console.log(ex.error[fields].message) // or ex.error[fields] ; it would be detailed stack.
//     }
//   }
// }

// //createOfficer();

// async function getOfficerDetails(officerId) {
//   try {
//     // Use findOne to find the officer by ID
//     const officer = await Officer.findOne({ _id: officerId });

//     if (officer) {
//       console.log('Polling Officer details:', officer);
//     } else {
//       console.log('Polling Officer not found');
//     }
//   } catch (error) {
//     console.error('Error getting officer details:', error);
//   } finally {
//     // Close the database connection after retrieving details
//     mongoose.connection.close();
//   }
// }

//getOfficerDetails('6594449e8a0ae6dcb185fab4');

//exports.Officer = Officer;
module.exports = Officer;