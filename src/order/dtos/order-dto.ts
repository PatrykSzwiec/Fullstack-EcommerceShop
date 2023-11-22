export class CreateOrderDTO {
  id: number;
  userId: string;
  cartItems: {
    productId: number,
    size: string,
    quantity: number,
    comments?: string,
  }[];
  totalPrice: number;
  name: string;
  surname: string;
  postCode: string;
  city: string;
  address: string;
  country: string;
  createdAt: Date;
}
