import { 
    DataTypes, 
    Sequelize,
    Model,
    Optional
} from "sequelize";
import { initialArticleModel } from './article-model'

export interface ICategoryArticleAttributes {
    id: number,
    name: string,
    title: string
}

export interface ICategoryArticleCreationAttributes
    extends Optional<ICategoryArticleAttributes, 'id'> {}

export interface ICategoryArticleInstance
    extends Model<ICategoryArticleAttributes, ICategoryArticleCreationAttributes>,
        ICategoryArticleAttributes {
            createdAt?: Date,
            updatedAt?: Date
        }

export const initCategoryArticleModel = (sequelize: Sequelize) => {
    return sequelize.define<ICategoryArticleInstance>(
        'category-article',
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
            }
        }
    )
    .hasMany(initialArticleModel(sequelize),
    {
        onDelete: 'cascade',
        foreignKey: {
            name: 'categoryId',
            allowNull: false
        }
    })
}