import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import configuration from './config/configuration';

@Module({
  imports: [
    CartModule,
    ProductModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    OrderModule,
  ],
  controllers: [AppController, UsersController, OrderController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
