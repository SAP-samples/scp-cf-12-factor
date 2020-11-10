
  

# cf-12-factor - LOCAL DEPLOYMENT

## Prerequisites
### Digital Core

* SAP Business One - Service Layer Exposed
* SAP Business ByDesign - [Business Partner Custom Odata Service](https://github.com/SAP-samples/byd-api-samples/blob/master/Custom%20OData%20Services/khbusinesspartner.xml)

### Local Deployment
*  [NodeJS](https://nodejs.org/en/download/) - Run time

#### Optional
*  [Postgresql](https://www.postgresql.org/download/) - Database
*  [Redis](https://redis.io/download) - Cache
*  [VS Code](https://code.visualstudio.com/) - IDE - *Recommended*  

### Configuration

A list of all environment variables supported by this app can be found on [sample-launch.json](sample-launch.json). This file can also be used as a configuration for debugging this app locally using VS Code.

## Installation Local
**STEP 1** - Download or Clone this repository
```bash
git clone https://github.com/Ralphive/cf-12-factor.git
```
**STEP 2** - Install the dependencies
```bash
npm install
 ``` 

**STEP 3** - Set the environment variables According to your erp system (b1 or byd)
```bash
"ERP": "b1" || "byd"
"ERP_ODATA_HOST" : "http://<b1Host:50001/b1s/v2" || "https://my123456.sapbydesign.com/sap/byd/odata/cust/v1"
"ERP_USER" : "manager" || "FINANCIAL01",
"ERP_PASSWORD" : "1234",
"ERP_TENANT" : "SBODEMOUS" || null for byd
```

**STEP 4** - run the app
```bash
npm run
```