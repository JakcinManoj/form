import { Test, TestingModule } from '@nestjs/testing';
import { FormDataResolver } from './formdata.resolver';
import { FormDataService } from './formdata.service';

describe('FormdataResolver', () => {
  let resolver: FormDataResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDataResolver, FormDataService],
    }).compile();

    resolver = module.get<FormDataResolver>(FormDataResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
