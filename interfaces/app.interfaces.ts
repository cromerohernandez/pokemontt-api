export interface IRequest { //TODOCRH: it is necessary?
  currentUser: any,
  session: any
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

