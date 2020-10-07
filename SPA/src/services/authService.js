/* eslint-disable */
import Oidc from 'oidc-client';
import 'babel-polyfill';

var oidcClient = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),  
  authority: 'https://localhost:44342/',
  client_id: 'code_flow_client_id',
  redirect_uri: 'https://localhost:5002/signin-callback',
  response_type: 'code',
  scope: 'openid profile api',
  post_logout_redirect_uri: 'https://localhost:5002/signout-callback',
  silent_redirect_uri: window.location.origin + '/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

oidcClient.events.addUserLoaded(function (user) {  
  console.log('New User Loaded：', arguments);
  console.log('Acess_token: ', user.access_token)
});

oidcClient.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments);
});

oidcClient.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments);  
  //alert('Session expired. Going out!');
  oidcClient.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

oidcClient.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

oidcClient.events.addUserSignedOut(function () {
  //alert('Going out!');
  console.log('UserSignedOut：', arguments);  
  oidcClient.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

export default class SecurityService {

    login() {
        return oidcClient.signinRedirect(); // Returns promise to trigger a redirect of the current window to the authorization endpoint.
      }
    
      async isLoggedIn() {
        const user = await oidcClient.getUser();
        const userCurrent = !!user && !user.expired;

        return userCurrent;
      }
    
      async completeLogin() {
        const user = await oidcClient.signinRedirectCallback() // Returns promise to process response from the authorization endpoint. The result of the promise is the authenticated User
          ;
       
        return user;
      }
    
      logout() {
        oidcClient.signoutRedirect(); // Returns promise to trigger a redirect of the current window to the end session endpoint.
      }
    
      completeLogout() {

       
        return oidcClient.signoutRedirectCallback(); // Returns promise to process response from the end session endpoint.
      }
    
      async getAccessToken() {
        const user = await oidcClient.getUser() // Returns promise to load the User object for the currently authenticated user.
          ;
        return !!user && !user.expired ? user.access_token : null
    
      }

}

