# Microservices Nodejs

Sample application of microservices with Nodejs

## Getting started

Go to all subfolders and install packages. 

```sh
npm install
```

After that, start the application locally with

```sh
npm start
```

Go to homepage at: http://localhost:3080

## Install RabbitMQ

On MAC machine

```sh
brew install rabbitmq
```

Start RabbitMQ server. Check for the path after you install rabbitmq.

```sh
 /usr/local/Cellar/rabbitmq/3.7.16/sbin/rabbitmq-server 
```

Test Message Queue at: http://localhost:3080/feedback
