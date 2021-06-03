import { 
    DataTypes, 
    Sequelize,
    Model,
    Optional
} from 'sequelize'

export interface ICategoryProductAttributes {
    id: number,
    name: string,
    title: string
}

export interface ICategoryProductCreationAttrubutes
    extends Optional<ICategoryProductAttributes, 'id'> {}

export interface ICategoryProductInstance
    extends Model<ICategoryProductAttributes, ICategoryProductCreationAttrubutes>,
        ICategoryProductAttributes {
            createdAt?: Date,
            updatedAt?: Date
        }

export const initialCategoryProductModel = (sequelize: Sequelize) => {
    return sequelize.define<ICategoryProductInstance>(
        'category-product',
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
}