const { OAuth2Server } = require('oauth2-mock-server')
global.atob = require('atob');

async function startServer() {
  const server = new OAuth2Server()
  await server.issuer.keys.generateRSA();
  await server.start(8080, 'localhost');

  return server.service
}

startServer()
  .then((service) => {
    service.on('beforeUserinfo', (userInfoResponse, req) => {
      const email = parseTestEmail(req.query.state);

      userInfoResponse.body = {
        "email": email !== null ? email : "someone-social@facebook.com",
        "firstName": "Party",
        "lastName": "Pete",
      }
    })
  })
  .catch((e) => console.log('Something went wrong starting the server: ', e))

function parseTestEmail(state) {
  try {
    const stateStr = atob(state)
    const stateObj = JSON.parse(stateStr);

    return typeof stateObj.testEmail !== 'undefined' ? stateObj.testEmail : null;
  } catch (e) {
    return null;
  }
}
