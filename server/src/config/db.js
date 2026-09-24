const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected succssfully");
        console.log("MongoDB Host:", mongoose.connection.host);
        console.log("MongoDB Database:", mongoose.connection.name);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;