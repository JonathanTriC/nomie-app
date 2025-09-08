type RefreshTokenResponse = {
  access_token?: string;
};

type CheckEmailResponse = {
  isRegistered?: boolean;
};

type LoginResponse = {
  expires_in?: number;
  token?: string;
  token_type?: string;
};

type RegisterResponse = {
  avatar?: string;
  message?: string;
  user_id?: number;
};
