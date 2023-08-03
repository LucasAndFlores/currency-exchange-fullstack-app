import { Request, Response } from 'express'
import { IGetAvailableCurrenciesService } from '../interface/IGetAvailableCurrenciesService'

export class GetAvailableCurrenciesController {
	constructor(private logic: IGetAvailableCurrenciesService) {}
	async handle(request: Request, response: Response): Promise<void> {
		const result = await this.logic.execute()
		response.status(result.statusCode).json(result.body)
	}
}
