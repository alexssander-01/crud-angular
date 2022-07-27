export class Client{
  private _idClient: number;
  private _nameClient: string;
  private _emailClient: string;
  private _birthDateClient: string;

  constructor() {
    this._idClient = 0;
    this._nameClient = '';
    this._emailClient = '';
    this._birthDateClient = '';
  }

  get idClient(): number {
    return this._idClient;
  }

  set idClient(value: number) {
    this._idClient = value;
  }

  get nameClient(): string {
    return this._nameClient;
  }

  set nameClient(value: string) {
    this._nameClient = value;
  }

  get emailClient(): string {
    return this._emailClient;
  }

  set emailClient(value: string) {
    this._emailClient = value;
  }

  get birthDateClient(): string {
    return this._birthDateClient;
  }

  set birthDateClient(value: string) {
    this._birthDateClient = value;
  }
}
