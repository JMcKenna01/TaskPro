import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection'

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
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    project_phase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Phase',
        key: 'id',
      },
    },
    project_super_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    project_manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
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

