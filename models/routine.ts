import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association  
} from "sequelize";
import {sequelize} from '.';
import { RoutineDetail } from "./routinedetail";
import { User } from "./user";

interface RoutineAttributes {
    userid : string,
    routinename : string,
    description : string,
    routinedate : Date,
    totalcalories : number
}

export class Routine extends Model<RoutineAttributes> {
    private readonly _id! : number;
    private _userid! : string;
    private _routinename! : string;
    private _description! : string;
    private _routinedate! : Date;
    private _totalcalories! : number;

    public getRoutineDetail!: HasManyGetAssociationsMixin<RoutineDetail>;
    public addRoutineDetail!: HasManyAddAssociationMixin<RoutineDetail, number>;
    public hasRoutineDetail!: HasManyHasAssociationMixin<RoutineDetail, number>;
    public countRoutineDetail!: HasManyCountAssociationsMixin;
    public createRoutineDetail!: HasManyCreateAssociationMixin<RoutineDetail>;


    get id(): number {
        return this._id;
    }

    get userid(): string {
        return this._userid;
    }

    set userid(value: string) {
        !!value ? this._userid = value : new Error('userid is Empty');
    }

    get routinename(): string {
        return this._routinename;
    }

    set routinename(value: string) {
        !!value ? this._routinename = value : new Error('routinename is Empty');
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        !!value ? this._description = value : new Error('description is Empty');
    }

    get routinedate(): Date {
        return this._routinedate;
    }

    set routinedate(value: Date) {
        !!value ? this._routinedate = value : new Error('routinedate is Empty');
    }

    get totalcalories(): number {
        return this._totalcalories;
    }

    set totalcalories(value: number) {
        !!value||value<=0 ? this._totalcalories = value : new Error('totalcalories is bigger than zero');
    }

    public static associations: {
        routineHasManyRoutineDetail : Association<Routine, RoutineDetail>;
    };
    
}

Routine.init(
    {
        userid : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        routinename : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        description : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        routinedate : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        totalcalories : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    },
    {
        modelName : 'routine',
        tableName : 'routine',
        sequelize,
        freezeTableName: true,
    }
)

Routine.belongsTo(User, {foreignKey : 'userid', targetKey : 'userid'});