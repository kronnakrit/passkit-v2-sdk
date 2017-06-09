# Passkit V2 SDK

This node package is inspired by [passkit-sdk](https://github.com/TheHover/passkit-sdk)

node >= 6.10.3

# Installation

```
npm isntall passkit-v2-sdk --save
```

# Documentation
---
## Initialize

```javascript
var PasskitSDK = require('passkit-v2-sdk');

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

> Note: This function does not require apiKey and apiSecret

```javascript
PasskitSDK.pass.get('passId')
  .then(function(res) {
    // success
  })
  .catch(function(err) {
    // fail
    // err.message
  })
```

### Create pass

- Method: 'POST',
- Params: passObject

```javascript
PasskitSDK.pass.create(passObject)
  .then(function(res) {
    // success
  })
  .catch(function(err) {
    // fail
    // err.message
  })
```


### Update pass

- Method: 'PUT',
- Params: ('passId', passObject)

```javascript
PasskitSDK.pass.update('passId', passObject)
  .then(function(res) {
    // success
  })
  .catch(function(err) {
    // fail
    // err.message
  })
```


## Image

- Method: 'POST'
- Params: 'image'

```javascript
PasskitSDK.image.upload(image)
  .then(function(res) {
    // success
  })
  .catch(function(err) {
    // fail
    // err.message
  })
```
