import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection.js'

export class Phase extends Model {}

Phase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    phase_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'phase',
  }
)
