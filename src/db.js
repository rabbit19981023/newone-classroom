import mongoose from 'mongoose'

export default {
  /** connecting to MongoDB **/
  connect: function () {
    mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => { console.log('Connecting to database successfully!') })
    .catch((error) => { console.error(`Database connected failed:\n${error}`) })
  }
}
