/** Persistence Layer (PostGree) library */
module.exports = {
    Connect: function (response) {
        return (Connect(response));
    },
    Select: function (response) {
        return (Select(response));
    },
    Insert: function (data, response) {
        return (Insert(data, response));
    },
    Update: function (BusinessPartner, response) {
        return (Update(BusinessPartner, response));
    }
}

const pg = require("pg")

var credentials = null;
var vcap = null;

console.log("Connecting to PostgresSQL...")
if (process.env.VCAP_SERVICES) {
    vcap = JSON.parse(process.env.VCAP_SERVICES);
    
    if(vcap.hasOwnProperty('postgresql')){
        credentials = { connectionString: vcap.postgresql[0].credentials.uri }
        console.log("PostgresSQL found in VCAP Services")
    }else{
        console.error("PostgresSQL service not bound to the app")
        return
    }
}
var pgClient = new pg.Client(credentials)

function Connect(callback) {
    console.log('PG Connecting')
    pgClient.connect(function (err) {
        if (err) {
            console.log(err)
            callback(err)
            return;
        } 
        console.log('PG Connected')
    });
}

function Select(callback) {
    var query = 'SELECT code, name, type, integrated FROM bpsscp where integrated = false'
    pgClient.query(query, function (err, result) {
        if (err) {
            callback(err)
        }else{
            callback(null, result.rows)
        }
    });
}

function Insert(data, callback) {
    console.log('PG Inserting Table data '+ JSON.stringify(data))

    var query = 'INSERT INTO bpsscp(code,name, type, integrated) VALUES($1, $2, $3, $4)';
    pgClient.query(query, [data.code,data.name,data.type, false], function (err,result){
        if (err) {
            callback(err)
        }else{
            callback(null, result)
        }
    });
}

function Update(BusinessPartner, callback) {
    console.log('PG Updating Table data '+ JSON.stringify(BusinessPartner))

    var query = 'UPDATE bpsscp SET integrated = true WHERE code = $1';
    pgClient.query(query, [BusinessPartner], function (err,result){
        if (err) {
            callback(err)
        }else{
            callback(null, result)
        }
    });
}
