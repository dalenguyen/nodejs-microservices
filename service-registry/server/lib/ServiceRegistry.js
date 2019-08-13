/* eslint-disable array-callback-return */
const semver = require('semver');

class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
    this.timeout = 30;
  }

  // searching version of services for load balancer
  get(name, version) {
    this.cleanup();
    const candidates = Object.values(this.services)
      .filter(candidate => candidate.name === name && semver.satisfies(candidate.version, version));
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name, version, ip, port) {
    this.cleanup();
    const key = name + version + ip + port;
    if (!this.services[key]) {
      this.services[key] = {
        timestamp: Math.floor(new Date() / 1000),
        ip,
        name,
        port,
        version,
      };
      this.log.debug(`Added service ${name}, version ${version} at ${ip}:${port}`);
      return key;
    }

    this.services[key].timestamp = Math.floor(new Date() / 1000);
    this.log.debug(`Updated service ${name}, version ${version} at ${ip}:${port}`);
    return key;
  }

  unregister(name, version, ip, port) {
    const key = name + version + ip + port;
    delete this.services[key];
    this.log.debug(`Unregistered service ${name}, version ${version} at ${ip}:${port}`);
    return key;
  }

  cleanup() {
    const now = Math.floor(new Date() / 1000);
    Object.keys(this.services).map((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        this.log.debug(`Removed service ${key}`);
      }
    });
  }
}

module.exports = ServiceRegistry;
