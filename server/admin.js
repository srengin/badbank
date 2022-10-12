
import { initializeApp, cert } from 'firebase-admin/app';
import * as dotenv from 'dotenv';
dotenv.config();

export const admin= initializeApp({
  credential: cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  
});



    