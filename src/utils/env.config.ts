import * as dotenv from 'dotenv';

export function getDotEnv() : void {
  dotenv.config();
  let path1;
  switch (process.env.NODE_ENV) {
  case 'test':
    path1 = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path1 = `${__dirname}/../../.env.production`;
    break; 
  default:
    path1 = `${__dirname}/../../.env.development`;
  }
  dotenv.config({ path: path1 }); 
  console.log('-------------------------------------------------------'+path1);
}