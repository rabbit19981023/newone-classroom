import mongoose from 'mongoose'

export default {
  /** connecting to MongoDB **/
  connect: function () {
    mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}
