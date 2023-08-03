import { IExternalAPIStandardErrorResponse } from '../../../../src/interface/IExternalAPIStandardErrorResponse'

export const errorResponse: IExternalAPIStandardErrorResponse = {
	success: false,
	error: {
		code: 302,
		type: 'invalid_date',
		info: 'You have entered an invalid date. [Required format: date=YYYY-MM-DD]'
	}
}
