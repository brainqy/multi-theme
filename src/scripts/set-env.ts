import { environment } from "src/app/Core/application_constant/environment";

// set-env.ts
const { writeFileSync } = require('fs');
require('dotenv').config(); // Load variables from .env

const targetPath = './src/environments/environment.prod.ts';
const apiKey = environment.firebaseConfig.apiKey as string;


if (!apiKey) {
  throw new Error("Environment variable FIREBASE_BRAINQ_API_KEY is not defined");
}

const envConfigFile = `
export const environment = {
  production: true,
  apiKey: "${process.env['FIREBASE_BRAINQ_API_KEY'] || ''}"
};
`;


writeFileSync(targetPath, envConfigFile);
console.log(`Environment file generated at ${targetPath}`);
