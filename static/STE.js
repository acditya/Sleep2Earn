/*const nearAPI = require("near-api-js");

const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

const { connect } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store 
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};*/
const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();
  
let pubkey = "";

function usefunc1() {  


  const CREDENTIALS_DIR = ".near-credentials";
  const credentialsPath = path.join("/", CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

  const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
  };

  createAccount(process.argv[2], process.argv[3], process.argv[4]);
}

async function createAccount(creatorAccountId, newAccountId, amount) {
  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  await keyStore.setKey(config.networkId, newAccountId, keyPair);
  pubkey = publicKey;
  
  return await creatorAccount.functionCall({
    contractId: "testnet",
    methodName: "create_account",
    args: {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    gas: "300000000000000",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
}



//const nearConnection = await connect(connectionConfig);

$(function(){
    let username = "";
    let email = "";
    let password = "";
    //connect_solana()

    $("#input-reg-4").trigger("click",function(){
        username = $("#input-reg-1").val()
        email = $("#input-reg-2").val()
        password = $("#input-reg-3").val()
        usefunc1();
        console.log("publickey: " + pubkey);
    })
})
