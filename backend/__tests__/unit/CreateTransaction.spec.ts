import { jest } from '@jest/globals'
import axios, { AxiosError } from 'axios'
import { EErrorMessage } from '../../src/enum/EErrorMessage'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { CreateTransactionService } from '../../src/service/CreateTransactionService'
import { successfulResponse } from '../mocks/axios/successfulResponse'
import { generateExpectedResult } from '../utils/generateExpectedResult'
import { IValidatedBodyRequest } from '../../src/interface/IValidatedBodyRequest'
import { TransactionRepository } from '../../src/repository/TransactionRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { prismaMock } from '../mocks/prisma/singletonPrismaClient'
import { errorResponse } from '../mocks/axios/errorResponse'
import { TransactionBuilder } from '../../src/utils/TransactionBuilder'

let createTransactionService: CreateTransactionService
let transactionRepository: TransactionRepository

describe('CreateTransactionService Unit Test', () => {
	beforeEach(() => {
		transactionRepository = new TransactionRepository()
		transactionRepository['db'] = prismaMock
		createTransactionService = new CreateTransactionService(
			transactionRepository
		)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should be able to convert from BRL to CZK', async () => {
		const body: IValidatedBodyRequest = {
			fromCurrency: 'BRL',
			amountToConvert: 10000,
			destinationCurrency: 'CZK'
		}

		const mockedPrismaResult = {
			id: 1,
			fromCurrency: 'BRL',
			toCurrency: 'CZK',
			totalAmountConverted: 1000 as unknown as Decimal,
			totalAmountConvertedInUSD: 10 as unknown as Decimal,
			createdAt: new Date()
		}

		prismaMock.transactions.create.mockResolvedValue(mockedPrismaResult)

		jest
			.spyOn(axios, 'get')
			.mockResolvedValueOnce({ data: successfulResponse, status: 200 })

		const spyInsertMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'insert'
		)

		const result = await createTransactionService.execute(body)

		const expected = generateExpectedResult(
			successfulResponse,
			body,
			EEStatusCode.OK
		)

		expect(spyInsertMethodTransactionRepository).toHaveBeenCalled()
		expect(result).toStrictEqual(expected)
	})

	it('should be able to convert from EUR to CZK', async () => {
		const body: IValidatedBodyRequest = {
			fromCurrency: 'EUR',
			amountToConvert: 10000,
			destinationCurrency: 'CZK'
		}

		jest
			.spyOn(axios, 'get')
			.mockResolvedValueOnce({ data: successfulResponse, status: 200 })

		const mockedPrismaResult = {
			id: 1,
			fromCurrency: 'BRL',
			toCurrency: 'CZK',
			totalAmountConverted: 1000 as unknown as Decimal,
			totalAmountConvertedInUSD: 10 as unknown as Decimal,
			createdAt: new Date()
		}

		prismaMock.transactions.create.mockResolvedValue(mockedPrismaResult)

		const spyInsertMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'insert'
		)

		const result = await createTransactionService.execute(body)

		const expected = generateExpectedResult(
			successfulResponse,
			body,
			EEStatusCode.OK
		)

		expect(spyInsertMethodTransactionRepository).toHaveBeenCalled()
		expect(result).toStrictEqual(expected)
	})

	it('If an error happens with Axios, should return an error message on the body and status code', async () => {
		const body: IValidatedBodyRequest = {
			fromCurrency: 'EUR',
			amountToConvert: 10000,
			destinationCurrency: 'CZK'
		}

		const mockedPrismaResult = {
			id: 1,
			fromCurrency: 'BRL',
			toCurrency: 'CZK',
			totalAmountConverted: 1000 as unknown as Decimal,
			totalAmountConvertedInUSD: 10 as unknown as Decimal,
			createdAt: new Date()
		}

		prismaMock.transactions.create.mockResolvedValue(mockedPrismaResult)

		jest
			.spyOn(axios, 'get')
			.mockRejectedValueOnce(new AxiosError('error from unit test'))

		const spyInsertMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'insert'
		)

		const result = await createTransactionService.execute(body)

		const expectedResult = {
			body: { message: EErrorMessage.KNOWN_ERROR },
			statusCode: EEStatusCode.SERVICE_UNAVAIBLE
		}

		expect(spyInsertMethodTransactionRepository).not.toHaveBeenCalled()
		expect(result).toStrictEqual(expectedResult)
	})

	it('If an error is returned from the external API, should return an error message on the body and status code', async () => {
		const body: IValidatedBodyRequest = {
			fromCurrency: 'EUR',
			amountToConvert: 10000,
			destinationCurrency: 'CZK'
		}

		const mockedPrismaResult = {
			id: 1,
			fromCurrency: 'BRL',
			toCurrency: 'CZK',
			totalAmountConverted: 1000 as unknown as Decimal,
			totalAmountConvertedInUSD: 10 as unknown as Decimal,
			createdAt: new Date()
		}

		prismaMock.transactions.create.mockResolvedValue(mockedPrismaResult)

		const spyInsertMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'insert'
		)

		jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: errorResponse })

		const result = await createTransactionService.execute(body)

		const expectedResult = {
			body: { message: EErrorMessage.KNOWN_ERROR },
			statusCode: EEStatusCode.SERVICE_UNAVAIBLE
		}

		expect(spyInsertMethodTransactionRepository).not.toHaveBeenCalled()
		expect(result).toStrictEqual(expectedResult)
	})

	it('If an error happen on database, should return an error message on the body and status code', async () => {
		const body: IValidatedBodyRequest = {
			fromCurrency: 'EUR',
			amountToConvert: 10000,
			destinationCurrency: 'CZK'
		}

		jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: successfulResponse })

		prismaMock.transactions.create.mockRejectedValue(new Error('testing'))

		const result = await createTransactionService.execute(body)

		const expectedResult = {
			body: { message: EErrorMessage.UNKNOWN_ERROR },
			statusCode: EEStatusCode.INTERNAL_SERVER_ERROR
		}

		expect(result).toStrictEqual(expectedResult)
	})

	it('if an unexpected error happens inside service layer, it should be handle by errorHandler class', async () => {
		const body: IValidatedBodyRequest = {
			fromCurrency: 'BRL',
			amountToConvert: 10000,
			destinationCurrency: 'CZK'
		}

		jest
			.spyOn(TransactionBuilder.prototype, 'generateConversionToCurrencies')
			.mockImplementation(() => {
				throw new Error(' integration test')
			})

		jest
			.spyOn(axios, 'get')
			.mockResolvedValueOnce({ data: successfulResponse, status: 200 })

		const spyInsertMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'insert'
		)

		const result = await createTransactionService.execute(body)

		const expectedResult = {
			body: { message: EErrorMessage.UNKNOWN_ERROR },
			statusCode: EEStatusCode.INTERNAL_SERVER_ERROR
		}

		expect(spyInsertMethodTransactionRepository).not.toHaveBeenCalled()
		expect(result).toStrictEqual(expectedResult)
	})
})
