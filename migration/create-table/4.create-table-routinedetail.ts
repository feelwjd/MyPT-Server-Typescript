import {RoutineDetail} from '../../models/routinedetail';

console.log("======Create User Table======");

const create_table = async() => {
    await RoutineDetail.sync({force : true})
    .then(() => {
        console.log("✅Success Create routinedetail Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create routinedetail Table : ", err);
    })
}

create_table();