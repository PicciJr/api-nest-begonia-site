import { CartStatus, IAddress, ICart, IProduct } from "src/types";

export class CreateCartDto implements ICart{
  items: IProduct[];
  subtotal: number;
  status: CartStatus;
  shippingAddress?: IAddress;
  email?: string;
}
