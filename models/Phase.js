// Import necessary Sequelize classes and the configured database connection
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.js';

// Define a class 'Phase' extending Sequelize's Model class
export class Phase extends Model {}

// Initialize the 'Phase' model with its schema and configuration
Phase.init(
  {
    // Define attributes of the 'Phase' model
    id: {
      type: DataTypes.INTEGER, // Specifies the data type
      primaryKey: true, // Marks the column as the Primary Key
      autoIncrement: true, // Enables auto increment
      allowNull: false, // Disallows null values
    },
    phase_name: {
      type: DataTypes.STRING, // Specifies the data type as string
      allowNull: false, // Disallows null values
    },
  },
  {
    // Model configuration
    sequelize, // Pass the Sequelize instance
    timestamps: false, // Disable automatic timestamp fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use underscores instead of camelCase for column names
    modelName: 'phase', // Specify the model name
  }
);
