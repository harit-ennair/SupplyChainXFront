export interface customerRequest {
  name: string;
  email: string;
  address: string;
  city: string;
}

export interface customerResponse extends customerRequest {
  idCustomer: number;

}
