import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
/* PLOP_INJECT_IMPORT */
@Injectable()
export class Seeder {
  constructor(
    /* PLOP_INJECT_SERVICE */
  ) {}

  async clean() {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.clearDatabase();
  }

  async seed() {
    await this.seedInitial();
  }

  async seedInitial() {
    /* PLOP_CALL_METHOD */
    return {
      /* PLOP_RETURN_METHOD */
    };
  }

  /* PLOP_ADD_METHOD */
 
}
