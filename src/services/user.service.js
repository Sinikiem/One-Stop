import User from "../models/users.models.js";

class UserService {
    constructor() {}

    async signup(data) {
        const user = new User(data);
        return await user.save();
    }

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async getAllUsers(page, limit) {
        const users = await User.find({  })
        .skip((page - 1) * limit)
        .limit(limit);
        
        return users;
    }

    async updateUser(userId, updateData) {
        const user = await User.findById(userId);
        if (!user || user.isDeleted) {
            return null;
        }

        // Update user fields
        Object.keys(updateData).forEach((key) => {
            user[key] = updateData[key];
        });

        await user.save();
        return user;
    }

    async deleteUser(userId) {
        const user = await User.findById(userId);
        if (!user) {
            return null;
        }

        user.isDeleted = true;
        await user.save();
        return user;
    }
}

const userService = new UserService();

export default userService;
