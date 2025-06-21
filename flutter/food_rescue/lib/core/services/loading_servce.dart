import 'package:flutter/material.dart';

import '../../router/router.dart'; // replace with your actual key file

class LoadingService {
  static bool _isDialogOpen = false;

  static void show() {
    if (_isDialogOpen) return;
    _isDialogOpen = true;

    showDialog(
      context: navigation.currentState!.overlay!.context,
      barrierDismissible: false,
      builder: (_) {
        final theme = Theme.of(navigation.currentState!.overlay!.context);
        return PopScope(
          canPop: false,
          child: Dialog(
            backgroundColor: theme.primaryColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CircularProgressIndicator(color: theme.colorScheme.onPrimary),
                  const SizedBox(width: 20),
                  Flexible(
                    child: Text(
                      'Requesting',
                      style: const TextStyle(fontSize: 16),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  static void hide() {
    if (_isDialogOpen && navigation.currentState?.canPop() == true) {
      navigation.currentState?.pop();
      _isDialogOpen = false;
    }
  }
}
