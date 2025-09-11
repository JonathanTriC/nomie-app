export const BASE_URL = 'http://localhost:8181';
export const API_VERSION = 'v1';
export const AUTH_PREFIX = 'auth';
export const USER_PREFIX = 'user';
export const MEALS_PREFIX = 'meals';
export const MISC_PREFIX = 'misc';

export const URL_PATH = {
  // MARK: AUTH
  auth: {
    refresh_token: `${API_VERSION}/${AUTH_PREFIX}/refresh-token`,
    check_email: `${API_VERSION}/${AUTH_PREFIX}/check-email`,
    login: `${API_VERSION}/${AUTH_PREFIX}/login`,
    register: `${API_VERSION}/${AUTH_PREFIX}/register`,
  },

  // MARK: USER
  user: {
    get_profile: `${API_VERSION}/${USER_PREFIX}/profile`,
  },

  // MARK: Meals
  meals: {
    today_recommendation: `${API_VERSION}/${MEALS_PREFIX}/today-recommendation`,
    popular_picks: ({ limit, page }: { limit?: number; page?: number }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));
      if (page) params.append('page', String(page));

      const queryString = params.toString();

      return `${API_VERSION}/${MEALS_PREFIX}/popular-picks${
        queryString ? `?${queryString}` : ''
      }`;
    },
    cuisine_picks: ({ limit, page }: { limit?: number; page?: number }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));
      if (page) params.append('page', String(page));

      const queryString = params.toString();

      return `${API_VERSION}/${MEALS_PREFIX}/cuisine-picks${
        queryString ? `?${queryString}` : ''
      }`;
    },
  },
};
