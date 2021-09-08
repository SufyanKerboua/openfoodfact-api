import { Module } from '@nestjs/common';
import { OpenfoodfactController } from './openfoodfact.controller';
import { OpenfoodfactService } from './openfoodfact.service';

@Module({
  controllers: [OpenfoodfactController],
  providers: [OpenfoodfactService]
})
export class OpenfoodfactModule {}
