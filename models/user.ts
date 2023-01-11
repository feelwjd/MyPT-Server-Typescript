import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association  
} from "sequelize";
import {sequelize} from '.';

interface UserAttributes {
    user_id : string,
    user_pw : string,
    age : number,
    address : string,
    name : string,
    sex : boolean,
}

export class User extends Model<UserAttributes> {
    private readonly _id! : number;
    private _user_id! : string;
    private _user_pw! : string;
    private _age! : number;
    private _address! : string;
    private _name! : string;
    private _sex! : boolean;
    private readonly _createdAt! : Date;
    private readonly _updatedAt! : Date;


    get id(): number {
        return this._id;
    }

    get user_id(): string {
        return this._user_id;
    }

    set user_id(value: string) {
        if (value == null || value == "") {
            throw new Error('Id is Empty');
        }else{
            this._user_id = value;
        }
    }

    get user_pw(): string {
        return this._user_pw;
    }

    set user_pw(value: string) {
        if (value == null || value == "") {
            throw new Error('Pw is Empty');
        }else{
            this._user_pw = value;
        }
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        if (value == null || value <= 0) {
            throw new Error('Age is bigger than zero');
        }else{
            this._age = value;
        }
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        if (value == null || value == "") {
            throw new Error('Adress is Empty');
        }else{
            this._address = value;
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (value == null || value == "") {
            throw new Error('Name is Empty');
        }else{
            this._name = value;
        }
    }

    get sex(): boolean {
        return this._sex;
    }

    set sex(value: boolean){
        if (value == null || value == undefined) {
            throw new Error('Sex is Empty');
        }else{
            this._sex = value;
        }
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    public static associations: {
        
    };
    
}

User.init(
    {
        user_id : {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        user_pw : {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        age : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address : {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name : {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        sex : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        modelName : 'User',
        tableName : 'User',
        sequelize,
        freezeTableName: true,
        timestamps : true,
        updatedAt : 'updatedAt',
    }
)