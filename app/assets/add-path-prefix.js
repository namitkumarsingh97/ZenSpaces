function addPathPrefix(path) {
    if (typeof path !== 'string') {
        console.error('Expected path to be a string, but got:', path);
        return path;
    }
    
    const prefix = 'http://localhost:3000';
    if (!path.startsWith(prefix)) {
        return prefix + path;
    }
    
    return path;
}

export default addPathPrefix;
