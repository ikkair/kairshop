// Import database module api
const { Pool } = require('pg');

// Database configs
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

// Export config to module
module.exports = {pool};