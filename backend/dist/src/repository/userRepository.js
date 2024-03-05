"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class userRepository {
}
_a = userRepository;
userRepository.userList = [];
userRepository.addUser = (user) => {
    const numberOfUsers = _a.userList.length;
    user.id = numberOfUsers + 1;
    if (_a.userList.push(user) > numberOfUsers)
        return true;
    return false;
};
userRepository.removeUser = (id) => {
    _a.userList.forEach((x) => {
        if (x.id === id) {
            _a.userList.splice(_a.userList.indexOf(x));
            return true;
        }
    });
    return false;
};
userRepository.getUser = (id) => {
    let user;
    _a.userList.forEach((x) => {
        if (x.id === id)
            user = x;
    });
    return user;
};
userRepository.getUserByEmail = (email) => {
    let user;
    _a.userList.forEach((x) => {
        if (x.email === email)
            user = x;
    });
    return user;
};
exports.default = userRepository;
