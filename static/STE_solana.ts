import {
    establishConnection,
    establishPayer,
    checkProgram,
    sayHello,
    reportGreetings,
  } from './hello_world';

// greet.ts
export async function connect_solana() {
    console.log("Let's say hello to a Solana account...");

    // Establish connection to the cluster
    await establishConnection();
  
    // Determine who pays for the fees
    await establishPayer();
  
    // Check if the program has been deployed
    await checkProgram();
  
    // Say hello to an account
    await sayHello();
  
    // Find out how many times that account has been greeted
    await reportGreetings();
  
    console.log('Success');
  }
