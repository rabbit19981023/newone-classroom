import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for User Model (same as User Collection)
const userSchema = new Schema({
  user: String,
  username: String,
  password: String
})

// compiling our userSchema into a User Model instance (same as a User Collection)
export default model('User', userSchema)
