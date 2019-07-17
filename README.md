
# cf-12-factor 
forked from B1SA/cfDemoSummit18

[![SAP](https://i.imgur.com/kkQTp3m.png)](https://cloudplatform.sap.com)

Sample 12-factor app showing a ERP Agnostic Loosely Coupled Architecture. This application works with both B1 and ByD 
(more docuemntation to come)

## Prerequisites
### Digital Core
* SAP Business One - Service Layer Exposed
* SAP Business ByDesign - [Business Partner Custom Odata Service](https://github.com/SAP/sapbydesign-api-samples/blob/master/Business%20Partner%20Data/Custom%20OData%20Service/vmubusinesspartner.xml)

### Local Developement Environment
* [NodeJS](https://nodejs.org/en/download/) - Runtime
* [Postgresql](https://www.postgresql.org/download/) - Database
* [Redis](https://redis.io/download) - Cache
* [VS Code](https://code.visualstudio.com/) - IDE - *Recommended*


**For Cloud Deployment**
* [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads) 
* [Configure your SAP Cloud Platform Cloud Foundry enviroment](https://developers.sap.com/uk/tutorials/hcp-cf-getting-started.html)

## Installation Local

**STEP 1** - Download or Clone this repository

    $ git clone https://github.com/Ralphive/cf-12-factor.git

**STEP 2** -  Install the dependencies

    $ npm install

**STEP 3** - Set the environment variables According to your erp system (b1 or byd)

~~~~
"ERP": "b1" || "byd"
"ERP_ODATA_HOST" : "http://<b1Host:50001/b1s/v2" || "https://my123456.sapbydesign.com/sap/byd/odata/cust/v1"
"ERP_USER" : "manager" || "FINANCIAL01",
"ERP_PASSWORD" : "1234",
"ERP_TENANT" : "SBODEMOUS" || null for byd
~~~~
## Cloud Foundry Deployment 
**STEP 1** - Same as before
**STEP 2** - Push the app to Cloud Foundry

    $ cf push

**STEP 3** - Same as before, before, but this time on cloud foundry like

    $ cf set-env <appname> ERP b1

**STEP 4** - Create and Bind the backing services (PostgresSQL and Redis) in the cloud like:

    e.g: cf create-service <Service> <Plan> <service_instance>
    $ cf create-service postgresql v9.4-dev clouddb
    $ cf bind-service <appName> clouddb



 **STEP 5** - Restart the app

    $ cf restart <appName>


