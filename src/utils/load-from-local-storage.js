const loadFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default loadFromLocalStorage;
