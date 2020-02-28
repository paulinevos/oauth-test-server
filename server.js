const { OAuth2Server } = require('oauth2-mock-server')

async function startServer() {
  const server = new OAuth2Server()
  await server.issuer.keys.generateRSA();
  await server.start(8080, 'localhost');

  return server.service
}

startServer()
  .then((service) => {
    service.on('beforeUserinfo', (userInfoResponse, req) => {
      userInfoResponse.body = {
        "email": "someone-social@facebook.com",
        "firstName": "Party",
        "lastName": "Pete",
      }
    })
  })
  .catch((e) => console.log('Something went wrong starting the server: ', e))
