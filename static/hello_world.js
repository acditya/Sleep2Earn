"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportGreetings = exports.sayHello = exports.checkProgram = exports.establishPayer = exports.establishConnection = void 0;
var web3_js_1 = require("@solana/web3.js");
var fs_1 = require("mz/fs");
var path_1 = require("path");
var borsh = require("borsh");
var utils_1 = require("./utils");
/**
 * Connection to the network
 */
var connection;
/**
 * Keypair associated to the fees' payer
 */
var payer;
/**
 * Hello world's program id
 */
var programId;
/**
 * The public key of the account we are saying hello to
 */
var greetedPubkey;
/**
 * Path to program files
 */
var PROGRAM_PATH = path_1.default.resolve(__dirname, '../../dist/program');
/**
 * Path to program shared object file which should be deployed on chain.
 * This file is created when running either:
 *   - `npm run build:program-c`
 *   - `npm run build:program-rust`
 */
var PROGRAM_SO_PATH = path_1.default.join(PROGRAM_PATH, 'helloworld.so');
/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy dist/program/helloworld.so`
 */
var PROGRAM_KEYPAIR_PATH = path_1.default.join(PROGRAM_PATH, 'helloworld-keypair.json');
/**
 * The state of a greeting account managed by the hello world program
 */
var GreetingAccount = /** @class */ (function () {
    function GreetingAccount(fields) {
        if (fields === void 0) { fields = undefined; }
        this.counter = 0;
        if (fields) {
            this.counter = fields.counter;
        }
    }
    return GreetingAccount;
}());
/**
 * Borsh schema definition for greeting accounts
 */
var GreetingSchema = new Map([
    [GreetingAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
]);
/**
 * The expected size of each greeting account.
 */
var GREETING_SIZE = borsh.serialize(GreetingSchema, new GreetingAccount()).length;
/**
 * Establish a connection to the cluster
 */
function establishConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var rpcUrl, version;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utils_1.getRpcUrl)()];
                case 1:
                    rpcUrl = _a.sent();
                    connection = new web3_js_1.Connection(rpcUrl, 'confirmed');
                    return [4 /*yield*/, connection.getVersion()];
                case 2:
                    version = _a.sent();
                    console.log('Connection to cluster established:', rpcUrl, version);
                    return [2 /*return*/];
            }
        });
    });
}
exports.establishConnection = establishConnection;
/**
 * Establish an account to pay for everything
 */
function establishPayer() {
    return __awaiter(this, void 0, void 0, function () {
        var fees, feeCalculator, _a, lamports, sig;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fees = 0;
                    if (!!payer) return [3 /*break*/, 4];
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 1:
                    feeCalculator = (_b.sent()).feeCalculator;
                    // Calculate the cost to fund the greeter account
                    _a = fees;
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(GREETING_SIZE)];
                case 2:
                    // Calculate the cost to fund the greeter account
                    fees = _a + _b.sent();
                    // Calculate the cost of sending transactions
                    fees += feeCalculator.lamportsPerSignature * 100; // wag
                    return [4 /*yield*/, (0, utils_1.getPayer)()];
                case 3:
                    payer = _b.sent();
                    _b.label = 4;
                case 4: return [4 /*yield*/, connection.getBalance(payer.publicKey)];
                case 5:
                    lamports = _b.sent();
                    if (!(lamports < fees)) return [3 /*break*/, 9];
                    return [4 /*yield*/, connection.requestAirdrop(payer.publicKey, fees - lamports)];
                case 6:
                    sig = _b.sent();
                    return [4 /*yield*/, connection.confirmTransaction(sig)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, connection.getBalance(payer.publicKey)];
                case 8:
                    lamports = _b.sent();
                    _b.label = 9;
                case 9:
                    console.log('Using account', payer.publicKey.toBase58(), 'containing', lamports / web3_js_1.LAMPORTS_PER_SOL, 'SOL to pay for fees');
                    return [2 /*return*/];
            }
        });
    });
}
exports.establishPayer = establishPayer;
/**
 * Check if the hello world BPF program has been deployed
 */
function checkProgram() {
    return __awaiter(this, void 0, void 0, function () {
        var programKeypair, err_1, errMsg, programInfo, GREETING_SEED, greetedAccount, lamports, transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, utils_1.createKeypairFromFile)(PROGRAM_KEYPAIR_PATH)];
                case 1:
                    programKeypair = _a.sent();
                    programId = programKeypair.publicKey;
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    errMsg = err_1.message;
                    throw new Error("Failed to read program keypair at '".concat(PROGRAM_KEYPAIR_PATH, "' due to error: ").concat(errMsg, ". Program may need to be deployed with `solana program deploy dist/program/helloworld.so`"));
                case 3: return [4 /*yield*/, connection.getAccountInfo(programId)];
                case 4:
                    programInfo = _a.sent();
                    if (programInfo === null) {
                        if (fs_1.default.existsSync(PROGRAM_SO_PATH)) {
                            throw new Error('Program needs to be deployed with `solana program deploy dist/program/helloworld.so`');
                        }
                        else {
                            throw new Error('Program needs to be built and deployed');
                        }
                    }
                    else if (!programInfo.executable) {
                        throw new Error("Program is not executable");
                    }
                    console.log("Using program ".concat(programId.toBase58()));
                    GREETING_SEED = 'hello';
                    return [4 /*yield*/, web3_js_1.PublicKey.createWithSeed(payer.publicKey, GREETING_SEED, programId)];
                case 5:
                    greetedPubkey = _a.sent();
                    return [4 /*yield*/, connection.getAccountInfo(greetedPubkey)];
                case 6:
                    greetedAccount = _a.sent();
                    if (!(greetedAccount === null)) return [3 /*break*/, 9];
                    console.log('Creating account', greetedPubkey.toBase58(), 'to say hello to');
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(GREETING_SIZE)];
                case 7:
                    lamports = _a.sent();
                    transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccountWithSeed({
                        fromPubkey: payer.publicKey,
                        basePubkey: payer.publicKey,
                        seed: GREETING_SEED,
                        newAccountPubkey: greetedPubkey,
                        lamports: lamports,
                        space: GREETING_SIZE,
                        programId: programId,
                    }));
                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer])];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.checkProgram = checkProgram;
/**
 * Say hello
 */
function sayHello() {
    return __awaiter(this, void 0, void 0, function () {
        var instruction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Saying hello to', greetedPubkey.toBase58());
                    instruction = new web3_js_1.TransactionInstruction({
                        keys: [{ pubkey: greetedPubkey, isSigner: false, isWritable: true }],
                        programId: programId,
                        data: Buffer.alloc(0), // All instructions are hellos
                    });
                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, new web3_js_1.Transaction().add(instruction), [payer])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sayHello = sayHello;
/**
 * Report the number of times the greeted account has been said hello to
 */
function reportGreetings() {
    return __awaiter(this, void 0, void 0, function () {
        var accountInfo, greeting;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getAccountInfo(greetedPubkey)];
                case 1:
                    accountInfo = _a.sent();
                    if (accountInfo === null) {
                        throw 'Error: cannot find the greeted account';
                    }
                    greeting = borsh.deserialize(GreetingSchema, GreetingAccount, accountInfo.data);
                    console.log(greetedPubkey.toBase58(), 'has been greeted', greeting.counter, 'time(s)');
                    return [2 /*return*/];
            }
        });
    });
}
exports.reportGreetings = reportGreetings;
