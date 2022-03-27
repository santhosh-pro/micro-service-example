export interface ICurrentUser {
  id: string;
  username: string;
  tenantId: string;
  roles: string[];
  tenantHost: string;
}
