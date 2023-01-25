import { Sequelize, DataTypes, Model, Optional,
    HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association  
} from "sequelize";
import {sequelize} from '.';

interface WorkoutAttributes {
    part : string,
    workoutname : string,
    workoutclass : boolean,
    label : number
}

export class Workout extends Model<WorkoutAttributes> {
    private readonly _id! : number;
    private _part! : string;
    private _workoutname! : string;
    private _workoutclass! : boolean;
    private _label! : number;


    get id(): number {
        return this._id;
    }

    get part(): string {
        return this._part;
    }

    set part(value: string) {
        !!value ? this._part = value : new Error('part is Empty');
    }

    get workoutname(): string {
        return this._workoutname;
    }

    set workoutname(value: string) {
        !!value ? this._workoutname = value : new Error('workoutname is Empty');
    }

    get workoutclass(): boolean {
        return this._workoutclass;
    }

    set workoutclass(value: boolean) {
        !!value ? this._workoutclass = value : new Error('workoutclass is Empty');
    }

    get label(): number {
        return this._label;
    }

    set label(value: number) {
        !!value||value<=0 ? this._label = value : new Error('label is bigger than zero');
    }

    public static associations: {
        
    };
    
}

Workout.init(
    {
        part : {
            type : DataTypes.STRING(5),
            allowNull : false,
        },
        workoutname : {
            type : DataTypes.STRING(25),
            allowNull : false,
        },
        workoutclass : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
        label : {
            type : DataTypes.INTEGER,
            allowNull : true,
        }
    },
    {
        modelName : 'workout',
        tableName : 'workout',
        sequelize,
        freezeTableName: true,
        createdAt : false,
        updatedAt : false
    }
)