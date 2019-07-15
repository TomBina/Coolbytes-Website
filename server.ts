// TEMP FIXES SEE: https://github.com/vikerman/v8-lazy/commit/515239be1b233946e4a1d15a8712a0bc9f5490cc
import "zone.js/dist/zone-node";
import * as compression from "compression";
// Express Engine
// Import module map for lazy loading

import * as express from "express";
import { join } from "path";

// Faster server renders w/ Prod mode (dev mode never needed)

// Express server
const app = express();
app.use(compression());

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), "browser");

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine("html", ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set("view engine", "html");
app.set("views", DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get("*.*", express.static(DIST_FOLDER, {
  maxAge: "1y"
}));

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render("index", { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
