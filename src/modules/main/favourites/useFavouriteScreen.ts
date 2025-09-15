import { apiGet } from '@api';
import { URL_PATH } from '@constants';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

const useFavouriteScreen = () => {
  const { data: dataFavorite, refetch: refetchFavorite } =
    useQuery<FavoriteMealsData>({
      queryKey: ['user-favorite'],
      queryFn: async () => {
        const data = await apiGet({
          url: `${URL_PATH.meals.favourites}`,
        });

        return data;
      },
    });

  useFocusEffect(
    useCallback(() => {
      refetchFavorite();

      return () => {};
    }, [refetchFavorite]),
  );

  return {
    dataFavorite,
  };
};

export default useFavouriteScreen;
