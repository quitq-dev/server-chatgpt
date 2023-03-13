import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())

// Configure open api
const configuration = new Configuration({
  organization: "org-PgdBMRADM9LGYr7UeYvZvh7k",
  apiKey: process.env.API_KEY
})
const openAI = new OpenAIApi(configuration)

app.listen("3080", () => console.log("listening on port 3080"))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.post('/', async (req, res) => {
  const { message } = req.body

  try {
    const completion = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 4000,
      temperature: .5
    })
    res.json({ message: completion.data.choices[0].text })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
  }
})