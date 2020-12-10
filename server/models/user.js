const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
	username: { type: String, required: true},
    password: { type: String, required: true },
    favorites: []
})

userSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model("User", userSchema)

let user1 = new User ({
    username: "Roberto",
    password: "1234",
    favorites: ['Apple', 'Tesla', 'Microsoft']
})

let user2 = new User ({
    username: "Moshe",
    password: "9874",
    favorites: ['Apple', 'Tesla', 'Microsoft']
})



const usersDB = [user1, user2]
// usersDB.forEach(u=> u.save())



module.exports = User