'use strict';

var rp = require('request-promise');
var Request = require('request');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var fs = require('fs');

module.exports = () => {
  /* User-Agent to be send into Headers request */
  // TODO: Add user agent later if it needed
  // let user_agent = 'PassKIT/rest-sdk-nodejs ' + sdk_version + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';

  let defaultOptions = {
    url: 'https://api-pass.passkit.net',
    apiKey: '',
    apiSecret: '',
    apiVersion: 'v2',
  };

  let requestOptions = {
    uri: '',
    method: 'GET',
    json: true,
  };

  /* Function for updating the default options for the
     given options */
  function updateOptions(_defaultOptions, options) {
    for (var opt in options) {
      _defaultOptions[opt] = options[opt];
    }
    return _defaultOptions;
  }

  function generateJWT() {
    return jwt.sign({ key: defaultOptions.apiKey }, defaultOptions.apiSecret, {
      expiresIn: 60,
    });
  }

  function request(options, data) {
    let newOptions = updateOptions(requestOptions, options);

    if (
      newOptions.method.toLowerCase() === 'post' ||
      newOptions.method.toLowerCase() === 'put'
    ) {
      const token = generateJWT();

      // Add JWT to headers
      newOptions.headers = {
        Authorization: `PKAuth ${token}`,
        'Content-Type': 'application/json',
      };
      newOptions.body = data;
    }

    return rp(newOptions);
  }

  return {
    /* Function to initialize options on SDK */
    init(options) {
      if (options && typeof options === 'object') {
        defaultOptions = updateOptions(defaultOptions, options);
      }
    },

    getOptions() {
      return defaultOptions;
    },

    generateToken() {
      return generateJWT();
    },

    pass: {
      get(uid) {
        return request({
          uri: `${defaultOptions.url}/${defaultOptions.apiVersion}/passes/${uid}/bundle`,
        });
      },
      create(data) {
        return request(
          {
            method: 'POST',
            uri: `${defaultOptions.url}/${defaultOptions.apiVersion}/passes`,
            json: true,
          },
          data
        );
      },

      update(uid, data) {
        return request(
          {
            method: 'PUT',
            uri: `${defaultOptions.url}/${defaultOptions.apiVersion}/passes/${uid}`,
            json: true,
          },
          data
        );
      },
    },

    image: {
      upload(filePath) {
        // using request because request-promise doesnt really support multipart/form-date
        let formData = {
          image: fs.createReadStream(filePath),
        };

        const token = generateJWT();

        return new Promise((resolve, reject) => {
          Request.post(
            {
              url: `${defaultOptions.url}/${defaultOptions.apiVersion}/images`,
              formData: formData,
              headers: {
                Authorization: `PKAuth ${token}`,
              },
            },
            (error, response, body) => {
              if (error) return reject(error);
              return resolve(body);
            }
          );
        });
      },
    },
  };
};
