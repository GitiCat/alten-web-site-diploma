import {
    DataTypes,
    Sequelize,
    Model,
    Optional
} from 'sequelize'

export interface IProductAttributes {
    id: number,
    name: string,
    title: string,
    subtitle?: string,
    descriptor: string,
    imageUrl: URL
}

export interface IProductCreationAttributes
    extends Optional<IProductAttributes, 'id'> {}

export interface IProductInstance
    extends Model<IProductAttributes, IProductCreationAttributes>,
        IProductAttributes {
            createdAt?: Date,
            updateAt?: Date
        }

export const initialProductModel = (sequelize: Sequelize) => {
    return sequelize.define<IProductInstance>(
        'products',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            subtitle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            descriptor: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            imageUrl: {
                type: DataTypes.STRING
            }
        }
    )
}