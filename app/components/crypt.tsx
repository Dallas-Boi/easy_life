// Made Thursday, January 11th, 2024
// This encrypts and decrypts given strings

import { AES } from 'crypto-ts';
const key = "047fcbc4010a900fa142d3473ea6552031f6391036fe40fb21d824c1d93bdbe9";

// When Called it will return the encrypted message
export const encryptMsg = async (msg: string) => {
    return AES.encrypt(msg, key).toString();
}
// When Called it will return the decrypted message
export const decryptMsg = async (msg: string) => {
    return AES.decrypt(msg, key).toString();
}