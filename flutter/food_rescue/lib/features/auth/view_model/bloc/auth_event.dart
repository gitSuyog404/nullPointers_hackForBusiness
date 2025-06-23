import 'package:equatable/equatable.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object> get props => [];
}

class LoginUser extends AuthEvent {
  final String email, password;

  const LoginUser({required this.email, required this.password});
}

class RegisterCustomer extends AuthEvent {
  final String fullName;
  final String phoneNumber;
  final String email;
  final String password;

  const RegisterCustomer({
    required this.fullName,
    required this.phoneNumber,
    required this.email,
    required this.password,
  });

  @override
  List<Object> get props => [fullName, phoneNumber, email, password];
}

class RegisterRider extends AuthEvent {
  final String fullName;
  final String phoneNumber;
  final String email;
  final String password;

  const RegisterRider({
    required this.fullName,
    required this.phoneNumber,
    required this.email,
    required this.password,
  });

  @override
  List<Object> get props => [fullName, phoneNumber, email, password];
}
