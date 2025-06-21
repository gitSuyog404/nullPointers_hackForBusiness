import 'package:equatable/equatable.dart';

abstract class AppStartStates extends Equatable{
  const AppStartStates();

  @override
  List<Object?> get props => [];
}

class AppStartedState extends AppStartStates {
  const AppStartedState();

}