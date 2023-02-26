const mongoose = require("mongoose");
const url="mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@cluster0.mlb5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true});

const hashSchema = new mongoose.Schema({
    hash:String,
    data:String
});

const Hash = mongoose.model("Hash", hashSchema);

const saveHash = async (hash,data) => {
    // const { hash, data } = req.body;
    const newHash = new Hash({
        hash: hash,
        data: data
    });
    try {
        await newHash.save();
        console.log(newHash._id)
        return 1;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

const getHash = async (hash) => {
    try {
        const hashValue = await Hash.find({ hash: hash });
        console.log(hashValue[0].hash);
        return hashValue[0].hash;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const getFromHash = async (hash) => {
    try {
        const hashValue = await Hash.find({ hash: hash });
        console.log(hashValue[0].data);
        return hashValue[0].data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    saveHash,
    getHash,
    getFromHash
}

