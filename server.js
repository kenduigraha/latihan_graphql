import express from 'express'
import schema from './schema'
import { graphql } from 'graphql'
import GraphQLHTTP from 'express-graphql'
import logger from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(logger())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/biodata', (req, res) => {
  let query = '{users {name age}}'
  graphql(schema, query)
    .then(result => {
      res.json(result)
    })
})

app.post('/api/biodata', (req, res) => {
  console.log(req.body);
  let query = `mutation{add(name:"${req.body.name}", age:${req.body.age}) {
    id name age
  }}`

  graphql(schema, query)
    .then(result => res.json(result))
})

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
