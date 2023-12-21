import { SHA256 } from 'crypto-js';

interface IHasher {
  apiKey: string;
  data: any;
  params: any;
}

const cleanData = (hasherData: IHasher): IHasher => {
  const params = Object.entries(hasherData.params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort entries by key alphabetically
    .reduce((newObj, [key, value]) => {
      const isArray = key.includes('[]');
      const newKey = key.replace(/\[\]/g, '');
      newObj[newKey] = isArray && !Array.isArray(value) ? [value] : value;
      return newObj;
    }, {});

  const data = Object.entries(hasherData.data)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort entries by key alphabetically
    .reduce((newObj, [key, value]) => {
      const isArray = key.includes('[]');
      const newKey = key.replace(/\[\]/g, '');
      newObj[newKey] = isArray && !Array.isArray(value) ? [value] : value;
      return newObj;
    }, {});

  return {
    apiKey: hasherData.apiKey,
    data,
    params,
  };
};

export const generateAPIHash = (data: IHasher) => {
  const cleanedData = cleanData(data);
  const objectString = JSON.stringify(cleanedData);
  return SHA256(objectString).toString();
};

export const validateAPIHash = (data: IHasher, apiHash: string) => {
  const cleanedString = cleanData(data);
  const objectString = JSON.stringify(cleanedString);
  const hashedString = SHA256(objectString).toString();

  console.log('validateAPIHash', hashedString, cleanedString, data, apiHash);
  return hashedString === apiHash;
};
