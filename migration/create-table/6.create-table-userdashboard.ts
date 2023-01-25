import {UserDashBoard} from '../../models/userdashboard';

console.log("======Create User Table======");

const create_table = async() => {
    await UserDashBoard.sync({force : true})
    .then(() => {
        console.log("✅Success Create userdashboard Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create userdashboard Table : ", err);
    })
}

create_table();