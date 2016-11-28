import express from 'express'
import schema from './schema'
import { graphql } from 'graphql'
import GraphQLHTTP from 'express-graphql'
import logger from 'morgan'

const app = express()

app.get('/', (req, res) => {
  let query = '{users {name age}}'
  graphql(schema, query)
    .then(result => {
      res.json(result)
    })
})

app.use(logger())
app.use('/graphql', GraphQLHTTP({
  schema: schema,
  pretty: true,
  graphiql: true//fitur auto complete
}))

app.listen(3000, (err) => {
  if(err){
    console.log(err);
  }else{
    console.log(`server is running in port 3000`);
  }
})
