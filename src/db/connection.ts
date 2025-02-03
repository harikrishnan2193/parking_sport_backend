import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// Create connection to the database
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql', // type dialect for supported DBs
    logging: false,
  }
);

// Connection testing function
async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log(`Backend connected with ${process.env.DB_NAME} database successfully...`);
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}

// Function call to test connection
testConnection();

// Export sequelize instance to use in other parts of the app
export default sequelize;
