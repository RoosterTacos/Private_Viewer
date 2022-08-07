const crypt = require('./encryption.js');
const fs = require('fs');
const process = require('process');
const { encrypt } = require('./encryption.js');


// Store path argument
let mode = process.argv[2];
let path = process.argv[3];

console.log(path, mode);

const hide = (path, mode) => {
    // Move into target directory
    process.chdir(path)

    // Grab all file / folder names in current directory
    let contents = fs.readdirSync(path);

    let directories = [];

    // Loop over all files and directories in current directory
    contents.forEach((el, ind) => {

        // If current element is a directory, add it to the directories array
        if(fs.lstatSync(`./${el}`).isDirectory()){
            directories.push(`${path}/${el}`);
        } 
        else {
        // Otherwise either encrypt / decrypt the file name based on the given mode
            if(mode === 'enc'){
                let newName = crypt.encrypt(el);
                fs.rename(el, newName, ()=> {});
            } else if( mode === 'dec'){
                let newName = crypt.decrypt(el);
                fs.rename(el, newName, ()=> {}); 
            }
        }
    })

    // Recursivley run the function on all directories in array
    directories.forEach(dir =>{
        hide(dir, mode);
    })
}

hide(path, mode);