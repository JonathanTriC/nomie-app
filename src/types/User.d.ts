type GetProfileResponse = {
  user_id?: number;
  avatar?: string;
  email?: string;
  fullname?: string;
  username?: string;
};

type UpdateProfileResponse = {
  message: string;
  user: User;
};

type User = {
  avatar: string;
  email: string;
  fullname: string;
  token: string;
  user_id: number;
  username: string;
};
