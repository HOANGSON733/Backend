export class ResponseData<D> {
  data: D | D[] | null;
  messager: string;
  statusCode: number;

  constructor(data: D | D[] | null, statusCode: number, messager: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.messager = messager;
    return this
  }
}
