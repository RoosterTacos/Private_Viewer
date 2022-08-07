module.exports = {
    encrypt: function(fileName){
        let splitName = fileName.split('.');
    
        let prefix = encryptFileExt(splitName[1]);
        let suffix = encryptFileName(splitName[0]);
    
        return prefix + suffix;
    },
    
    decrypt: function(fileName){
        let prefix = decryptFileName(fileName);
        let suffix = decryptExt(fileName);
    
        return prefix + '.' + suffix;
    },

}
    
const encryptFileName = (fileName) => {    
    let string = '';
    
    fileName.split('').forEach(char => {
        let code = char.charCodeAt(0);
        string += code + '#';
    })
    
    return string;
}

const encryptFileExt = (fileName) => {
    let string = '^';
    
    fileName.split('').forEach(char => {
        let code = char.charCodeAt(0);
        string += code + '#';
    })
    
    return string + '^';
}

const decryptFileName = (fileName) => {
    let decryptedFileName = '';
    let charArr = fileName.split('^')[2].split('#');

    charArr.forEach(char =>{
        if(char){
            decryptedFileName += String.fromCharCode(parseInt(char));
        }
    })
    
    return decryptedFileName;
}

const decryptExt = (fileName) => {
    let decryptedExt = '';
    let charArr = fileName.match(/\^(.*)\^/).pop().split('#');
    charArr.forEach(char =>{
        if(char){
            decryptedExt += String.fromCharCode(parseInt(char));
        }
    })

    return decryptedExt;
}