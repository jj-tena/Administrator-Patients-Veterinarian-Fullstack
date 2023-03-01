const generateId = () => {
    return Date.now().toString(32) + Math.random().toString().substring(2)
};

export default generateId;