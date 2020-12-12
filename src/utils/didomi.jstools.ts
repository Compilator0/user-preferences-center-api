const {v4 : uuidv1} = require('uuid');

//Generates a v1 UUID
export const generateUserUUIDv1 = () => {
    return uuidv1();
}

//Return if an email is valid
export const emailIsValid = (email: string) => {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email) ?  true :  false; 
};

//Format the date
export const dateFormatter = (today : Date) => {
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time; 
}
