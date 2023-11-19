export class CreateCartItemDTO {
  userId: string;
  productId: number;
  size: string;
  quantity: number;
}

export class UpdateCartItemDTO {
  newQuantity: number;
}
