import { IAvailableCurency } from '../../src/interface/IAvailableCurrency'
import { IGetAvailableCurrenciesFromAPISuccessResponse } from '../../src/interface/IGetAvailableCurrenciesFromAPISuccessResponse'

export function generateGetAvailableCurrenciesResult(
	data: IGetAvailableCurrenciesFromAPISuccessResponse
): IAvailableCurency[] {
	const currencies: IAvailableCurency[] = []

	for (const [prefix, name] of Object.entries(data.symbols)) {
		currencies.push({ name, prefix })
	}

	return currencies
}
