### This script is designed to automate registration on the Aztec whitelist using the AdsPower API.

---

Instructions:

1. **Install Node.js**: Ensure Node.js is installed on your machine. [Download Node.js](https://nodejs.org/)
2. add emails in `email.txt` file
3. add profile in `profiles.txt` file
4. Warning! It is recommended to use 1 profile per 10 emails. If you have 100 emails and 3 profiles, then after 30 emails, the addition will start again from the first profile, which increases the likelihood of exceeding the request limit for a single IP.
5. in terminal

```js
npm i
npm node mail.js
```
