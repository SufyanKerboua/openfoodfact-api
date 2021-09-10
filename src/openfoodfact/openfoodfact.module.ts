import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenfoodfactService } from './openfoodfact.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 0,
      responseType: 'json'
    })
  ],
  providers: [OpenfoodfactService]
})
export class OpenfoodfactModule {}
