import {Community} from '../../models/community';

console.log("======Create User Table======");

const create_table = async() => {
    await Community.sync({force : true})
    .then(() => {
        console.log("✅Success Create community Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create community Table : ", err);
    })
}

create_table();