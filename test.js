const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Officer = require('./backup.js');
const Result = require('./database/models/result.js')
const { string } = require('joi');


const app = express();
//const port = 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbURI = 'mongodb://127.0.0.1:27017/polling-officer-and-voter';
// todo: change the database name

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database, thank goddd');
  })
  .catch(err => {
    console.error('Error connecting to the databaseeeeeeeeeeee:', err);
  });

// Define your user schema and model using Mongoose
// const userSchema = new mongoose.Schema({
//   name: String,
//   // Add other fields as needed
// });

// const User = mongoose.model('User', userSchema);

// Define a route to check login
app.post('/login', async (req, res) => {
  const { cnic, password } = req.body;

  try {
    const user = await Officer.findOne({ cnic: req.body.cnic });
    if (user) { // User found, send success response
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json({ success: true, message: 'Login successful' });
        console.log('login success', cnic);

      }
      else {
        res.status(401).json({ success: false, message: 'Invalid password' });
      }
    } else {
      // User not found, send failure response
      res.status(401).json({ success: false, message: 'Invalid name' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server errorrrrr' });
  }
});


app.get('/home', async (req, res) => {
  const resObj = {
    cnic: '',
    name: '',
    NA: 0,
    ps: 0
  };
  // Retrieve the identityNumber from the query parameters
  const identityNumber = req.query.cnic;

  if (!identityNumber) {
    console.log("no id found for home");
    return res.status(400).json({ error: 'Identity number is required.' });
  }
  try {
    const user = await Officer.findOne({ cnic: identityNumber });
    if (user) {
      resObj.cnic = user.cnic;
      resObj.name = user.name;
      resObj.NA = user.NA;
      resObj.ps = user.ps;

      // User found, send success response
      res.json(resObj);
    }
    else {
      // User not found, send failure response
      res.status(401).json({ success: false, message: 'data is NOT found for Home page' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server errorrrrr' });
  }

  // Find data based on the identityNumber  
});

app.post('/form', async (req, res) => {
  try {
    const { voteArray, id, na, ps } = req.body;

    // Process the received data as needed
    // For example, you can save it to a database or perform some other business logic

    console.log('Received data:', { voteArray, id, na, ps });

    // const votes = await Result.findOne({ NA: req.body.na, ps:req.body.ps })
    const votesA = await Result.findOne({ NA: req.body.na, ps: req.body.ps, party: "party-A" });
    const votesB = await Result.findOne({ NA: req.body.na, ps: req.body.ps, party: "party-B" });
    const votesC = await Result.findOne({ NA: req.body.na, ps: req.body.ps, party: "party-C" });

    console.log("party A ", votesA.party, "votes: ", votesA.votes);
    console.log("party B ", votesB.party, "votes: ", votesB.votes);

    votesA.votes = votesA.votes + voteArray[0];
    votesB.votes = votesB.votes + voteArray[1];
    votesC.votes = votesC.votes + voteArray[2];

    await votesA.save();
    await votesB.save();
    await votesC.save();





    // Send a response back to the client
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/card', async (req, res) => {
  const resObj = {
    votes: 0,
    partyA: 0,
    partyB: 0,
    partyC: 0
  };
  // Retrieve the identityNumber from the query parameters
  const na = req.query.na;


  if (!na) {
    console.log("no id found for home");
    return res.status(400).json({ error: 'Identity number is required.' });

  }
  try {
    const partyA = await Result.findOne({ NA: req.query.na, party: "party-A" });
    const partyB = await Result.findOne({ NA: req.query.na, party: "party-B" });
    const partyC = await Result.findOne({ NA: req.query.na, party: "party-C" });

    if (partyA) {
      let total = partyA.votes + partyB.votes + partyC.votes;
      resObj.votes = total;
      resObj.partyA = partyA.votes;
      resObj.partyB = partyB.votes;
      resObj.partyC = partyC.votes;

      console.log("card data testing: ", total);
      console.log("partyA: ", partyA.votes)

      // User found, send success response
      res.json(resObj);
    }
    else {
      // User not found, send failure response
      res.status(401).json({ success: false, message: 'vote data for card is NOT found for Home page' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server errorrrrr' });
  }

  // Find data based on the na  
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
