import * as Dotenv from "dotenv";

Dotenv.config();

console.log(process.env.DISCORD_BOT_TOKEN);

import app from './server';

// Start the application by listening to specific port
const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});

