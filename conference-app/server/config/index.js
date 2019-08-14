const path = require('path');

module.exports = {
  development: {
    sitename: 'Roux Meetups [Development]',
    serviceRegistryUrl: 'http://localhost:3001',
    serviceVersionIdentifier: '1.x.x'
  },
  production: {
    sitename: 'Roux Meetups',
    serviceRegistryUrl: 'http://localhost:3001',
    serviceVersionIdentifier: '1.x.x'
  },
};
