const express = require('express');
const router = require('./routes/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./DB/connection');
const cookieParser = require('cookie-parser');

const app = express();

// Specify allowed origins explicitly
// const allowedOrigins = ['http://localhost:5173', "https://sangam-dash.vercel.app"]; // Add your frontend origin(s)

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

// test
app.use(cors({
  origin: 'https://sangam-dash.vercel.app',
  credentials: true,  // Allow cookies to be sent with the request
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
connection();

app.listen(6969, () => console.log('Server running on port 6969'));
