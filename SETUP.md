# Setup

Dependencies:
1. Node (es6 or later).
2. NPM.
3. Bash.
4. eslint (optional).
5. Node supervisor (optional).
6. Mocha (optional, for testing).

To Run:
1. Run `npm install`.
2. Start the server by either using "node" or "supervisor": `node app.js`.
3. Run the curl helper script: `./curlHelper.sh`.

To Test:
1. Make sure Mocha is installed globally. If not, you can run it from the node_modules folder.
2. Run `mocha`.
   1. Note the tests might take a while to run since there's a random delay per API request.
3. The tests are location under the `test` folder.
