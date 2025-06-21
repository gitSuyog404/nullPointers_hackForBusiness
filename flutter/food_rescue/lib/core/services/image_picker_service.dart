import 'dart:io';

import 'package:image_picker/image_picker.dart';

class ImagePickerService {
  // Singleton instance
  static final ImagePickerService _instance = ImagePickerService._internal();

  // Private constructor
  ImagePickerService._internal();

  // Factory constructor to return the same instance
  factory ImagePickerService() => _instance;

  final ImagePicker _picker = ImagePicker();
  bool _isPicking = false; // prevents simultaneous calls

  /// Picks an image from gallery or camera
  Future<File?> pickImage({bool fromCamera = false}) async {
    if (_isPicking) return null;
    _isPicking = true;

    try {
      final XFile? image = await _picker.pickImage(
        source: fromCamera ? ImageSource.camera : ImageSource.gallery,
        imageQuality: 80, // compress image
      );
      return image != null ? File(image.path) : null;
    } catch (e) {
      print("Image pick error: $e");
      return null;
    } finally {
      _isPicking = false;
    }
  }
}
