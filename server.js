const prerender = require('prerender');

// const forwardHeaders = require('./plugins/forwardHeaders');
// const stripHtml = require('./plugins/stripHtml');
// const healthcheck = require('./plugins/healthcheck');
// const removePrefetchTags = require('./plugins/removePrefetchTags');
// const log = require('./plugins/log');
// const consoleDebugger = require('./plugins/consoleDebugger');

const options = {
	pageDoneCheckInterval: process.env.PAGE_DONE_CHECK_INTERVAL || 500,
	pageLoadTimeout: process.env.PAGE_LOAD_TIMEOUT || 20000,
	waitAfterLastRequest: process.env.WAIT_AFTER_LAST_REQUEST || 250,
	chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars' ],
};
// console.log('Starting with options:', options);

const server = prerender(options);

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());


process.env.CACHE_TTL=60*60*24;
server.use(require('prerender-memory-cache'));

server.start();
