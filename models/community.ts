import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association  
} from "sequelize";
import {sequelize} from '.';
import { Routine } from "./routine";
import { User } from "./user";

interface CommunityAttributes {
    userid : string,
    postimage : string,
    description : string,
    postdate : Date,
    routineinfo : number
}

export class Community extends Model<CommunityAttributes> {
    private readonly _id! : number;
    private _userid! : string;
    private _postimage! : string;
    private _description! : string;
    private _postdate! : Date;
    private _routineinfo! : number;


    get id(): number {
        return this._id;
    }

    get userid(): string {
        return this._userid;
    }

    set userid(value: string) {
        !!value ? this._userid = value : new Error('userid is Empty');
    }

    get postimage(): string {
        return this._postimage;
    }

    set postimage(value: string) {
        !!value ? this._postimage = value : new Error('postimage is Empty');
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        !!value ? this._description = value : new Error('description is Empty');
    }

    get postdate(): Date {
        return this._postdate;
    }

    set postdate(value: Date) {
        !!value ? this._postdate = value : new Error('postdate is Empty');
    }

    get routineinfo(): number {
        return this._routineinfo;
    }

    set routineinfo(value: number) {
        !!value ? this._routineinfo = value : new Error('routineinfo is Empty');
    }

    public static associations: {

    };
    
}

Community.init(
    {
        userid : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        postimage : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        description : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        postdate : {
            type : DataTypes.DATE,
            allowNull : false,
        },  
        routineinfo : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    },
    {
        modelName : 'community',
        tableName : 'community',
        sequelize,
        freezeTableName: true,
    }
)

Community.belongsTo(Routine, {foreignKey : 'routineinfo', targetKey : 'id'});
Community.belongsTo(User, {foreignKey : 'userid', targetKey : 'userid'});