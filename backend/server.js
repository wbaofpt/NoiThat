import { pool } from './db.js';
import { createApp } from './app.js';
createApp(pool).listen(process.env.PORT || 4000, () => console.log('Nép Living API ready'));
