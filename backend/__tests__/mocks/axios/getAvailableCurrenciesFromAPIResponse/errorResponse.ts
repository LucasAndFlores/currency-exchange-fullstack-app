import { IExternalAPIStandardErrorResponse } from '../../../../src/interface/IExternalAPIStandardErrorResponse'

export const errorResponse: IExternalAPIStandardErrorResponse = {
	success: false,
	error: {
		code: 101,
		type: 'invalid_access_key',
		info: 'You have not supplied a valid API Access Key. [Technical Support: support@apilayer.com]'
	}
}
