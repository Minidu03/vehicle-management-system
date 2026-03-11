const oracledb = require('oracledb');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Oracle Database Configuration
const oracleConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_SERVICE}`,
  poolMin: parseInt(process.env.ORACLE_POOL_MIN) || 2,
  poolMax: parseInt(process.env.ORACLE_POOL_MAX) || 10,
  poolIncrement: parseInt(process.env.ORACLE_POOL_INCREMENT) || 1,
  poolTimeout: 60,
  stmtCacheSize: 23
};

// MongoDB Configuration
const mongoConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle_management',
  dbName: process.env.MONGODB_DB_NAME || 'vehicle_management'
};

// Oracle Database Connection
class OracleDB {
  constructor() {
    this.pool = null;
  }

  async initialize() {
    try {
      this.pool = await oracledb.createPool(oracleConfig);
      console.log('Oracle connection pool created successfully');
    } catch (error) {
      console.error('Error creating Oracle connection pool:', error);
      throw error;
    }
  }

  async getConnection() {
    if (!this.pool) {
      await this.initialize();
    }
    return await this.pool.getConnection();
  }

  async execute(query, params = [], options = {}) {
    let connection;
    try {
      connection = await this.getConnection();
      const result = await connection.execute(query, params, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        ...options
      });
      return result;
    } catch (error) {
      console.error('Error executing Oracle query:', error);
      throw error;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  async executeMany(query, params = [], options = {}) {
    let connection;
    try {
      connection = await this.getConnection();
      const result = await connection.executeMany(query, params, options);
      return result;
    } catch (error) {
      console.error('Error executing Oracle query many:', error);
      throw error;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.close();
      console.log('Oracle connection pool closed');
    }
  }
}

// MongoDB Connection
class MongoDB {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async initialize() {
    try {
      this.client = new MongoClient(mongoConfig.uri);
      await this.client.connect();
      this.db = this.client.db(mongoConfig.dbName);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  getCollection(collectionName) {
    if (!this.db) {
      throw new Error('MongoDB not connected');
    }
    return this.db.collection(collectionName);
  }

  async close() {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Create instances
const oracleDB = new OracleDB();
const mongoDB = new MongoDB();

// Initialize connections
async function initializeDatabases() {
  try {
    await Promise.all([
      oracleDB.initialize(),
      mongoDB.initialize()
    ]);
    console.log('All databases initialized successfully');
  } catch (error) {
    console.error('Error initializing databases:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await Promise.all([
    oracleDB.close(),
    mongoDB.close()
  ]);
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await Promise.all([
    oracleDB.close(),
    mongoDB.close()
  ]);
  process.exit(0);
});

module.exports = {
  oracleDB,
  mongoDB,
  initializeDatabases
};
