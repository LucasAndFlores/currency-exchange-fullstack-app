import axios from 'axios'
import { EErrorMessage } from '../enum/EErrorMessage'
import { EEStatusCode } from '../enum/EEStatusCode'
import { AxiosCustomError } from '../error/AxiosCustomError'
import { IExternalAPIStandardErrorResponse } from '../interface/IExternalAPIStandardErrorResponse'
import { IExternalAPIResponseStatus } from '../interface/IExternalAPIResponseStatus'
import { IGetLatestCurrencyQuotationSuccessResponse } from '../interface/IGetLatestCurrencyQuotationSuccessResponse'
import { TGetLatestCurrencyQuotationParams } from '../interface/TGetLatestCurrencyQuotationParams'
import { localConfig } from '../config'
import { IGetAvailableCurrenciesFromAPISuccessResponse } from '../interface/IGetAvailableCurrenciesFromAPISuccessResponse'
const { EXTERNAL_API_TOKEN, EXTERNAL_API_URL } = localConfig

const USD = 'USD'

export async function getLatestCurrencyQuotation({
	fromCurrency,
	destinationCurrency
}: TGetLatestCurrencyQuotationParams): Promise<IGetLatestCurrencyQuotationSuccessResponse> {
	try {
		const response = await axios.get(
			`${EXTERNAL_API_URL}/latest?access_key=${EXTERNAL_API_TOKEN}&symbols=${USD},${fromCurrency},${destinationCurrency}`
		)

		const verifyStatus = response.data as IExternalAPIResponseStatus

		if (!verifyStatus.success) {
			const errorFromAPI = verifyStatus as IExternalAPIStandardErrorResponse
			throw new Error('The external API returned an error', {
				cause: errorFromAPI
			})
		}

		return response.data
	} catch (error) {
		console.error('An Axios error happened', error)
		throw new AxiosCustomError(
			EEStatusCode.SERVICE_UNAVAIBLE,
			EErrorMessage.KNOWN_ERROR
		)
	}
}

export async function getAvailableCurrenciesFromAPI(): Promise<IGetAvailableCurrenciesFromAPISuccessResponse> {
	try {
		const response = await axios.get(
			`${EXTERNAL_API_URL}/api/symbols?access_key=${EXTERNAL_API_TOKEN}`
		)

		const verifyStatus = response.data as IExternalAPIResponseStatus

		if (!verifyStatus.success) {
			const errorFromAPI = verifyStatus as IExternalAPIStandardErrorResponse
			throw new Error('The external API returned an error', {
				cause: errorFromAPI
			})
		}

		return response.data
	} catch (error) {
		console.error('An Axios error happened', error)
		throw new AxiosCustomError(
			EEStatusCode.SERVICE_UNAVAIBLE,
			EErrorMessage.KNOWN_ERROR
		)
	}
}
