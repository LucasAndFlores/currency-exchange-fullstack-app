import { IExternalAPIResponseStatus } from './IExternalAPIResponseStatus'

export interface IExternalAPIStandardErrorResponse
	extends IExternalAPIResponseStatus {
	error: {
		code: number
		type: string
		info: string
	}
}
