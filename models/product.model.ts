export interface productRequest {

  name : string,
  productionTime : number,
  cost : number,
  stock : number

}

export interface productResponse extends productRequest {
  idProduct : number,
}
