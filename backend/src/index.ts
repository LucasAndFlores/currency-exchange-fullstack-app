import { app } from './app'

const port = process.env.BACKEND_PORT

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})
