function isEmailAddress(str) {
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return str.match(pattern);
}

function validatePasswordCharacters (str){
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/g;
    var match = str.match(pattern);
    return match;
    
}

export {
    isEmailAddress,
    validatePasswordCharacters
}