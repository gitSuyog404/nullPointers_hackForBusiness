import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_rescue/core/local_data_source/app_local_data_source.dart';
import 'package:food_rescue/core/themes/app_themes.dart';
import 'package:food_rescue/router/router.dart';
import 'package:hive_flutter/adapters.dart';

import 'features/app_start/app_start_bloc/theme_cubit.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final AppLocalDataSource appLocalDataSource = AppLocalDataSource();
    return BlocProvider(
      create: (context) => ThemeCubit(),
      // value: ThemeCubit(),
      child: BlocBuilder<ThemeCubit, ThemeMode>(
        builder: (context, themeMode) {
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'food rescue',
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            themeMode: themeMode,
            initialRoute: RouteNames.startApp,
            onGenerateRoute: generateRoute,
            navigatorKey: navigation,
          );
        },
      ),
    );
  }
}
