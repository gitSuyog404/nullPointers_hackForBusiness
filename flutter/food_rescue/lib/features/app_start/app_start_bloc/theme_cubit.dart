import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_rescue/core/constants/box_key_const.dart';
import 'package:food_rescue/core/local_data_source/app_local_data_source.dart';
import 'package:hive/hive.dart';

class ThemeCubit extends Cubit<ThemeMode> {
  final appLocalDataSorce = AppLocalDataSource();
  late Box box;

  ThemeCubit() : super(ThemeMode.light);

  void getTheme() {
   final isDarkMode =  appLocalDataSorce.getData(BoxKeyConst.theme);

    if (isDarkMode == null || isDarkMode) {
      emit(ThemeMode.dark);
    } else {
      emit(ThemeMode.light);
    }
  }

  void toggleTheme() {
    if (state == ThemeMode.light) {
      emit(ThemeMode.dark);
      appLocalDataSorce.saveThemeMode(true);
    } else {
      emit(ThemeMode.light);
      appLocalDataSorce.saveThemeMode(false);
    }
  }
}
