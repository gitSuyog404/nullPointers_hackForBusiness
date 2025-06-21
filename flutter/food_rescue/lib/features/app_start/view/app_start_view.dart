import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_rescue/features/app_start/app_start_bloc/app_start_bloc.dart';
import 'package:food_rescue/features/app_start/app_start_bloc/app_start_events.dart';
import 'package:food_rescue/features/app_start/app_start_bloc/app_start_states.dart';
import 'package:food_rescue/router/router.dart';

class AppStartPage extends StatefulWidget {
  const AppStartPage({super.key});

  @override
  State<AppStartPage> createState() => _AppStartPageState();
}

class _AppStartPageState extends State<AppStartPage> {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) {
        final bloc = AppStartBloc();
        bloc.add(StartAppEvent());
        return bloc;
      },
      child: Scaffold(
        body: BlocListener<AppStartBloc, AppStartStates>(
          listener: (context, state) {
            if (state is AppStartedState) {
              navigation.currentState?.pushReplacementNamed(RouteNames.login);
            }
          },
          child: SizedBox(),
        ),
      ),
    );
  }
}
