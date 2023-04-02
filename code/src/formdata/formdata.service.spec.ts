import { Test, TestingModule } from '@nestjs/testing';
import { FormDataService } from './formdata.service';

describe('FormDataService', () => {
  let service: FormDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDataService],
    }).compile();

    service = module.get<FormDataService>(FormDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
