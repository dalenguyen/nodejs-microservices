const express = require('express');
const ServiceRegistry = require('./lib/ServiceRegistry');

const service = express();

module.exports = (config) => {
  const log = config.log();
  const serviceRegistry = new ServiceRegistry(log);

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  // Add microservices endpoints
  service.put('/register/:serviceName/:serviceVersion/:servicePort', (req, res) => {
    const { serviceName, serviceVersion, servicePort } = req.params;
    const serviceIp = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    const serviceKey = serviceRegistry
      .register(serviceName, serviceVersion, serviceIp, servicePort);
    return res.json({ result: serviceKey });
  });

  // eslint-disable-next-line arrow-body-style
  service.delete('register/:serviceName/:serviceVersion/:servicePort', (req, res, next) => {
    return next('Not implemented');
  });

  // eslint-disable-next-line arrow-body-style
  service.get('find/:serviceName/:serviceVersion', (req, res, next) => {
    return next('Not implemented');
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
