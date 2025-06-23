import 'package:flutter/material.dart';
import 'package:food_rescue/core/services/food_rescue_toast.dart';
import 'package:food_rescue/features/auth/views/wiidgets/button.dart';
import 'package:food_rescue/features/homescreen/views/customer/widgets/rating.dart';
import 'package:food_rescue/features/homescreen/views/rider/models/order_model.dart';
import 'package:food_rescue/features/homescreen/views/rider/models/order_status.dart';
import 'package:food_rescue/router/router.dart';

class OrderDetailPage extends StatefulWidget {
  final OrderModel order;

  const OrderDetailPage({super.key, required this.order});

  @override
  State<OrderDetailPage> createState() => _OrderDetailPageState();
}

class _OrderDetailPageState extends State<OrderDetailPage> {
  late OrderModel _order;

  @override
  void initState() {
    super.initState();
    _order = widget.order;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        title: Text('Order #${_order.id}'),
        backgroundColor: theme.colorScheme.primary,
        elevation: 0,
        actions: [
          IconButton(
            onPressed: () {
              // Call customer
              FoodRescueToast.showSuccess('Calling ${_order.customer.name}...');
            },
            icon: const Icon(Icons.phone),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Order Status Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: _order.statusColor.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Icon(
                            _order.statusIcon,
                            color: _order.statusColor,
                            size: 24,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _order.status.displayName,
                                style: theme.textTheme.headlineMedium?.copyWith(
                                  color: _order.statusColor,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                _order.status.description,
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: theme.colorScheme.secondary,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Food Details Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Order Details',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: Image.asset(
                            _order.foodImage,
                            width: 80,
                            height: 80,
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stackTrace) {
                              return Container(
                                width: 80,
                                height: 80,
                                decoration: BoxDecoration(
                                  color: theme.colorScheme.surface,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Icon(
                                  Icons.fastfood,
                                  color: theme.colorScheme.onSurface,
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _order.foodName,
                                style: theme.textTheme.bodyLarge?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Quantity: ${_order.quantity}',
                                style: theme.textTheme.bodyMedium,
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'NPR ${_order.totalAmount.toStringAsFixed(0)}',
                                style: theme.textTheme.bodyLarge?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.green,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Restaurant Details Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.restaurant,
                          color: theme.colorScheme.onSurface,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Restaurant Details',
                          style: theme.textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    _buildDetailRow(Icons.store, 'Name', _order.restaurantName),
                    _buildDetailRow(Icons.location_on, 'Address', _order.restaurantAddress),
                    if (_order.pickupInstructions != null) ...[
                      const SizedBox(height: 8),
                      _buildDetailRow(Icons.info, 'Pickup Instructions', _order.pickupInstructions!),
                    ],
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Customer Details Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.person,
                          color: theme.colorScheme.onSurface,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Customer Details',
                          style: theme.textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: _buildDetailRow(Icons.person, 'Name', _order.customer.name),
                        ),
                        if (_order.customer.rating != null) ...[
                          Rating(receivedRating: _order.customer.rating!),
                        ],
                      ],
                    ),
                    _buildDetailRow(Icons.phone, 'Phone', _order.customer.phone),
                    _buildDetailRow(Icons.location_on, 'Address', _order.customer.address),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Timeline Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Order Timeline',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildTimelineItem(
                      Icons.schedule,
                      'Order Placed',
                      _formatDateTime(_order.orderTime),
                      true,
                    ),
                    if (_order.status.index >= OrderStatus.accepted.index)
                      _buildTimelineItem(
                        Icons.check_circle,
                        'Order Accepted',
                        _order.pickupTime != null ? _formatDateTime(_order.pickupTime!) : 'Just now',
                        true,
                      ),
                    if (_order.status.index >= OrderStatus.pickedUp.index && _order.pickupTime != null)
                      _buildTimelineItem(
                        Icons.shopping_bag,
                        'Order Picked Up',
                        _formatDateTime(_order.pickupTime!),
                        true,
                      ),
                    if (_order.status.index >= OrderStatus.delivered.index && _order.deliveryTime != null)
                      _buildTimelineItem(
                        Icons.done_all,
                        'Order Delivered',
                        _formatDateTime(_order.deliveryTime!),
                        true,
                      ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Action Buttons
            if (_order.status == OrderStatus.pending) ...[
              Row(
                children: [
                  Expanded(
                    child: Button(
                      onPressed: () {
                        navigation.currentState?.pop();
                      },
                      title: 'Decline',
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Button(
                      onPressed: _acceptOrder,
                      title: 'Accept Order',
                    ),
                  ),
                ],
              ),
            ] else if (_order.status != OrderStatus.delivered && _order.status != OrderStatus.cancelled) ...[
              Button(
                onPressed: _updateOrderStatus,
                title: _getNextActionText(),
              ),
            ],
            
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(IconData icon, String label, String value) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 16, color: theme.colorScheme.secondary),
          const SizedBox(width: 8),
          Text(
            '$label: ',
            style: theme.textTheme.bodyMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: theme.textTheme.bodyMedium,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineItem(IconData icon, String title, String time, bool isCompleted) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(
            icon,
            size: 20,
            color: isCompleted ? Colors.green : theme.colorScheme.secondary,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              title,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: isCompleted ? Colors.green : theme.colorScheme.secondary,
              ),
            ),
          ),
          Text(
            time,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.secondary,
            ),
          ),
        ],
      ),
    );
  }

  String _formatDateTime(DateTime dateTime) {
    return '${dateTime.day}/${dateTime.month}/${dateTime.year} ${dateTime.hour}:${dateTime.minute.toString().padLeft(2, '0')}';
  }

  String _getNextActionText() {
    switch (_order.status) {
      case OrderStatus.accepted:
        return 'Go to Restaurant';
      case OrderStatus.pickingUp:
        return 'Mark as Picked Up';
      case OrderStatus.pickedUp:
        return 'Start Delivery';
      case OrderStatus.delivering:
        return 'Mark as Delivered';
      default:
        return 'Update Status';
    }
  }

  void _acceptOrder() {
    setState(() {
      _order = _order.copyWith(status: OrderStatus.accepted);
    });
    FoodRescueToast.showSuccess('Order accepted successfully!');
  }

  void _updateOrderStatus() {
    OrderStatus nextStatus;
    String message;
    
    switch (_order.status) {
      case OrderStatus.accepted:
        nextStatus = OrderStatus.pickingUp;
        message = 'Going to restaurant';
        break;
      case OrderStatus.pickingUp:
        nextStatus = OrderStatus.pickedUp;
        message = 'Order picked up';
        break;
      case OrderStatus.pickedUp:
        nextStatus = OrderStatus.delivering;
        message = 'Started delivery';
        break;
      case OrderStatus.delivering:
        nextStatus = OrderStatus.delivered;
        message = 'Order delivered successfully!';
        break;
      default:
        return;
    }

    setState(() {
      _order = _order.copyWith(
        status: nextStatus,
        pickupTime: nextStatus == OrderStatus.pickedUp ? DateTime.now() : _order.pickupTime,
        deliveryTime: nextStatus == OrderStatus.delivered ? DateTime.now() : _order.deliveryTime,
      );
    });
    
    FoodRescueToast.showSuccess(message);
  }
}
