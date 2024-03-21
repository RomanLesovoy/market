import { Amplify, Auth } from 'aws-amplify';

const awsauth = {
  "domain": "",
  "scope": [
    "email",
    "openid",
    "phone",
    "aws.cognito.signin.user.admin"
  ],
  "redirectSignIn": "%host%/exchange",
  "redirectSignOut": "%host%/logout",
  "responseType": "code"
}

const awsconfig = {
  "region": "us-east-1",
  "userPoolId": "us-east-1_3Iq1Cisn1",
  "userPoolWebClientId": "3mqqalpv6hbf9fig7pljdk2s23",
  "mandatorySignIn": false,
  "redirectSignIn": "%host%/exchange",
  "redirectSignOut": "%host%/logout",
  "cookieStorage": {
    "domain": "domain",
    "secure": true
  }
}

export default awsconfig;

export function initializeAmplify() {
  const host = `${window.location.protocol}//${window.location.host}`;
  awsconfig.cookieStorage.domain = window.location.hostname;
  awsauth.redirectSignIn = awsauth.redirectSignIn.replace('%host%', host);
  awsauth.redirectSignOut = awsauth.redirectSignOut.replace('%host%', host);
  awsconfig.redirectSignIn = awsauth.redirectSignIn;
  awsconfig.redirectSignOut = awsauth.redirectSignOut;
  awsauth.domain = 'auth-oms-demo.auth.us-east-1.amazoncognito.com';

  Amplify.configure({ ...awsconfig });
  Auth.configure({ awsconfig, storage: window.localStorage, oauth: { ...awsauth } });
}