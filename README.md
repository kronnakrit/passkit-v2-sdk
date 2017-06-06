# Passkit V2 SDK
---
This node package is inspired by [passkit-sdk](https://github.com/TheHover/passkit-sdk)

node >= 6.10.3

# Installation
---
```
npm isntall passkit-v2-sdk --save
```

# Documentation
---
## Initialize

```javascript
var PasskitSDK = require('./lib/passkit-v2-sdk.js')();

PasskitSDK.init({
  apiKey: 'yourapikey',
  apiSecret: 'yoursecretkey',
});
```

This is default options

```javascript
{
  url: 'https://api-pass.passkit.net',
  apiKey: '',
  apiSecret: '',
  apiVersion: 'v2',
};
```

## Pass

### Get pass

- Method: 'GET',
- Params: 'passId',
- Output: 'json'

```javascript
PasskitSDK.pass.get('passId')
  .then(function(res) => {
    // success
  })
  .catch(function(err) => {
    // fail
    // err.message
  })
```

### Create pass

- Method: 'POST',
- Params: passObject

```javascript
PasskitSDK.pass.create(passObject)
  .then(function(res) => {
    // success
  })
  .catch(function(err) => {
    // fail
    // err.message
  })
```


### Update pass

- Method: 'PUT',
- Params: ('passId', passObject)

```javascript
PasskitSDK.pass.update('passId', passObject)
  .then(function(res) => {
    // success
  })
  .catch(function(err) => {
    // fail
    // err.message
  })
```
