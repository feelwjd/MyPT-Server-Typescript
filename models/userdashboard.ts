import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association  
} from "sequelize";
import {sequelize} from '.';
import { User } from "./user";

interface UserDashBoardAttributes {
    userid : string,
    height : number,
    weight : number,
    totalmonth : Date
}

export class UserDashBoard extends Model<UserDashBoardAttributes> {
    private readonly _id! : number;
    private _userid! : string;
    private _height! : number;
    private _weight! : number;
    private _totalmonth! : Date;

    get id(): number {
        return this._id;
    }

    get userid(): string {
        return this._userid;
    }

    set userid(value: string) {
        !!value ? this._userid = value : new Error('userid is Empty');
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        !!value ? this._height = value : new Error('height is Empty');
    }

    get weight(): number {
        return this._weight;
    }

    set weight(value: number) {
        !!value ? this._weight = value : new Error('weight is Empty');
    }

    get totalmonth(): Date {
        return this._totalmonth;
    }

    set totalmonth(value: Date) {
        !!value ? this._totalmonth = value : new Error('totalmonth is Empty');
    }

    public static associations: {

    };
    
}

UserDashBoard.init(
    {
        userid : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        height : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        weight : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        totalmonth : {
            type : DataTypes.DATE,
            allowNull : false,
        }
    },
    {
        modelName : 'userdashboard',
        tableName : 'userdashboard',
        sequelize,
        freezeTableName: true,
    }
)

UserDashBoard.belongsTo(User, {foreignKey : 'userid', targetKey : 'userid'});