import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BTCModule } from './modules/btc/btc.module';
import { RequestLogEntity } from './requestLog/requestLog.entity';
import { BTCController } from './modules/btc/btc.controller';
import { RequestLoggerModule } from './middlewares/requestLogger/requestLogger.module';
import { RequestLoggerMiddleware } from './middlewares/requestLogger/requestLogger.middleware';
import { RequestLogModule } from './requestLog/requestLog.module';
import { ClientLogModule } from './modules/clientLogger/clientLog.module';
import { ClientLogEntity } from './modules/clientLogger/clientLog.entity';
import { ClientLogController } from './modules/clientLogger/clientLog.controller';
import { ETHController } from './modules/eth/eth.controller';
import { ETHModule } from './modules/eth/eth.module';
import { BSCController } from './modules/bsc/bsc.controller';
import { BSCModule } from './modules/bsc/bsc.module';
import { TradingModule } from './modules/trading/trading.module';
import { TradingController } from './modules/trading/trading.controller';
import { UserController } from './modules/users/user.controller';
import { UserModule } from './modules/users/user.module';
import { VerificationEntity } from './modules/verification/verification.entity';
import { UserEntity } from './modules/users/user.entity';
import { VerificationModule } from './modules/verification/verification.module';
import { VerificationController } from './modules/verification/verification.controller';
import { RestorationModule } from './modules/restoration/restoration.module';
import { RestorationController } from './modules/restoration/restoration.controller';
import { RestorationEntity } from './modules/restoration/restoration.entity';
import { PolygonModule } from './modules/polygon/polygon.module';
import { PolygonController } from './modules/polygon/polygon.controller';
import { LTCController } from './modules/ltc/ltc.controller';
import { LTCModule } from './modules/ltc/ltc.module';
import { KeysEntity } from './modules/trading/keys.entity';
import { WisewinController } from './modules/wisewin/wisewin.controller';
import { WisewinModule } from './modules/wisewin/wisewin.module';
import { SolModule } from './modules/sol/sol.module';
import { SolController } from './modules/sol/sol.controller';
import { OrderRecordEntity } from './modules/trading/orderRecord.entity';
import { ExchangeOrderEntity } from './modules/exchange/exchangeOrder.entity';
// import { ExchangeFillEntity } from './modules/exchange/exchangeFill.entity';
import { ExchangeController } from './modules/exchange/exchange.controller';
import { ExchangeModule } from './modules/exchange/exchange.module';
import { ExchangeFillEntity } from './modules/exchange/exchangeFill.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { DisplayModule } from './modules/display/display.module';
import { DisplayController } from './modules/display/display.controller';
import { LanguageModule } from './middlewares/language/language.module';
import { LanguageMiddleware } from './middlewares/language/language.middleware';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env['DB_HOST'],
			port: Number(process.env['DB_PORT']),
			username: process.env['DB_USERNAME'],
			password: process.env['DB_PASSWORD'],
			database: process.env['DB_DATABASE'],
			synchronize: false,
			logging: true,
			entities: [
				RequestLogEntity,
				ClientLogEntity,
				UserEntity,
				VerificationEntity,
				RestorationEntity,
				KeysEntity,
				OrderRecordEntity,
				ExchangeOrderEntity,
				ExchangeFillEntity
			]
		}),
		ScheduleModule.forRoot(),
		TradingModule,
		BTCModule,
		ETHModule,
		BSCModule,
		PolygonModule,
		LTCModule,
		ClientLogModule,
		RequestLogModule,
		RequestLoggerModule,
		LanguageModule,
		VerificationModule,
		RestorationModule,
		UserModule,
		WisewinModule,
		SolModule,
		ExchangeModule,
		CronModule,
		DisplayModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(RequestLoggerMiddleware, LanguageMiddleware)
			.forRoutes(TradingController, BTCController, ETHController, BSCController, PolygonController, LTCController, SolController, ClientLogController, UserController, VerificationController, RestorationController, WisewinController, ExchangeController)
	}
}