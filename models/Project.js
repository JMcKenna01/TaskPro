import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection.js'

export class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project_phase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'phase',
        key: 'id',
      },
    },
    project_super_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    project_manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
)

