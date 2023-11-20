export class CreateCartItemDTO {
  userId: string;
  productId: number;
  size: string;
  quantity: number; // Add quantity property
}

export class UpdateCartItemDTO {
  newQuantity: number;
}
