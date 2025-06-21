import 'package:flutter/material.dart';

import '../../router/router.dart'; // replace with your actual key file

class LoadingDialogService {
  static bool _isDialogOpen = false;

  static void show({String message = 'Requesting...'}) {
    if (_isDialogOpen) return;
    _isDialogOpen = true;

    showDialog(
      context: navigation.currentState!.overlay!.context,
      barrierDismissible: false,
      builder: (_) {
        return PopScope(
          canPop: false,
          child: Dialog(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const CircularProgressIndicator(),
                  const SizedBox(width: 20),
                  Flexible(
                    child: Text(message, style: const TextStyle(fontSize: 16)),
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
