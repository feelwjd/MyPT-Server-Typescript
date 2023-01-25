import {Routine} from '../../models/routine';

console.log("======Create User Table======");

const create_table = async() => {
    await Routine.sync({force : true})
    .then(() => {
        console.log("✅Success Create routine Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create routine Table : ", err);
    })
}

create_table();