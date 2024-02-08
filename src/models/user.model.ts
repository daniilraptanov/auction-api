import { DataTypes, Model, Sequelize } from "sequelize";
import { IUserModel } from "../types/user.type";

export default class User extends Model implements IUserModel {
  declare id: string;

  declare userName: string;
  declare login: string;
  declare password: string;
  declare photo: string;

  declare isVisiblePhoto: boolean;
  declare isVisiblelogin: boolean;

  declare isVisibleAllForFriends: boolean;
  declare isVisibleFriends: boolean;

  declare friendsIds: string[];

  
  static modelInit(db: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [2, 15],
            notNull: true
          }
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [2, 50],
            islogin: true,
            notNull: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
          validate: {
            len: [2, 200],
            notNull: true
          },
        },
        photo: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
          validate: {
            len: [2, 200],
          },
        },
        isVisiblePhoto: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          unique: false,
          defaultValue: true
        },
        isVisiblelogin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          unique: false,
          defaultValue: true
        },
        isVisibleAllForFriends: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          unique: false,
          defaultValue: true
        },
        isVisibleFriends: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          unique: false,
          defaultValue: true
        },
        friendsIds: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
          get() {
            return this.getDataValue("friendsIds").split(";");
          },
          set(val: string) {
            this.setDataValue("friendsIds", val + ";");
          },
        },
      },
      {
        tableName: "User",
        sequelize: db,
      }
    );
  }
}
