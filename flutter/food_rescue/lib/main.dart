import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_rescue/core/local_data_source/app_local_data_source.dart';
import 'package:food_rescue/core/local_data_source/user_local_data_source.dart';
import 'package:food_rescue/core/services/dio_service.dart';
import 'package:food_rescue/core/themes/app_themes.dart';
import 'package:food_rescue/features/auth/repositories/auth_remote_repository.dart';
import 'package:food_rescue/features/auth/view_model/bloc/auth_bloc.dart';
import 'package:food_rescue/router/router.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:toastification/toastification.dart';

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
          final UserLocalDataSource userLocalDataSource = UserLocalDataSource();
          final dioService = DioService(userLocalDataSource);
          final authRemoteRepository = AuthRemoteRepository(
            dioService,
            userLocalDataSource,
          );
          return MultiBlocProvider(
            providers: [
              BlocProvider(create: (context) => AuthBloc(authRemoteRepository)),
            ],
            child: ToastificationWrapper(
              child: MaterialApp(
                debugShowCheckedModeBanner: false,
                title: 'food rescue',
                theme: AppTheme.lightTheme,
                darkTheme: AppTheme.darkTheme,
                themeMode: themeMode,
                initialRoute: RouteNames.startApp,
                onGenerateRoute: generateRoute,
                navigatorKey: navigation,
              ),
            ),
          );
        },
      ),
    );
  }
}
