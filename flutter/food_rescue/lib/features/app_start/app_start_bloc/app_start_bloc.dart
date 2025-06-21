import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_rescue/features/app_start/app_start_bloc/app_start_events.dart';
import 'package:food_rescue/features/app_start/app_start_bloc/app_start_states.dart';

class AppStartBloc extends Bloc<AppStartEvents, AppStartStates> {
  AppStartBloc() : super(const AppStartedState()) {
    on<StartAppEvent>((event, emit) async {
      emit(const AppStartedState());
    });
  }

}