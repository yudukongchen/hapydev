import {
  HTTP_AUTH,
  HTTP_AUTH_TYPE,
  TYPE_AUTH_API_KEY,
  TYPE_AUTH_ASAP,
  TYPE_AUTH_AWSV4,
  TYPE_AUTH_BASIC,
  TYPE_AUTH_BEARER,
  TYPE_AUTH_DIGEST,
  TYPE_AUTH_EDGEGRID,
  TYPE_AUTH_HAWK,
  TYPE_AUTH_JWT,
  TYPE_AUTH_NTLM,
  TYPE_AUTH_OAUTH1,
  TYPE_AUTH_OAUTH2,
} from '#types/auth/http';

export const HTTP_AUTH_TYPES: { [key in HTTP_AUTH_TYPE]: string } = {
  inherit: '从父级继承',
  noauth: 'No Auth',
  apikey: 'API Key',
  basic: 'Basic Auth',
  bearer: 'Bearer Token',
  jwt: 'JWT Bearer',
  digest: 'Digest Auth',
  oauth1: 'OAuth 1.0',
  oauth2: 'OAuth 2.0',
  hawk: 'Hawk Authentication',
  awsv4: 'AWS Signature',
  ntlm: 'NTLM Authentication',
  edgegrid: 'Akamai EdgeGrid',
  asap: 'ASAP(Atlassian)',
};

export const DEFAULT_HTTP_AHTH_BASIC: TYPE_AUTH_BASIC = { username: '', password: '' };
export const DEFAULT_HTTP_AHTH_BEARER: TYPE_AUTH_BEARER = { token: '' };
export const DEFAULT_HTTP_AHTH_JWT: TYPE_AUTH_JWT = {
  payload: '{}',
  header: '{}',
  queryParamKey: '',
  secret: '',
  addTokenTo: 'header',
  isSecretBase64Encoded: -1,
  algorithm: 'HS256',
  headerPrefix: 'Bearer',
};

export const DEFAULT_HTTP_AHTH_DIGEST: TYPE_AUTH_DIGEST = {
  username: '',
  password: '',
  realm: '',
  nonce: '',
  algorithm: 'MD5',
  qop: '',
  nonceCount: '',
  clientNonce: '',
  opaque: '',
  disableRetryRequest: -1,
};

export const DEFAULT_HTTP_AHTH_OAUTH1: TYPE_AUTH_OAUTH1 = {
  addParamsToHeader: -1,
  signatureMethod: 'HMAC-SHA1',
  consumerKey: '',
  consumerSecret: '',
  token: '',
  privateKey: '',
  tokenSecret: '',
  callback: '',
  verifier: '',
  timestamp: '',
  nonce: '',
  version: '',
  realm: '',
  includeBodyHash: 1,
  addEmptyParamsToSign: 1,
  disableHeaderEncoding: -1,
};

export const DEFAULT_HTTP_AHTH_OAUTH2: TYPE_AUTH_OAUTH2 = {
  addTokenTo: 'header',
  currentToken: null,
  grant_type: 'authorization_code',
  refreshTokenUrl: '', //二次刷新url地址
  state: '',
  scope: '',
  clientSecret: '',
  clientId: '',
  accessTokenUrl: '',
  authUrl: '',
  redirect_uri: '',
  client_authentication: 'header',
  fllowAcceccTokenUrl: 1,
};

export const DEFAULT_HTTP_AHTH_HAWK: TYPE_AUTH_HAWK = {
  authId: '',
  authKey: '',
  algorithm: 'SHA256',
  user: '',
  nonce: '',
  extraData: '',
  app: '',
  delegation: '',
  timestamp: '',
  includePayloadHash: -1,
};

export const DEFAULT_HTTP_AHTH_AWSV4: TYPE_AUTH_AWSV4 = {
  addAuthDataToQuery: -1,
  accessKey: '',
  secretKey: '',
  region: '',
  service: '',
  sessionToken: '',
};

export const DEFAULT_HTTP_AHTH_NTLM: TYPE_AUTH_NTLM = {
  disableRetryRequest: -1,
  username: '',
  password: '',
  domain: '',
  workstation: '',
};

export const DEFAULT_HTTP_AHTH_API_KEY: TYPE_AUTH_API_KEY = {
  key: '',
  value: '',
  in: 'header',
};

export const DEFAULT_HTTP_AHTH_EDGEGRID: TYPE_AUTH_EDGEGRID = {
  accessToken: '',
  clientToken: '',
  clientSecret: '',
  nonce: '',
  timestamp: '',
  baseURi: '',
  headersToSign: '',
  maxBodySize: null,
};

export const DEFAULT_HTTP_AHTH_ASAP: TYPE_AUTH_ASAP = {
  alg: 'RS256',
  iss: '',
  aud: '',
  kid: '',
  privateKey: '',
  sub: '',
  claims: '',
  exp: '',
};

export const DEFAULT_HTTP_AHTH: HTTP_AUTH = {
  type: 'noauth',
};

export const DEFAULT_HTTP_AUTH_DATAS = {
  basic: DEFAULT_HTTP_AHTH_BASIC,
  bearer: DEFAULT_HTTP_AHTH_BEARER,
  jwt: DEFAULT_HTTP_AHTH_JWT,
  digest: DEFAULT_HTTP_AHTH_DIGEST,
  oauth1: DEFAULT_HTTP_AHTH_OAUTH1,
  oauth2: DEFAULT_HTTP_AHTH_OAUTH2,
  hawk: DEFAULT_HTTP_AHTH_HAWK,
  awsv4: DEFAULT_HTTP_AHTH_AWSV4,
  ntlm: DEFAULT_HTTP_AHTH_NTLM,
  apikey: DEFAULT_HTTP_AHTH_API_KEY,
  edgegrid: DEFAULT_HTTP_AHTH_EDGEGRID,
  asap: DEFAULT_HTTP_AHTH_ASAP,
};

export const hawkPlaceholder = {
  authId: 'Auth Id',
  authKey: 'Auth Key',
  algorithm: 'select',
  user: 'Username',
  nonce: 'Nonce',
  extraData: 'e.g. some-app-extra-data',
  app: 'Application ID',
  delegation: 'e.g. delegated-by',
  timestamp: 'TimeStamp',
};

export const hawkAlgotithOptions = ['SHA256', 'SHA1'];

export const awsPlaceholder = {
  accessKey: 'Access Key',
  secretKey: 'Secret Key',
  region: 'e.g. us-east-1',
  service: 'e.g. s3',
  sessionToken: 'Session Token',
};

export const ntlmPlacrholder = {
  username: 'Username',
  password: 'password',
  domain: 'e.g. example.com',
  workstation: 'e.g. someone-PC',
};

export const edgegridPlaceholder = {
  accessToken: 'Access Token',
  clientToken: 'Client Token',
  clientSecret: 'Client Secret',
  nonce: 'Nonce',
  timestamp: 'Timestamp',
  baseURi: 'Base Url',
  headersToSign: 'Header To Sign',
};

export const OAuth1MethodsOptions = [
  'HMAC-SHA1',
  'HMAC-SHA256',
  'HMAC-SHA512',
  'RSA-SHA1',
  'RSA-SHA256',
  'RSA-SHA512',
  'PLAINTEXT',
];
