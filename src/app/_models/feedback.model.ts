export class Feedback {
  get id(): number {
    return this._id;
  }

  get fromClientName(): number {
    return this._fromClientName;
  }

  get rate(): number {
    return this._rate;
  }

  get context(): string {
    return this._context;
  }


  private _id: number;
  private _fromClientName: number;
  private _rate: number;
  private _context: string;
}
