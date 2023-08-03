import { app } from './app'

const port = process.env.BACKEND_PORT

app.listen(port, () => {
	console.log(
		`Server is running on port: ${port}. You can access the documentation by visiting this route: http://localhost:${port}/api/docs`
	)
})
