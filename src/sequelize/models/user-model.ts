import {
    DataTypes,
    Sequelize,
    Model,
    Optional
} from 'sequelize'

export interface IUserAttributes {
    id: number,
    login: string,
    password: string,
    username: string
}

export interface IUserCreationAttributes
    extends Optional<IUserAttributes, 'id'> {}

export interface IUserInstance
    extends Model<IUserAttributes, IUserCreationAttributes>,
        IUserAttributes {
            createdAt?: Date,
            updatedAt?: Date
        }

export const initialUserModel = (sequelize: Sequelize) => {
    return sequelize.define<IUserInstance>(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            login: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    )
}