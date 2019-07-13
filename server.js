require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// add something for at least on of these ...
// Send Grid
const sgMail = require('@sendgrid/mail');
// Mail Chimp
// Google Sheets
// Twilio (SMS Texts)
// 

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

app.set('views','./views');

app.set('view engine', 'ejs');

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body });
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'dean.lovett@gmail.com',
    from: `${contact.email}`,
    subject: `${contact.firstName} ${contact.lastName} from ${contact.company}: ${contact.subject} sent from Dean's Portfolio.`,
    text: `${contact.text}`
  };
  console.log('msg:',msg);
  sgMail.send(msg);
});

app.get('/', (req, res) => {
  const data = {
      person: {
          firstName: 'Dean',
          lastName: 'Lovett'
      }
  }
  res.render('index', data);
});

// Catch and handle everything else
app.get('*', function (req, res) {
//  res.send('Whoops, page not found 404').status(404);
  const data = {
    person: {
        firstName: 'Dean',
        lastName: 'Lovett'
    }
  }
  res.render('index', data);
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

module.exports = app;