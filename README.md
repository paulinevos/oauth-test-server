# OAuth 2 Test Server

Use this server to test OAuth functionality in your codebase. Docs for the underlying library 
[can be found here](https://github.com/axa-group/oauth2-mock-server#readme).

## To start the server:
- run `npm start`

## Control returned user info
The email address returned in `/userinfo` defaults to `someone-social@facebook.com`.
To dynamically request a given email address to be returned from `/userinfo`, 
send a base64 encoded json string in the `state` parameter at the start of your OAuth flow:

```json
{
    "testEmail": "foo@bar.com" 
}
```

The user returned in the `/userinfo` response will have the email address provided in the `state` parameter.

Read the [documentation for supported endpoints](https://github.com/axa-group/oauth2-mock-server/)
