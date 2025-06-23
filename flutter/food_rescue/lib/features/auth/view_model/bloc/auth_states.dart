import 'package:equatable/equatable.dart';

abstract class AuthStates extends Equatable {
  const AuthStates();

  @override
  List<Object> get props => [];
}

class AuthInitialState extends AuthStates {}

class UserLoggedInSuccesfully extends AuthStates {}

class FailedToLoginUser extends AuthStates {
  final String message;

  const FailedToLoginUser({required this.message});

  @override
  List<Object> get props => [message];
}

class CustomerRegisteredSuccessfully extends AuthStates {}

class RiderRegisteredSuccessfully extends AuthStates {}

class FailedToRegisterUser extends AuthStates {
  final String message;

  const FailedToRegisterUser({required this.message});

  @override
  List<Object> get props => [message];
}
