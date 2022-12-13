export interface IOrder {
    id: number,
    customerId: string,
    paymentId: number,
    orderDate: Date,
    isDeleted: boolean,
    shoppingCartId: number
}
