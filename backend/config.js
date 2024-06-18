const fs = require("fs");
const path = require("path");
const ini = require("ini");

function loadConfig() {
  const configFile = path.resolve(__dirname, "../settings.ini");
  if (fs.existsSync(configFile)) {
    const config = ini.parse(fs.readFileSync(configFile, "utf-8"));
    return config.default;
  }
  return {};
}

const config = loadConfig();

module.exports = config;
