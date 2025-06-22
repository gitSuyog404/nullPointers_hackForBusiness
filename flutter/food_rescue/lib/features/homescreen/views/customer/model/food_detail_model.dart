import 'package:flutter/material.dart';

class FoodDetailModel {
  IconData icon;
  String name;

  FoodDetailModel({required this.icon, required this.name});

  FoodDetailModel.fromJson(Map<String, dynamic> json)
    : icon = json['icon'] ?? Icons.fastfood,
      name = json['name'] ?? '';

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['icon'] = icon;
    data['names'] = name;
    return data;
  }
}
