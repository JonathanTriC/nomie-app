import { Dimensions } from 'react-native';
import { MMKV, Mode } from 'react-native-mmkv';
import Toast from 'react-native-toast-message';

const storage = new MMKV({
  id: 'app-storage',
  encryptionKey: 'nomie123',
  mode: Mode.MULTI_PROCESS,
  readOnly: false,
});

const handlerGetItem = (params: string) => {
  try {
    return storage.getString(params);
  } catch (error) {}
};

const handlerGetAndParseJSON = <T>(key: string): T | null => {
  try {
    const item = storage.getString(key);

    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  } catch (error) {
    console.error(`Failed to parse JSON from storage for key "${key}":`, error);
    return null;
  }
};

const handlerSetItem = async (key: string, value: string) => {
  try {
    await storage.set(key, value);
  } catch (error) {}
};

const handlerRemoveItem = async (key: string) => {
  try {
    await storage.delete(key);
  } catch (error) {}
};

const handlerClearItem = async () => {
  try {
    await storage.clearAll();
  } catch (error) {}
};

const getYouTubeId = (url: string | undefined) => {
  if (!url) return '';
  const regex =
    /(?:youtube\.com\/(?:[^/\n\s]+\/\S*?\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url?.match(regex);
  return match ? match[1] : null;
};

export const showSuccessToast = (message: string) => {
  return Toast.show({
    type: 'success',
    text1: message,
  });
};

export const showErrorToast = (
  message: string,
  position: 'top' | 'bottom' = 'bottom',
) => {
  return Toast.show({
    type: 'error',
    text1: message,
    position,
    topOffset: 70,
    visibilityTime: 5000,
  });
};

export const showDefaultToast = (message: string) => {
  return Toast.show({
    type: 'default',
    text1: message,
  });
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export {
  storage,
  screenWidth,
  screenHeight,
  handlerGetItem,
  handlerGetAndParseJSON,
  handlerSetItem,
  handlerRemoveItem,
  handlerClearItem,
  getYouTubeId,
};
