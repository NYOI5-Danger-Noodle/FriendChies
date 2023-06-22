require('dotenv').config(); // added by LGJ
const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRoute');
const controller = require('./controller');
const router = express.Router();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

// Build file
// app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/', express.static(path.join(__dirname, '../client/'))); // not sure why this isn't to ../index.html?? - LGJ

// route to userRouter for creation/login check
app.use('/api/user', userRouter);

// Add this line to include the router
app.use('/api', router);

// serve index.html
router.get('/matches', controller.getMatches, (req, res) => {
  return res.status(200).json(res.locals.matches);
});

router.get('/dogs', controller.getPotentialMatches, (req, res) => {
  return res.status(200).json([...res.locals.potentialMatches]);
});
// should above be spread..? C

// include app.get request for /auth route - LGJ
router.get('/auth', (req, res) => {
  res.redirect(
    // redirects to the github oauth redirect link
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

// include app.get for /oauth-callback route (get link from github) - LGJ
app.get('/oauth-callback', async ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  // make a post request to get the access token for github
  let response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  response = await response.text();
  console.log(response);

  // add token like this:
  // make another post request to api.github.com/user - this will respond with the user associated with the token
  let result = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + response.split('&')[0].split('=')[1],
    },
  });
  result = await result.json();
  console.log(result);
  //*******jsonify the result and that will be the github user******

  // app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

  return res.redirect('http://localhost:8080/swipe');
});

app.get('/*', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port 3000.`));


