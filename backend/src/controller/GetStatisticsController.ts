import { IGetStatisticsService } from '../interface/IGetStatisticsService'
import { Response, Request } from 'express'

export class GetStatisticsController {
	constructor(private logic: IGetStatisticsService) {}
	async handle(request: Request, response: Response): Promise<void> {
		const result = await this.logic.execute()
		response.status(result.statusCode).json(result.body)
	}
}
