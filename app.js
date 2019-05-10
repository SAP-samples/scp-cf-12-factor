/* Load NodeJS Modules */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require("redis")

/* Load Local Modules */
const biz = require('./modules/biz');
const db = require('./db/persist');

//Configure express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

/* Configure Redis Cache */
console.log("Connecting to Redis...")
var credentials = null;
var vcap = null;
if (process.env.VCAP_SERVICES) {
    credentials = {}
    vcap = JSON.parse(process.env.VCAP_SERVICES);
    if(vcap.hasOwnProperty('redis')){
      credentials = vcap.redis[0].credentials;
      credentials.host = credentials.hostname
      console.log("Redis credentials found in VCAP")
     } else{
      console.error("Redis service not bound to the app")
      return
    }
};

var redisClient = redis.createClient(credentials);
redisClient.on('connect', function () {
    console.log("Connected to Redis")
    biz.SetCache(redisClient)
});

var output = {};

db.Connect(function (error) {
  if (error) {
    console.error("Can't Connect to CF Database");
    console.error(error);
  }
})

//EndPoint to Retrieve Environment Variables
app.get('/GetEnv', function (req, res) {
  // output.sl = slOptions.headers.Cookie || "API Biz Hub"
  biz.RetrieveToken(function(cookies){
    output.erp = process.env.ERP
    output.token = cookies
    output.instance = (process.env.CF_INSTANCE_INDEX * 1) + 1
    output.env = process.env.HOME;
    res.send(output);
  })
});

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'views/index.html')));

// Routing
app.use('/erp', require('./routes/erp'));
app.use('/db', require('./routes/db'));


var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
