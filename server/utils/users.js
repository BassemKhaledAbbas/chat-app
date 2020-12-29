class Users {
    //////// ====> constructors are special functions that fires automatically
    constructor() {
        this.Users = [];
    }
    //////////////// ====> these are methods not functions/////////////
    // addUser(id, name, room)
    addUser(id, name, room) {
        let user = { id, name, room };
        this.Users.push(user);
        return user;
    }
    // removeUser(id)
    removeUser(id){
        let user = this.getUser(id);
        if (user) {
            this.Users = this.Users.filter((user) => user.id !== id);
        }
        return user; 
    }
    // getUser(id)
    getUser(id){
        return this.Users.filter((user) => user.id === id)[0];
    }
    // getUserList(room)
    getUserList(room){
        let users = this.Users.filter((user) => {
            return user.room === room
        });

        let namesArray = users.map((user) => user.name);
        return namesArray;
    }
    /////////////////////// End of Methods///////////
}

module.exports = { Users };

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} testing`;
//     }
// }

// var me = new Person();