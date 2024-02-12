// Import the necessary Sequelize classes and the configured database connection
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.js';

// Define a class 'Project' extending Sequelize's Model class
export class Project extends Model {}

// Initialize the 'Project' model with its schema and configuration
Project.init(
  {
    // Define attributes of the 'Project' model
    id: {
      type: DataTypes.INTEGER, // Specifies the data type as integer
      primaryKey: true, // Marks this column as the Primary Key
      autoIncrement: true, // Enables auto-increment for this column
      allowNull: false, // Disallows null values for this column
    },
    project_name: {
      type: DataTypes.STRING, // Specifies the data type as string
      allowNull: false, // Disallows null values for this column
    },
    project_phase_id: {
      type: DataTypes.INTEGER, // Specifies the data type as integer
      allowNull: false, // Disallows null values for this column
      references: {
        model: 'phase', // Establishes a foreign key relationship to the 'phase' table
        key: 'id', // Specifies the column in the 'phase' table that this column references
      },
      defaultValue: 1 // Sets a default value for this column
    },
    project_super_id: {
      type: DataTypes.INTEGER, // Data type integer
      allowNull: false, // Disallows null values
      references: {
        model: 'user', // Establishes a foreign key relationship to the 'user' table
        key: 'id', // Specifies the column in the 'user' table that this column references
      },
    },
    project_manager_id: {
      type: DataTypes.INTEGER, // Data type integer
      allowNull: false, // Disallows null values
      references: {
        model: 'user', // Establishes a foreign key relationship to the 'user' table
        key: 'id', // Specifies the column in the 'user' table that this column references
      },
    },
    project_crew_id: {
      type: DataTypes.INTEGER, // Data type integer
      allowNull: true, // Allows null values for this column
      references: {
        model: 'crew', // Establishes a foreign key relationship to the 'crew' table
        key: 'id', // Specifies the column in the 'crew' table that this column references
      },
    }
  },
  {
    // Model configuration
    sequelize, // Pass the Sequelize instance
    timestamps: false, // Disable automatic timestamp fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use underscores instead of camelCase for column names
    modelName: 'project', // Specify the model name
  }
);
