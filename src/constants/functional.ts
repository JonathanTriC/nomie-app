import { MMKV, Mode } from 'react-native-mmkv';

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

export {
  storage,
  handlerGetItem,
  handlerSetItem,
  handlerRemoveItem,
  handlerClearItem,
};
