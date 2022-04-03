import { PagedModel } from "@app/common/paged-model";
import { PagedResponse } from "@app/database/common/paged-response";
import { AutoMap } from "@automapper/classes";
import { Customer } from "../../customer";

export class GetCustomerListQueryResult extends PagedResponse {
  @AutoMap({ typeFn: () => Customer })
  items: Customer[];
}