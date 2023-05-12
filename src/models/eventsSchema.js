const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

eventSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id
    return object
})

module.exports = model('Event', eventSchema)
