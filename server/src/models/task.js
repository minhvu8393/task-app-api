const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

taskSchema.methods.hasPermission = function(user) {
    return (this.owner.toString() === user._id.toString());
}

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;