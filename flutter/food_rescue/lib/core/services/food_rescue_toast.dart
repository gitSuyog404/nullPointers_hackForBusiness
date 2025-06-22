import 'package:flutter/material.dart';
import 'package:toastification/toastification.dart';

class FoodRescueToast {
  static void showSuccess([String message = 'Success! Operation completed.']) {
    _showToast(message, ToastificationType.success, Icons.check_circle);
  }

  static void showError([String message = 'Error! Something went wrong.']) {
    _showToast(message, ToastificationType.error, Icons.error);
  }

  static void showWarning(
      [String message = 'Warning! Something needs attention.']) {
    _showToast(message, ToastificationType.warning, Icons.warning);
  }

  static void showInfo([String message = 'Info! Please check the details.']) {
    _showToast(message, ToastificationType.info, Icons.info);
  }

  // Function to show toast messages
  static void _showToast(
      String message, ToastificationType type, IconData icon) {
    toastification.dismissAll();
    toastification.show(
      icon: Icon(icon),
      type: type,
      style: ToastificationStyle.fillColored,
      title: Text(
        message,
        softWrap: true,
        maxLines: 2,
      ),
      autoCloseDuration: const Duration(seconds: 5),
    );
  }
}
// 'Selected points are too near...'
