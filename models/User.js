import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import { sequelize } from '../config/connection'

export class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    is_manager: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_supervisor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    crew_id: { // Foreign Key
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Crew',
        key: 'id',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
        return newUserData
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.changed('password')) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
        }
        return updatedUserData
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
)

