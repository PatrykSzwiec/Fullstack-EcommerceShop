export class CreateCartItemDTO {
  userId: string;
  productId: number;
  size: string;
  quantity: number;
  comments: string;
}

export class UpdateCartItemDTO {
  newQuantity: number;
}

export class UpdateCartItemCommentDTO {
  newComment: string;
}
