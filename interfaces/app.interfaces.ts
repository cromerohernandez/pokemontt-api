export interface IRequest {
  body: any,
  session: {
    user: [any],
    destroy: () => void,
  }
}

export interface IError {
  status: any;
  errors: IErrors;
  code: number;
  keyValue: {};
  message: IMessage,
}

export interface IErrorData {
  errors: IErrors | undefined,
  message: IMessage | undefined,
}

interface IErrors {
  [x: string]: { message: any; }
}

interface IMessage {
  [x: string]: string
}

export interface ISessionRequest extends Express.Request {
  body: any;
  session: {
    user: [any],
    destroy: () => void,
  }
}
