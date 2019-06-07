

// Express application - Express is node framework.
//NodeJs is used for creating webAPIs (backend)
let express = require('express');

// Npm package to generate token.
// https://www.npmjs.com/package/jsonwebtoken
let jwt = require('jsonwebtoken');

// Creating an application
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/api', (req, res) => {
    res.json({ message: 'working' })
});

app.post('api/posts', verifyToken, (req, res) => {
    res.json({ messgae: 'Its also working' });
})

//Use this API generating token 
app.post('/api/login', (req, res) => {
    debugger;

    console.log(req.body)

    let role;

    if(req.body.username === 'user'){
        role = "user";
    }else if(req.body.username === 'admin'){
        role = "admin";
    }else{
        res.sendStatus(403)
    }
    //mock user
    const user = {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        role : role
    }

    // Generating a token is Async
    //Callback is called after token is generated.
    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token: token
        })
    });
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {

    } else {
        res.sendStatus(403);
    }
}


app.listen(5000, () => console.log('server is running'));