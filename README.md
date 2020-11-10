
  

# cf-12-factor
_forked from B1SA/cfDemoSummit18_

[![SAP](https://i.imgur.com/kkQTp3m.png)](https://cloudplatform.sap.com)

  

Sample [12-factor app](https://12factor.net/) showing a scalable, resilient, ERP Agnostic, Loosely Coupled Architecture. This application works with both B1 and ByD.

It also shows how to implement a persistence (PostgreSQL) and Cache (Redis) layers. These backing services are optional for the app to run, but extremely recommended.

This application can be deployed also on a Local Machine (for development purposes)

  

## Prerequisites
### Digital Core

* SAP Business One - Service Layer Exposed
* SAP Business ByDesign - [Business Partner Custom Odata Service](https://github.com/SAP-samples/byd-api-samples/blob/master/Custom%20OData%20Services/khbusinesspartner.xml)

### Tooling
*  [Install the Cloud Foundry CLI](https://developers.sap.com/tutorials/cp-cf-download-cli.html)
*  [Learn the Fundamentals of SCP Cloud Foundry](https://developers.sap.com/tutorials/cp-cf-fundamentals.html)

## Cloud Deployment
**STEP 1** - Download or Clone this repository
```bash
git clone https://github.com/Ralphive/cf-12-factor.git
```
**STEP 2** - Navigate to the directory you cloned and Push the app to Cloud Foundry
```bash
$ cf push --random-route
```
**STEP 3** - Set the environment variables using the following command. 
```bash
cf set-env cf-12-factor ERP b1
cf set-env cf-12-factor ERP_ODATA_HOST b1 http://<b1 host>:50001/b1s/v2
```
  _full list of variables on [sample-launch.json](sample-launch.json)_

  

**STEP 4 - OPTIONAL** - Set the environment variables for the remote backing services (Redis and PostgresSQL)
```bash
cf REDIS_HOST cf-12-factor <redisinstance>.redis.cache.windows.net
```
**STEP 5** - Restart the app
```bash
cf restart cf-12-factor
```

  

## Backing Service offerings:

*  [Redis on Azure](https://azure.microsoft.com/en-gb/services/cache/)

*  [Postgres on AWS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html) or on [Azure](https://azure.microsoft.com/en-gb/services/postgresql/)
