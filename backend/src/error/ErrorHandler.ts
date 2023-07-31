import { EEStatusCode } from '../enum/EEStatusCode'
import { EErrorMessage } from '../enum/EErrorMessage'
import { IServiceResponse } from '../interface/IServiceResponse'
import { AxiosCustomError } from './AxiosCustomError'
import { DatabaseError } from './DatabaseError'

export class ErrorHandler {
	static handle(error: unknown): IServiceResponse {
		if (error instanceof AxiosCustomError) {
			return {
				statusCode: error.statusCode,
				body: { message: error.errorResponse }
			}
		} else if (error instanceof DatabaseError) {
			return {
				statusCode: error.statusCode,
				body: { message: error.errorResponse }
			}
		} else {
			console.error(`An unexpected error happened`, error)
			return {
				statusCode: EEStatusCode.INTERNAL_SERVER_ERROR,
				body: { message: EErrorMessage.UNKNOWN_ERROR }
			}
		}
	}
}
