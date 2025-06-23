import 'package:flutter/material.dart';
import 'customer_model.dart';
import 'order_status.dart';

class OrderModel {
  final String id;
  final String foodName;
  final String restaurantName;
  final String restaurantAddress;
  final String foodImage;
  final int quantity;
  final double price;
  final double totalAmount;
  final CustomerModel customer;
  final OrderStatus status;
  final DateTime orderTime;
  final DateTime? pickupTime;
  final DateTime? deliveryTime;
  final String? specialInstructions;
  final String? pickupInstructions;

  OrderModel({
    required this.id,
    required this.foodName,
    required this.restaurantName,
    required this.restaurantAddress,
    required this.foodImage,
    required this.quantity,
    required this.price,
    required this.totalAmount,
    required this.customer,
    required this.status,
    required this.orderTime,
    this.pickupTime,
    this.deliveryTime,
    this.specialInstructions,
    this.pickupInstructions,
  });

  OrderModel.fromJson(Map<String, dynamic> json)
      : id = json['id'] ?? '',
        foodName = json['foodName'] ?? '',
        restaurantName = json['restaurantName'] ?? '',
        restaurantAddress = json['restaurantAddress'] ?? '',
        foodImage = json['foodImage'] ?? '',
        quantity = json['quantity'] ?? 0,
        price = json['price']?.toDouble() ?? 0.0,
        totalAmount = json['totalAmount']?.toDouble() ?? 0.0,
        customer = CustomerModel.fromJson(json['customer'] ?? {}),
        status = OrderStatus.values.firstWhere(
          (e) => e.name == json['status'],
          orElse: () => OrderStatus.pending,
        ),
        orderTime = DateTime.parse(json['orderTime'] ?? DateTime.now().toIso8601String()),
        pickupTime = json['pickupTime'] != null ? DateTime.parse(json['pickupTime']) : null,
        deliveryTime = json['deliveryTime'] != null ? DateTime.parse(json['deliveryTime']) : null,
        specialInstructions = json['specialInstructions'],
        pickupInstructions = json['pickupInstructions'];

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'foodName': foodName,
      'restaurantName': restaurantName,
      'restaurantAddress': restaurantAddress,
      'foodImage': foodImage,
      'quantity': quantity,
      'price': price,
      'totalAmount': totalAmount,
      'customer': customer.toJson(),
      'status': status.name,
      'orderTime': orderTime.toIso8601String(),
      'pickupTime': pickupTime?.toIso8601String(),
      'deliveryTime': deliveryTime?.toIso8601String(),
      'specialInstructions': specialInstructions,
      'pickupInstructions': pickupInstructions,
    };
  }

  OrderModel copyWith({
    String? id,
    String? foodName,
    String? restaurantName,
    String? restaurantAddress,
    String? foodImage,
    int? quantity,
    double? price,
    double? totalAmount,
    CustomerModel? customer,
    OrderStatus? status,
    DateTime? orderTime,
    DateTime? pickupTime,
    DateTime? deliveryTime,
    String? specialInstructions,
    String? pickupInstructions,
  }) {
    return OrderModel(
      id: id ?? this.id,
      foodName: foodName ?? this.foodName,
      restaurantName: restaurantName ?? this.restaurantName,
      restaurantAddress: restaurantAddress ?? this.restaurantAddress,
      foodImage: foodImage ?? this.foodImage,
      quantity: quantity ?? this.quantity,
      price: price ?? this.price,
      totalAmount: totalAmount ?? this.totalAmount,
      customer: customer ?? this.customer,
      status: status ?? this.status,
      orderTime: orderTime ?? this.orderTime,
      pickupTime: pickupTime ?? this.pickupTime,
      deliveryTime: deliveryTime ?? this.deliveryTime,
      specialInstructions: specialInstructions ?? this.specialInstructions,
      pickupInstructions: pickupInstructions ?? this.pickupInstructions,
    );
  }

  Color get statusColor {
    switch (status) {
      case OrderStatus.pending:
        return Colors.orange;
      case OrderStatus.accepted:
        return Colors.blue;
      case OrderStatus.pickingUp:
        return Colors.purple;
      case OrderStatus.pickedUp:
        return Colors.indigo;
      case OrderStatus.delivering:
        return Colors.teal;
      case OrderStatus.delivered:
        return Colors.green;
      case OrderStatus.cancelled:
        return Colors.red;
    }
  }

  IconData get statusIcon {
    switch (status) {
      case OrderStatus.pending:
        return Icons.schedule;
      case OrderStatus.accepted:
        return Icons.check_circle;
      case OrderStatus.pickingUp:
        return Icons.directions_walk;
      case OrderStatus.pickedUp:
        return Icons.shopping_bag;
      case OrderStatus.delivering:
        return Icons.delivery_dining;
      case OrderStatus.delivered:
        return Icons.done_all;
      case OrderStatus.cancelled:
        return Icons.cancel;
    }
  }
}
