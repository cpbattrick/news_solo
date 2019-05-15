const createRef = (arr, key, value) => {
  if (!arr.length) return {};
  return arr.reduce((acc, curr) => {
    acc[curr[key]] = curr[value];
    return acc;
  }, {});
};

const renameKeys = (arr, keyChange, key) => {
  return arr.map(x => {
    const newObj = { ...x };
    newObj[key] = newObj[keyChange];
    delete newObj[keyChange];
    return newObj;
  });
};

module.exports = { createRef, renameKeys };
