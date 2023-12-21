const checkKeys = (item: any) => {
  Object.keys(item).forEach((itemKey) => {
    if (
      itemKey.includes('Id') &&
      typeof item[itemKey] === 'object' &&
      !Array.isArray(item[itemKey]) &&
      item[itemKey]
    ) {
      item[itemKey] = item[itemKey].toString();
    }

    if (item._id) {
      item.id = item._id.toString();
      delete item._id;
    }
  });

  return item;
};

export const toJSONCallback = {
  virtuals: true,
  transform: (document, returnedObject) => {
    // console.log('returnedObject', returnedObject);
    returnedObject = checkKeys(returnedObject);
    delete returnedObject._id;
    delete returnedObject.__v;

    Object.keys(returnedObject).forEach((key) => {
      if (Array.isArray(returnedObject[key])) {
        // console.log('returnedObject[key]', returnedObject[key]);
        returnedObject[key].map((item) => {
          return checkKeys(item);
        });
      }
    });
  },
};
