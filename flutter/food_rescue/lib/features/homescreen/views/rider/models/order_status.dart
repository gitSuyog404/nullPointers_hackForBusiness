enum OrderStatus {
  pending('Pending', 'Order placed, waiting for rider'),
  accepted('Accepted', 'Rider accepted the order'),
  pickingUp('Picking Up', 'Rider is going to restaurant'),
  pickedUp('Picked Up', 'Order picked up from restaurant'),
  delivering('Delivering', 'On the way to customer'),
  delivered('Delivered', 'Order delivered successfully'),
  cancelled('Cancelled', 'Order was cancelled');

  const OrderStatus(this.displayName, this.description);
  
  final String displayName;
  final String description;
}
