import { jest } from '@jest/globals'
import { EErrorMessage } from '../../src/enum/EErrorMessage'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { TransactionRepository } from '../../src/repository/TransactionRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { prismaMock } from '../mocks/prisma/singletonPrismaClient'
import { GetStatisticsService } from '../../src/service/GetStatisticsService'
import { IGetStatisticsPrismaReponse } from '../../src/interface/IGetStatisticsPrismaResponse'
import { StatisticsBuilder } from '../../src/utils/StatisticsBuilder'

let getStatisticsService: GetStatisticsService
let transactionRepository: TransactionRepository

describe('Get Statistics Unit Test', () => {
	beforeEach(() => {
		transactionRepository = new TransactionRepository()
		transactionRepository['db'] = prismaMock
		getStatisticsService = new GetStatisticsService(transactionRepository)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should be to return statistics from database', async () => {
		const mockedPrismaResponse: IGetStatisticsPrismaReponse = {
			totalRequestsMade: { id: 6 },
			mostPopularDestinationCurrency: [
				{
					_count: { id: 2 },
					toCurrency: 'USD'
				}
			],
			sumOfTotalAmountConvertedInUSD: {
				_sum: { totalAmountConvertedInUSD: 26584.72 as unknown as Decimal }
			}
		}

		prismaMock.transactions.count.mockResolvedValue(
			mockedPrismaResponse.totalRequestsMade as unknown as number
		)

		prismaMock.transactions.groupBy // @ts-ignore // unit test
			.mockResolvedValue(mockedPrismaResponse.mostPopularDestinationCurrency)

		prismaMock.transactions.aggregate // @ts-ignore // unit test
			.mockResolvedValue(mockedPrismaResponse.sumOfTotalAmountConvertedInUSD)

		const spyGetStatisticsMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'getStatistics'
		)

		const result = await getStatisticsService.execute()

		const expectedBody = new StatisticsBuilder(mockedPrismaResponse)
			.mapFields()
			.build()

		const expected = {
			statusCode: EEStatusCode.OK,
			body: expectedBody
		}

		expect(spyGetStatisticsMethodTransactionRepository).toHaveBeenCalled()
		expect(result).toStrictEqual(expected)
	})

	it('if the database is empty, it should be able to return a response', async () => {
		const mockedPrismaResponse: IGetStatisticsPrismaReponse = {
			totalRequestsMade: { id: 0 },
			mostPopularDestinationCurrency: [],
			sumOfTotalAmountConvertedInUSD: {
				_sum: { totalAmountConvertedInUSD: null }
			}
		}

		prismaMock.transactions.count.mockResolvedValue(
			mockedPrismaResponse.totalRequestsMade as unknown as number
		)

		prismaMock.transactions.groupBy // @ts-ignore // unit test
			.mockResolvedValue(mockedPrismaResponse.mostPopularDestinationCurrency)

		prismaMock.transactions.aggregate // @ts-ignore // unit test
			.mockResolvedValue(mockedPrismaResponse.sumOfTotalAmountConvertedInUSD)

		const spyGetStatisticsMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'getStatistics'
		)

		const result = await getStatisticsService.execute()

		const expectedBody = new StatisticsBuilder(mockedPrismaResponse)
			.mapFields()
			.build()

		const expected = {
			statusCode: EEStatusCode.OK,
			body: expectedBody
		}

		expect(spyGetStatisticsMethodTransactionRepository).toHaveBeenCalled()
		expect(result).toStrictEqual(expected)
	})

	it('If a database error happens with one of the three database queries, it should return an error response', async () => {
		const mockedPrismaResponse: IGetStatisticsPrismaReponse = {
			totalRequestsMade: { id: 0 },
			mostPopularDestinationCurrency: [],
			sumOfTotalAmountConvertedInUSD: {
				_sum: { totalAmountConvertedInUSD: null }
			}
		}

		prismaMock.transactions.count.mockResolvedValue(
			mockedPrismaResponse.totalRequestsMade as unknown as number
		)

		prismaMock.transactions.groupBy // @ts-ignore // unit test
			.mockRejectValue(mockedPrismaResponse.mostPopularDestinationCurrency)

		prismaMock.transactions.aggregate.mockRejectedValue(
			new Error('error from database')
		)

		const spyGetStatisticsMethodTransactionRepository = jest.spyOn(
			transactionRepository,
			'getStatistics'
		)

		const result = await getStatisticsService.execute()

		const expected = {
			statusCode: EEStatusCode.INTERNAL_SERVER_ERROR,
			body: { message: EErrorMessage.UNKNOWN_ERROR }
		}

		expect(spyGetStatisticsMethodTransactionRepository).toHaveBeenCalled()
		expect(result).toStrictEqual(expected)
	})
})
