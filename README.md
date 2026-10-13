# tuba-portfolio

Portfolio — SDS compass of my work + network of people and institutions.
Published at https://tubaali.github.io/tuba-portfolio/

## People in the network graph (encrypted)

The names and profile links of the people inside each organization on `network.html`
are stored encrypted in `data.js` (`PEOPLE_ENC`: AES-256-GCM, key from PBKDF2-SHA256).
The page asks for a passphrase and decrypts in the browser only; nothing leaves the page.

To edit the list: update `people.private.json` (kept outside the repo), then run

```
node encrypt-people.mjs /path/to/people.private.json "<passphrase>"
```
