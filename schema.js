import mongoose from 'mongoose'
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLNoNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql'

let User = mongoose.model('User', {
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number
})

mongoose.connect('mongodb://localhost:27017/biodatadb', (err) => {
  if(err){
    console.log(err);
  }else{
    console.log(`mongo connected`);
  }
})

let UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID User'
    },
    name: {
      type: GraphQLString,
      description: "Name of User"
    },
    age: {
      type: GraphQLInt,
      description: "Age of User"
    }
  })
})

let getAll = () => {
  return new Promise((resolve, reject) => {
    User.find((err, users) =>  {
      if(err){
        reject(err);
      }else{
        resolve(users)
      }
    })
  })
}

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return getAll()
      }
    }
  })
})
