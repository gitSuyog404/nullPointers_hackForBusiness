import 'package:equatable/equatable.dart';

abstract class AppStartEvents extends Equatable {
  const AppStartEvents();

  @override
  List<Object?> get props => [];
}

class StartAppEvent extends AppStartEvents {}
