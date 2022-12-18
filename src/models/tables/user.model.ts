import { DataTypes, Model, Optional } from 'sequelize';
import { IUser } from '@interfaces';
import { Database } from '@models';

const sequelize = Database.sequelize;

export type UserAttributes = Optional<IUser, 'id' | 'email' | 'password'>;

export class UserModel extends Model<IUser, UserAttributes> implements IUser {
  public id: string;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'tbl_user',
    sequelize,
    // hooks: {
    //   beforeCreate: (item: any) => {
    //     const date = new Date();
    //     item.created_at_unix_timestamp = date.valueOf();
    //     item.updated_at_unix_timestamp = date.valueOf();
    //   },
    //   beforeUpdate: (item: any) => {
    //     item.updated_at_unix_timestamp = new Date().valueOf();
    //   },
    // },
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      // exclude password
      attributes: { exclude: ['password', 'deleted_at'] },
    },
    // scopes: {
    //   deleted: {
    //     // tslint:disable-next-line:no-null-keyword
    //     where: { deleted_at: { $ne: null } },
    //     paranoid: false,
    //   },
    //   withPassword: {
    //     attributes: { include: ["password"] },
    //   },
    // },
  },
);
