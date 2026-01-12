export interface SupplierRequest {
  name : string
  contact : string
  rating : number
  leadTime : number
}

export interface SupplierResponse extends SupplierRequest {
  idSupplier : number
}
