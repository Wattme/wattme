import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (data, name) => {

  return await AsyncStorage.setItem(name, data);

};
const getItem = async (name) => {

  try {
    const value = await AsyncStorage.getItem(name)
    if(value !== null) {
      return value
    }
  } catch(e) {
    return ""
  }

};
const removeItem = async (name) => {

  return await AsyncStorage.removeItem(name);

};
const clearAll = async () => {

  return await AsyncStorage.clear();

};

export {
  clearAll,
  getItem,
  removeItem,
  setItem,
};
