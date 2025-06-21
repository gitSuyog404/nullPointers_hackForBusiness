import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      fontFamily: 'Nunito',
      brightness: Brightness.light,
      scaffoldBackgroundColor: const Color(0xFFFFFFFF), // Primary
      primaryColor: const Color(0xFFFFFFFF),
      secondaryHeaderColor: const Color(0xFF808080), // Secondary
      colorScheme: const ColorScheme.light(
        primary: Color(0xFFFFFFFF),
        onPrimary: Color(0xFF000000),
        secondary: Color(0xFF808080),
        surface: Color(0xFFF5F5F5),
      ),
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontSize: 30,
          fontWeight: FontWeight.w900,
          color: Color(0xFF000000),
        ),
        headlineMedium: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w700,
          color: Color(0xFF000000),
        ),
        bodyMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w700,
          color: Color(0xFF000000),
        ),
        bodySmall: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w500,
          color: Color(0xFF808080),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      fontFamily: 'Nunito',
      brightness: Brightness.dark,
      scaffoldBackgroundColor: const Color(0xFF000000), // OnPrimary
      primaryColor: const Color(0xFF000000),
      secondaryHeaderColor: const Color(0xFF808080),
      colorScheme: const ColorScheme.dark(
        primary: Color(0xFF000000),
        onPrimary: Color(0xFFFFFFFF),
        secondary: Color(0xFF808080),
        surface: Color(0xFF1C1C1C),
      ),
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontSize: 30,
          fontWeight: FontWeight.w900,
          color: Color(0xFFFFFFFF),
        ),
        headlineMedium: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w700,
          color: Color(0xFFFFFFFF),
        ),
        bodyMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w700,
          color: Color(0xFFFFFFFF),
        ),
        bodySmall: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w500,
          color: Color(0xFFB0B0B0), // Slightly lighter grey for dark mode
        ),
      ),
    );
  }
}
