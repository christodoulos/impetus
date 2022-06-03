export interface Credentials {
  email: string;
  password: string;
}
export interface OAuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: Array<string>;
  token_type: string;
}
