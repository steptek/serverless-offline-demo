# Serverless REST API with DynamoDB, Kinesis and offline support (Containerized)

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Todos stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.  It provides a REST API to send msg to a Kinesis Stream and a local Kinesis stream instance is running locally by using the docker image
[instructure/kinesalite](https://hub.docker.com/r/instructure/kinesalite/). 
A Kinesis Stream consumer use the npm module [local-kinesis-lambda-runner](https://github.com/rabblerouser/local-kinesis-lambda-runner)
to poll the kisesis stream and trigger the associated lambda function.


## Use-case

Test your service locally, without having to deploy it first.

## Setup & Run service offline

```bash
sh start.sh
```
## Usage

## 1

You can use the publihsed API function to get data from kinesis stream:
### Search by term

```bash
curl  -H "Content-Type:application/json" http://0.0.0.0:3000/ads/housing 
```


## 2

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST -H "Content-Type:application/json" http://0.0.0.0:3000/todos --data '{ "text": "Learn Serverless" }'
```

No output

### List all Todos

```bash
curl -H "Content-Type:application/json" http://0.0.0.0:3000/todos
```

Example output:
```bash
[{"text":"Deploy my first service","id":"ac90fe80-aa83-11e6-9ede-afdfa051af86","checked":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"20679390-aa85-11e6-9ede-afdfa051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -H "Content-Type:application/json" http://0.0.0.0:3000/todos/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT -H "Content-Type:application/json" http://0.0.0.0:3000/todos/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE -H "Content-Type:application/json" http://0.0.0.0:3000/todos/<id>
```

No output

### Send msg to a kinesis stream
```bash
curl -X POST -H "Content-Type:application/json" http://0.0.0.0:3000/notify --data '{ "text": "Learn Serverless Kinesis" }'
```
