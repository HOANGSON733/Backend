export class ResponseData<D> {
  data: D | D[];
  statusCode: number;
  messager: string;

  constructor(data: D | D[], statusCode: number, messager: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.messager = messager;
  }
}
