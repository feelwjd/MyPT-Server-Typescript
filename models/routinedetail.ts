import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association  
} from "sequelize";
import {sequelize} from '.';
import { Routine } from "./routine";
import { Workout } from "./workout";

interface RoutineDetailAttributes {
    routineid : number,
    workoutid : number
}

export class RoutineDetail extends Model<RoutineDetailAttributes> {
    private readonly _id! : number;
    private _routineid! : number;
    private _workoutid! : number;

    get id(): number {
        return this._id;
    }

    get routineid(): number {
        return this._routineid;
    }

    set routineid(value: number) {
        !!value||value<=0 ? this._routineid = value : new Error('routineid is bigger than zero');
    }

    get workoutid(): number {
        return this._workoutid;
    }

    set workoutid(value: number) {
        !!value||value<=0 ? this._workoutid = value : new Error('workoutid is bigger than zero');
    }

    public static associations: {
        
    };
    
}

RoutineDetail.init(
    {
        routineid : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },  
        workoutid : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    },
    {
        modelName : 'routinedetail',
        tableName : 'routinedetail',
        sequelize,
        freezeTableName: true,
    }
)

RoutineDetail.belongsTo(Routine, {foreignKey : 'routineid'});
Routine.hasMany(RoutineDetail, {foreignKey : 'routineid'});
RoutineDetail.belongsTo(Workout, {foreignKey : 'workoutid'});