// Made Thursday, Janaury 25th, 2024
// Encrypts and Decrypts when called
import crypto from 'crypto'
import { NextResponse } from 'next/server'

export async function POST(req: Request, res: Response) {
    const data = await req.json();
    const ckey = "qsdfjejx128501jashfeaas"
    // If the call was for encryption
    if (data.type=="e") {
        try {
            const iv = crypto.randomBytes(16);
            const key = crypto.createHash('sha256').update(ckey).digest('base64').substr(0, 32);
            const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        
            let encrypted = cipher.update(data.txt);
            encrypted = Buffer.concat([encrypted, cipher.final()])
            // Returns the data
            return NextResponse.json({data: `${iv.toString('hex')}:${encrypted.toString('hex')}`})
      
        } catch (error) {
            console.log(error);
            return new Response("ERROR", {status:302})
        }
    } else if (data.type == "d") { // Decrypt the string
        try {
            const textParts = (data.txt).split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
        
            const encryptedData = Buffer.from(textParts.join(':'), 'hex');
            const key = crypto.createHash('sha256').update(ckey).digest('base64').substr(0, 32);
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            
            const decrypted = decipher.update(encryptedData);
            const decryptedText = Buffer.concat([decrypted, decipher.final()]);
            // Returns the Data
            return NextResponse.json({data: decryptedText.toString()})
          } catch (error) {
            console.log(error)
            return new Response("ERROR", {status:302})
          }
    } 
    return new Response("invalid type", {status:602})
}