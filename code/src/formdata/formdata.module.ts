import { Module } from '@nestjs/common';
import { FormDataService } from './formdata.service';
import { FormDataResolver } from './formdata.resolver';

@Module({
  providers: [FormDataResolver, FormDataService]
})
export class FormDataModule {}
