export interface Message {
  message: string;
}

export interface V1Token {
  expires_at: Date;
  methods: Array<string>;
}

export interface AuthResponse {
  token: V1Token;
}
