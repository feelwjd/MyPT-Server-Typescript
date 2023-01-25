import {Workout} from '../../models/workout';

console.log("======Create User Table======");

const create_table = async() => {
    await Workout.sync({force : true})
    .then(() => {
        console.log("✅Success Create workout Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create workout Table : ", err);
    })
}

create_table();