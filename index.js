'use strict';

const api = require('./api');

/**
 * ==============================================
 * Start application.
 * ==============================================
 */
const port = process.env.PORT || 3000;
let proc = api.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

/**
 * ==============================================
 * Graceful(ish) death
 * ==============================================
 */
process.on('SIGINT', function() {
  proc.close();
  process.exit();
});
