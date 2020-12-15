//import _, { at } from 'lodash'; 
import { v4 as uuidv1 } from 'uuid';

//Generates a v1 UUID
export const generateUserUUIDv1 = () => {
  return uuidv1();
};

//Return if an email is valid
export const emailIsValid = (email: string) => {
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email) ?  true :  false; 
};

//Format the date
export const dateFormatter = (today : Date) => {
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return date+' '+time; 
};

// rename the key of a object 
export const renameKey = (obj : any, oldName : any, newName : any) => {     
  obj[newName] = obj[oldName];
  delete obj[oldName];  
  return obj; 
}; 

// delete fields in an object 
export const deleteObjectFields = (obj: any, ...attibutesToDelete : any[]) => {    
  attibutesToDelete.forEach( (attr) => {
    delete obj[attr];
    //_.unset(obj, attr);
  });
  return obj;
}; 

// filter fields of an object and delete the filed that aren't in the 2nd parameter 
export const filterObjectFields = (obj: any, ...attibutesToDelete : any[]) => { 
  Object.keys(obj).forEach( (key) => {
    if( !attibutesToDelete.some( (attr: string) => attr === key )){
      delete obj[key];
    }
  });
  return obj;
}; 
