import {
  IDPrefixesEnum,
  IDTypeEnum,
  UserIDEnum,
  UserIDPrefixesEnum,
} from '@src/enums';

export const generateUserID = async (
  type: UserIDEnum,
  lastID: string | null,
) => {
  const currentYear = new Date().getFullYear().toString().substring(2);
  const prefix: string = UserIDPrefixesEnum[type];

  //   let groupNumber = '000000001';
  //   let counterNumber = '000000001';

  let groupNumber = '000';
  let counterNumber = '000001';

  // console.log('currentYear', currentYear);

  if (lastID) {
    const lastIDNumber: string = lastID
      .toString()
      .replace(prefix, '')
      .replaceAll('-', '');

    // console.log('lastIDNumber', lastIDNumber);
    const lastIDYear: string = lastIDNumber.substring(0, 2);

    const lastIDGNumber: string = lastIDNumber.substring(2, 5);
    const lastIDCNumber: string = lastIDNumber.substring(5, 11);
    // console.log('lastIDYear', lastIDYear);
    // console.log('lastIDGNumber', lastIDGNumber);
    // console.log('lastIDCNumber', lastIDCNumber);

    if (currentYear !== lastIDYear) {
      groupNumber = lastIDGNumber;
    } else {
      groupNumber = (parseInt(lastIDGNumber) + 1).toString().padStart(3, '0');

      counterNumber = (parseInt(lastIDCNumber) + 1).toString().padStart(6, '0');
    }
  }

  const gNumberParts = groupNumber.match(/.{1,3}/g);
  const cNumberParts = counterNumber.match(/.{1,3}/g);

  // console.log('gNumberParts', gNumberParts);
  // console.log('cNumberParts', cNumberParts);
  // console.log('prefix', prefix);

  const generateID =
    prefix +
    currentYear +
    '-' +
    gNumberParts?.join('-') +
    '-' +
    cNumberParts?.join('-');
  // console.log('generateID', generateID);

  return generateID;
};

export const generateContinuousID = async (
  type: IDTypeEnum,
  lastID: string | null,
) => {
  const prefix: string = IDPrefixesEnum[type];

  let counterNumber = '000000001';

  if (lastID) {
    const lastIDNumber: string = lastID
      .toString()
      .replace(prefix, '')
      .replaceAll('-', '');

    // console.log('lastIDNumber', lastIDNumber);

    counterNumber = (parseInt(lastIDNumber) + 1).toString().padStart(9, '0');
  }

  const cNumberParts = counterNumber.match(/.{1,3}/g);

  // console.log('cNumberParts', cNumberParts);
  // console.log('prefix', prefix);

  const generateID = prefix + '-' + cNumberParts?.join('-');
  // console.log('generateID', generateID);

  return generateID;
};

export const generateReferralCode = () => {
  const length = 6;
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let referralCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    referralCode += chars.charAt(randomIndex);
  }

  return referralCode;
};
