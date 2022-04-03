import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
} from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { RequestContext } from 'nestjs-request-context';
import { Injectable } from '@nestjs/common';
import { DateUtil } from 'libs/domain/common/src/utils/date-util';

@EventSubscriber()
@Injectable()
export class AllEntitiesSubscriber implements EntitySubscriberInterface<any> {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }
  beforeInsert(event: any) {
    if (RequestContext.currentContext && RequestContext.currentContext.req) {
      const req: any = RequestContext.currentContext.req;
      if (req) {
        event.entity.createdBy =
          req.user === undefined
            ? 'user'
            : req.user.id === undefined
            ? 'user'
            : req.user.id;
        event.entity.createdOn = DateUtil.getUtcDate();
        event.entity.updatedBy =
          req.user === undefined
            ? 'user'
            : req.user.id === undefined
            ? 'user'
            : req.user.id;
        event.entity.updatedOn = DateUtil.getUtcDate();
      }
    }
  }

  beforeUpdate(event: any) {
    if (RequestContext.currentContext && RequestContext.currentContext.req) {
      const req: any = RequestContext.currentContext.req;
      event.entity.updatedBy =
        req.user === undefined
          ? 'user'
          : req.user.id === undefined
          ? 'user'
          : req.user.id;
      event.entity.updatedOn = DateUtil.getUtcDate();
    }
  }
}
