const mongoose = require('mongoose'); 
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    first_name : {
        type: String,
        required :  true
    },
    last_name : {
        type: String,
        required :  true
    },
    email: {
        type: String,
        required :  true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required :  true,
        minLength: 7
    },
    date: {
        type: Date,
        default: Date.now
    },
    creadorEvent: {
      type : Boolean,
      require: true
    }, 
    assitEvent: {
        type : Boolean,
        require: true
    },
    events:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Events'
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


UserSchema.pre('save', async function (next) {
  
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function() {

    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', UserSchema);

module.exports = User