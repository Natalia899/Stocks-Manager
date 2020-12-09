const mongoose = require('mongoose')
const FavoriteStock = require("../models/favoriteStocks")
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
	username: { type: String, required: true},
    password: { type: String, required: true },
    balance: Number,
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
    balance: 956,
    favorites: ['Apple', 'Tesla', 'Microsoft']
})

let user2 = new User ({
    username: "Moshe",
    password: "9874",
    balance: 145,
    favorites: ['Apple', 'Tesla', 'Microsoft']
})

let user3 = new User ({
    username: "Ofri",
    password: "3652",
    balance: 97
})

let user4 = new User ({
    username: "Avital",
    password: "5698",
    balance: 452
})

let user5 = new User ({
    username: "Shani",
    password: "3657",
    balance: 458
})

let user6 = new User ({
    username: "Dan",
    password: "7892",
    balance: 152,
    
})

const usersDB = [user1, user2, user3, user4, user5, user6]
//usersDB.forEach(u=> u.save())


// favorite1.save()

module.exports = User