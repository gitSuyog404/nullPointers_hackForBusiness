import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_rescue/core/constants/box_key_const.dart';
import 'package:food_rescue/core/local_data_source/app_local_data_source.dart';
import 'package:hive/hive.dart';

class ThemeCubit extends Cubit<ThemeMode> {
  final appLocalDataSorce = AppLocalDataSource();
  late Box box;

  ThemeCubit() : super(ThemeMode.light);

  static Future<ThemeMode> getInitialTheme() async {
    final appLocalDataSource = AppLocalDataSource();
    final isDarkMode = appLocalDataSource.getData(BoxKeyConst.theme);

    if (isDarkMode == null || isDarkMode == true) {
      return ThemeMode.dark;
    } else {
      return ThemeMode.light;
    }
  }

  void toggleTheme() {
    if (state == ThemeMode.light) {
      print("Switching to dark mode");
      emit(ThemeMode.dark);
      appLocalDataSorce.saveThemeMode(true);
    } else {
      print("Switching to  mode");
      emit(ThemeMode.light);
      appLocalDataSorce.saveThemeMode(false);
    }
  }
}
