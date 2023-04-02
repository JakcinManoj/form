import { Module } from '@nestjs/common';
import { GraphqlModule } from './config/graphql/graphql.module';
import { FormDataModule } from './formdata/formdata.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [GraphqlModule, FormDataModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 