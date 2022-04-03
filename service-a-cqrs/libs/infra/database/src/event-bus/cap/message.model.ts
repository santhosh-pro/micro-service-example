export interface Message {
    id: string;
    topic: string;
    payload: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export enum MessageStatus {
    PENDING = 'pending',
    FAILED = 'failed',
  }