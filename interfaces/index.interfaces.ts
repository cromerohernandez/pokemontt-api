export interface IRequest {
    currentUser: any,
    session: any
}

export interface IErrors {
  [x: string]: { message: any }
}

export interface IDataErrors {
  [x: string]: { message: any } | string
}

export interface IData {
  errors: IDataErrors,
  message: string | null
}

export interface IError { status: any; errors: IErrors; code: number; keyValue: {}; message: any }