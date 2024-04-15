import {createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as devalue from 'devalue';
import uid from '../utils/uid';

/**
 * 从存储中获取指定键对应的值。
 * @param key 需要获取值的键，类型为字符串。
 */
export async function getAsyncStorageItem<T>(
  key: string,
): Promise<T | undefined> {
  const str = await AsyncStorage.getItem(key);
  if (str) {
    try {
      return devalue.parse(str);
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
}

/**
 * 将给定的键值对存储到某个存储介质中。
 * @param key 用于标识存储项的字符串。
 * @param value 需要存储的值，可以是任意类型。如果未定义，则删除对应键的存储项。
 */
export async function setAsyncStorageItem<T>(key: string, value?: T) {
  // 如果值未定义，则删除存储项；否则，将值序列化后存储。
  if (value !== undefined) {
    console.log(devalue.stringify(value));
    await AsyncStorage.setItem(key, devalue.stringify(value));
  } else {
    await AsyncStorage.removeItem(key);
  }
}

export const StorageContext = createContext<{
  store: Record<string, any>;
  setStore: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}>({
  store: {},
  setStore: () => {},
});

export function useStorage<T>(name: string, defaultValue: T) {
  const {store, setStore} = useContext(StorageContext);
  const storageKey = `since:storage:${name}`;

  function setValue(val?: T) {
    setStore(prev => {
      const next = {...prev, [name]: val};
      setAsyncStorageItem(storageKey, next).then();
      return next;
    });
  }

  let value = (store[name] as T) || defaultValue;
  if (store[name] === undefined) {
    getAsyncStorageItem<T>(name).then(val => {
      setValue(val);
    });
  }
  return {value, setValue};
}

export function useListStorage<T extends {id: string}>(name: string) {
  const {value: listItems, setValue: setListItems} = useStorage<T[]>(name, []);

  function getItemById(id: string) {
    return listItems.find(item => item.id === id);
  }
  function prependItem(item: Omit<T, 'id'>) {
    const newItem = {...item, id: uid()} as T;
    const newList = [newItem, ...listItems];
    setListItems(newList);
  }

  function appendItem(item: Omit<T, 'id'>) {
    const newItem = {...item, id: uid()} as T;
    const newList = [...listItems, newItem];
    setListItems(newList);
  }

  function removeItem(id: string) {
    const newList = listItems.filter(item => item.id !== id);
    setListItems(newList);
  }

  function editItem(id: string, newItem: Omit<T, 'id'>) {
    const newList = listItems.map(item => {
      if (item.id === id) {
        return {...newItem, id} as T;
      }
      return item;
    });
    setListItems(newList);
  }

  return {
    listItems,
    getItemById,
    prependItem,
    appendItem,
    editItem,
    removeItem,
  };
}
