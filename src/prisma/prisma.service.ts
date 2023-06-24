import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    // delete all the users and bookmarks when running the tests in the right order so one isn't deleted before the other
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
