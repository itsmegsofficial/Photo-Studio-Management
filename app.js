const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CheesyClicksDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  package: String,
  date: Date,
  message: String
});

const Booking = mongoose.model('Booking', bookingSchema);

app.post('/book',function (req, res)  {
  const { name, email, phone, service, package, date, message } = req.body;

  const newBooking = new Booking({
    name,
    email,
    phone,
    service,
    package,
    date,
    message
  });

  newBooking.save()
  .then(() => {
    console.log("Booking successful");
    return res.redirect('/success.html');
  }).catch(err=>{
    console.log(err);
    return res.status(500).send("Error booking try again");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
