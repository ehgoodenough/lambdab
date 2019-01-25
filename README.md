# Lambdab #

A wrapper for HTTP lambdas.

### How to Use ###

```js
// HTTP 200 - "Hello World"
module.exports.handler = new Lambdab(function(event) {
    return "Hello World"
})
```

```js
// HTTP 500 - "Something went wrong." (logs the actual error)
module.exports.handler = new Lambdab(function(event) {
    throw new Error()
})
```

```js
// HTTP 400 - "Request is not valid JSON"
module.exports.handler = new Lambdab(function(event) {
    throw new Lambdab.UserError("Request is not valid JSON")
})
```

```js
// One second - HTTP 200 - "Hello World"
module.exports.handler = new Lambdab(async function(event) {
    await new Timeout(1000)
    return "Hello World"
})
```

```js
Lambdab.headers["Access-Control-Allow-Origin"] = "*"
```

Body is always JSON-ified.
