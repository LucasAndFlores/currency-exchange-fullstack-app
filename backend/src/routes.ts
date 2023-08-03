import { Request, Response, Router } from 'express'
import { CreateTransactionFactory } from './factory/CreateTransactionFactory'
import { validateSchema } from './middleware/validateSchema'
import { transactionSchema } from './validation/transactionSchema'
import { GetStatisticsFactory } from './factory/GetStatisticsFactory'
import { GetAvailableCurrenciesFactory } from './factory/GetAvailableCurrenciesFactory'

const router = Router()

const createTransactionController = CreateTransactionFactory.build()
const getStatisticsController = GetStatisticsFactory.build()
const getAvailableCurrenciesController = GetAvailableCurrenciesFactory.build()

router.post(
	'/api/transaction',
	validateSchema(transactionSchema),
	async (request: Request, response: Response) => {
		await createTransactionController.handle(request, response)
	}
)

router.get('/api/statistics', async (request: Request, response: Response) => {
	await getStatisticsController.handle(request, response)
	return
})

router.get(
	'/api/available-currencies',
	async (request: Request, response: Response) => {
		await getAvailableCurrenciesController.handle(request, response)
		return
	}
)

export { router }
