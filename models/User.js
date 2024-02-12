// Importing necessary modules from sequelize, bcrypt for password hashing, and the database connection
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/connection.js';

// Extending the Sequelize Model class to define a custom User model
export class User extends Model {
  // Method to check if the provided password matches the hashed password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}

// Initializing the User model with its schema (attributes) and configuration
User.init(
  {
    // Schema definition for the User model
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(30), // Limits the string length to 30 characters
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(30), // Limits the string length to 30 characters
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30), // Limits the string length to 30 characters
      allowNull: false,
    },
    is_manager: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Sets the default value to false
    },
    is_supervisor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Sets the default value to false
    },
    crew_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows null values, indicating the user may not be part of a crew
      references: {
        model: 'crew', // Establishes a foreign key relationship with the 'crew' table
        key: 'id',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Ensures the password is at least 8 characters long
      },
    },
    task_completed: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Sets the default number of completed tasks to 0
    },
  },
  {
    // Model configuration
    hooks: {
      // Lifecycle hooks for hashing the password before creating or updating a User record
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.changed('password')) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        return updatedUserData;
      },
    },
    sequelize, // Passes the Sequelize instance
    timestamps: false, // Disables automatic timestamp fields
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    underscored: true, // Uses underscores instead of camelCase for column names
    modelName: 'user', // Specifies the model name
  }
);
