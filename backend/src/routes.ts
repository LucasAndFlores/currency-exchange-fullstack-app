import { Request, Response, Router } from 'express'
import { CreateTransactionFactory } from './factory/CreateTransactionFactory'
import { validateSchema } from './middleware/validateSchema'
import { transactionSchema } from './validation/transactionSchema'

const router = Router()

const createTransactionController = CreateTransactionFactory.build()

router.post(
	'/api/transaction',
	validateSchema(transactionSchema),
	async (request: Request, response: Response) => {
		await createTransactionController.handle(request, response)
		return
	}
)

export { router }
