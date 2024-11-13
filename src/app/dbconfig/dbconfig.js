// import mongoose, { mongo } from "mongoose";

// const connectToDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL)

//         const connection = mongoose.connection;
//         connection.on ('open', ()=> {
//             console.log('Connected DB');
//         });
//         connection.on('error', (err) => {
//             console.error('Failed to connect to MongoDB', err);
//         });
//     } catch (error) {
//         console.error('Failed to connect to MongoDB', error);
//     }
// }
// export default connectToDatabase;

import mongoose from "mongoose";
 
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
};
 
export default connectToDatabase;

