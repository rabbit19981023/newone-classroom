import mongoose from 'mongoose'
const { Schema, model } = mongoose

// design a Schema for Admin Model (same as Admin Collection)
const adminSchema = new Schema({
  user: String,
  username: String,
  password: String
})

// compiling our adminSchema into a Admin Model instance (same as a Admin Collection)
export default model('Admin', adminSchema)
