// Usage: node encrypt-people.mjs <people.private.json> <passphrase>
// Re-encrypts the people list into data.js (PEOPLE_ENC + peopleCount values).
// Keep people.private.json and the passphrase OUT of the repo.
import fs from "node:fs";
import { webcrypto as crypto } from "node:crypto";
const [,, jsonPath, passphrase] = process.argv;
if (!jsonPath || !passphrase) { console.error("usage: node encrypt-people.mjs people.private.json <passphrase>"); process.exit(1); }
const orgs = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const people = orgs.map(o => o.people || []);
const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey("raw", enc.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 310000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(JSON.stringify(people))));
const b64 = u => Buffer.from(u).toString("base64");
let src = fs.readFileSync("data.js", "utf8");
src = src.replace(/salt: "[^"]*"/, `salt: "${b64(salt)}"`).replace(/iv: "[^"]*"/, `iv: "${b64(iv)}"`).replace(/data: "[^"]*"/, `data: "${b64(ct)}"`);
let i = 0;
src = src.replace(/peopleCount: \d+/g, () => `peopleCount: ${people[i++].length}`);
if (i !== people.length) throw new Error(`data.js has ${i} orgs, JSON has ${people.length}`);
fs.writeFileSync("data.js", src);
console.log(`encrypted ${people.flat().length} people across ${people.length} orgs`);
