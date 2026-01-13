export interface rawMaterialsRequest {

  name : string,
  stock : number,
  stockMin : number,
  unit : string

}

export interface rawMaterialsResponse extends rawMaterialsRequest {
  idMaterial : number,
}

