/* Load NodeJS Modules */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require("redis")

const app = express();
app.use(express.static('public'));

//To Support body on post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* Configure Redis */
console.log("Configuring redis")
var credentials = null;
var vcap = null;
if (process.env.VCAP_SERVICES) {
    credentials = {}
    vcap = JSON.parse(process.env.VCAP_SERVICES);
    credentials = vcap['redis'][0].credentials;
    credentials.host = credentials.hostname
    console.log("Redis credentials found in VCAP")
};
var redisClient = redis.createClient(credentials);
redisClient.on('connect', function () {
    console.log("Connected to Redis")
    biz.SetCache(redisClient)
});


/* Load Local Modules */
const biz = require('./modules/biz');
const db = require('./db/persist');

var output = {};

db.Connect(function (error) {
  if (error) {
    console.error("Can't Connect to CF Database");
    console.error(error);
  }
})

//Endpoint to Insert BPs on the Apps DB (Postgres)
app.post('/InsertBusinessPartner', function (req, res) {
  db.Insert(req.body, function (error, resp) {
    res.redirect('/');
  });
});

//Endpoint to SELECT on the Apps DB (Postgres)
app.get('/SelectBusinessPartners', function (req, res) {
  db.Select(function (error, resp) {
    if (error) {
      console.log('Cant Select rows')
      console.log(error);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(resp);
    }
  });
});


//EndPoint To retrieve BusinessPartners from ERP
app.get('/GetBusinessPartners', function (req, res) { 
  biz.GetBusinessPartners(null, function (error, resp) {
    if (error) {
      console.error("Can't get BusinessPartners from Service Layer - " + error);
      res.send(error);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(resp);
    }
  });
});

//EndPoint to Retrieve Environment Variables
app.get('/GetEnv', function (req, res) {
  output.sl = slOptions.headers.Cookie || "API Biz Hub"
  output.instance = 0;
  output.instance = (process.env.CF_INSTANCE_INDEX * 1) + 1
  output.env = process.env.HOME;
  res.send(output);
});

// //Synchronize Local DB with B1 SL
// app.post('/Sync', function (req, res) {
//   console.log("LETS SYNC BusinessPartnerS");
//   db.Select(function (error, rows) {
//     if (error) {
//       console.log('Cant Select rows')
//       console.log(error);
//     } else {
//       console.log("HERE ARE BusinessPartnerS TO SYNC" + JSON.stringify(rows));
//       var bps = 0
//       for (var i = 0; i < rows.length; i++) {
//         var body = { CardCode: rows[i].code, CardName: rows[i].name, CardType: rows[i].type,  }
//         console.log("Sync BusinessPartner " + rows[i].code)
//         sl.PostBusinessPartners(slOptions, body, function (err, slBP) {
//           bps++;
//           if (!err) {
//             db.Update(slBP.CardCode, function (err, resp) {
//               if (!err) {
//                 console.log("BP Synchronized");
//               } else {
//                 console.error(err);
//               }
//             })
//             if (bps == rows.length){
//               res.redirect('/');
//             }
//           }
//         })
//       }
//     }
//   });
// });


// Root path to retrieve Index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});