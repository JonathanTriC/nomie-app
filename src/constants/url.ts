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
    logout: `${API_VERSION}/${AUTH_PREFIX}/logout`,
  },

  // MARK: USER
  user: {
    get_profile: `${API_VERSION}/${USER_PREFIX}/profile`,
    update_profile: `${API_VERSION}/${USER_PREFIX}/update-profile`,
    change_password: `${API_VERSION}/${USER_PREFIX}/change-password`,
    delete_account: `${API_VERSION}/${USER_PREFIX}/delete-account`,
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
    search_meals: ({
      query,
      limit,
      page,
    }: {
      query?: string;
      limit?: number;
      page?: number;
    }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));
      if (page) params.append('page', String(page));

      const queryString = params.toString();
      const search = (query ?? '').replace(' ', '+');
      const searchTxt = encodeURIComponent(search);

      return `${API_VERSION}/${MEALS_PREFIX}/search/${searchTxt}${
        queryString ? `?${queryString}` : ''
      }`;
    },
    meals_category: ({
      query,
      limit,
      page,
    }: {
      query?: string;
      limit?: number;
      page?: number;
    }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));
      if (page) params.append('page', String(page));

      const queryString = params.toString();

      return `${API_VERSION}/${MEALS_PREFIX}/category/${query}${
        queryString ? `?${queryString}` : ''
      }`;
    },
    meals_area: ({
      query,
      limit,
      page,
    }: {
      query?: string;
      limit?: number;
      page?: number;
    }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));
      if (page) params.append('page', String(page));

      const queryString = params.toString();

      return `${API_VERSION}/${MEALS_PREFIX}/area/${query}${
        queryString ? `?${queryString}` : ''
      }`;
    },
    detail_meals: ({ mealId }: { mealId: string }) => {
      return `${API_VERSION}/${MEALS_PREFIX}/detail/${mealId}`;
    },
    favourites: `${API_VERSION}/${MEALS_PREFIX}/favourites`,
  },

  // MARK: Misc
  misc: {
    category: `${API_VERSION}/${MISC_PREFIX}/category`,
    area: `${API_VERSION}/${MISC_PREFIX}/area`,
  },
};
