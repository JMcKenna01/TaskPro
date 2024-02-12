// Import necessary Sequelize classes and the configured database connection
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.js';

// Define a class 'Crew' extending the Sequelize Model class
export class Crew extends Model {}

// Initialize the 'Crew' model with its schema and configuration
Crew.init(
  {
    // Define attributes of the 'Crew' model
    id: {
      type: DataTypes.INTEGER, // Specifies the data type
      primaryKey: true, // Marks the column as the Primary Key
      autoIncrement: true, // Enables auto increment
      allowNull: false, // Disallows null values
    },
    crew_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Custom getter function to format the crew_number
      // Pads the number with leading zeros to ensure it's at least 3 digits
      get() {
        return this.getDataValue('crew_number').toString().padStart(3, '0');
      },
    },
    crew_manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Sets up a foreign key relationship to the 'user' table
      references: {
        model: 'user', // Reference the 'user' table
        key: 'id', // Reference the 'id' column in the 'user' table
      },
    },
    crew_super_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Another foreign key relationship to the 'user' table
      references: {
        model: 'user', // Reference the 'user' table
        key: 'id', // Reference the 'id' column in the 'user' table
      },
    },
  },
  {
    // Model configuration
    sequelize, // Pass the Sequelize instance
    timestamps: false, // Disable automatic timestamp fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use underscores instead of camelCase for column names
    modelName: 'crew', // Specify the model name
  }
);
