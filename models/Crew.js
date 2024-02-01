import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection'

export class Crew extends Model {}

Crew.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    crew_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue('crew_number').toString().padStart(3, '0')
        },
      },
    crew_manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    crew_super_id: {
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
    modelName: 'crew',
  }
)
