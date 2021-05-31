import {
    DataTypes,
    Sequelize,
    Model,
    Optional
} from 'sequelize'

export interface IArticleAttributes {
    id: number,
    name: string,
    title: string,
    subtitle?: string,
    text: string
}

export interface IArticleCreationAttributes
    extends Optional<IArticleAttributes, 'id'> {}

export interface IArticleInstance
    extends Model<IArticleAttributes, IArticleCreationAttributes>,
        IArticleAttributes {
            createdAt?: Date,
            updateAt?: Date
        }

export const initialArticleModel = (sequelize: Sequelize) => {
    return sequelize.define<IArticleInstance>(
        'articles',
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
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            subtitle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }
    )
}