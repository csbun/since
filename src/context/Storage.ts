import AsyncStorage from '@react-native-async-storage/async-storage';
import * as devalue from 'devalue';

/**
 * 从存储中获取指定键对应的值。
 * @param key 需要获取值的键，类型为字符串。
 */
export async function getItem<T>(key: string): Promise<T | undefined> {
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
export async function setItem<T>(key: string, value?: T) {
  // 如果值未定义，则删除存储项；否则，将值序列化后存储。
  if (value !== undefined) {
    console.log(devalue.stringify(value));
    await AsyncStorage.setItem(key, devalue.stringify(value));
  } else {
    await AsyncStorage.removeItem(key);
  }
}
