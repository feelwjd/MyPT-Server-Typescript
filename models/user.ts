import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association  
} from "sequelize";
import {sequelize} from '.';
import { Routine } from "./routine";

interface UserAttributes {
    nickname : string,
    userid : string,
    userpw : string,
    salt : string,
    age : number,
    address : string,
    name : string,
    sex : boolean,
    height : number,
    weight : number,
    profileimage : string,
}

export class User extends Model<UserAttributes> {
    private readonly _id! : number;
    private _nickname! : string;
    private _userid! : string;
    private _userpw! : string;
    private _salt! : string;
    private _age! : number;
    private _address! : string;
    private _name! : string;
    private _sex! : boolean;
    private _height! : number;
    private _weight! : number;
    private _profileimage! : string;
    private readonly _createdAt! : Date;
    private readonly _updatedAt! : Date;

    public getRoutine!: HasManyGetAssociationsMixin<Routine>;
    public addRoutine!: HasManyAddAssociationMixin<Routine, number>;
    public hasRoutine!: HasManyHasAssociationMixin<Routine, number>;
    public countRoutine!: HasManyCountAssociationsMixin;
    public createRoutine!: HasManyCreateAssociationMixin<Routine>;


    get id(): number {
        return this._id;
    }

    get nickname(): string {
        return this._nickname;
    }

    set nickname(value: string) {
        !!value ? this._nickname = value : new Error('Nickname is Empty');
    }

    get userid(): string {
        return this._userid;
    }

    set userid(value: string) {
        !!value ? this._userid = value : new Error('Id is Empty');
    }

    get userpw(): string {
        return this._userpw;
    }

    set userpw(value: string) {
        !!value ? this._userpw = value : new Error('Pw is Empty');
    }

    get salt(): string {
        return this._salt;
    }

    set salt(value: string) {
        !!value ? this._salt = value : new Error('Hash is Empty');
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        !!value||value<=0 ? this._age = value : new Error('Age is bigger than zero');
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        !!value ? this._address = value : new Error('Adress is Empty');
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        !!value ? this._name = value : new Error('Name is Empty');
    }

    get sex(): boolean {
        return this._sex;
    }

    set sex(value: boolean){
        !!value ? this._sex = value : new Error('Sex is Empty');
    }

    get height(): number {
        return this._height;
    }
    
    set height(value: number) {
        !!value||value<=0 ? this._height = value : new Error('Height is bigger than zero');
    }

    get weight(): number {
        return this._weight;
    }

    set weight(value: number) {
        !!value||value<=0 ? this._weight = value : new Error('Weight is bigger than zero');
    }

    get profileimage(): string {
        return this._profileimage;
    }

    set profileimage(value: string) {
        !!value ? this._profileimage = value : this._profileimage = 'profile/images/default.png';
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    public static associations: {
        userHasManyRoutine: Association<User, Routine>;
    };
    
}

User.init(
    {
        nickname : {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        userid : {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        userpw : {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        salt : {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        age : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address : {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        name : {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        sex : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        height : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        profileimage : {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'profile/images/default.png'
        }
    },
    {
        modelName : 'user',
        tableName : 'user',
        sequelize,
        freezeTableName: true,
        timestamps : true,
        updatedAt : 'updatedAt',
    }
)