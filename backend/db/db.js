import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const instance = await mongoose.connect(`${process.env.MONGO_URL}/audiophile`)
        console.log(instance.connection.host)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB