import {User} from '../../models/user';

console.log("======Create User Table======");

const create_table = async() => {
    await User.sync({force : true})
    .then(() => {
        console.log("✅Success Create user Table");
    })
    .catch((err) => {
        console.log("❗️Error in Create user Table : ", err);
    })
}

create_table();