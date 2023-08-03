import express from 'express'
import { router } from './routes'
import swaggerUI from 'swagger-ui-express'
import { readFileSync } from 'fs'
import { parse } from 'yaml'

const file = readFileSync(
	`${__dirname}/documentation/documentation.yaml`,
	'utf8'
)
const swaggerDocumentation = parse(file)

const app = express()

app.use(express.json())

app.use(router)

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

export { app }
