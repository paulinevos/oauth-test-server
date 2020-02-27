const { OAuth2Server } = require('oauth2-mock-server')

let server = new OAuth2Server()

async function startServer() {
  await server.issuer.keys.generateRSA();
  await server.start(8080, 'localhost');
}

startServer()
  .then(() => console.log('Issuer URL:', server.issuer.url))
  .catch((e) => console.log('Something went wrong starting the server: ', e))
