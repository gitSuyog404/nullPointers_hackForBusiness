import 'package:bloc/bloc.dart';
import 'package:food_rescue/core/services/loading_servce.dart';
import 'package:food_rescue/features/auth/repositories/auth_remote_repository.dart';
import 'package:food_rescue/features/auth/view_model/bloc/auth_event.dart';
import 'package:food_rescue/features/auth/view_model/bloc/auth_states.dart';

class AuthBloc extends Bloc<AuthEvent, AuthStates> {
  final AuthRemoteRepository authRemoteRepository;

  AuthBloc(this.authRemoteRepository) : super(AuthInitialState()) {
    on<LoginUser>((event, emit) async {
      LoadingService.show();
      final response = await authRemoteRepository.login(
        event.email,
        event.password,
      );
      LoadingService.hide();

      response.match(
        (errorMsg) => emit(FailedToLoginUser(message: errorMsg)),
        (success) => emit(UserLoggedInSuccesfully()),
      );
    });

    on<RegisterCustomer>((event, emit) async {
      LoadingService.show();
      final response = await authRemoteRepository.registerCustomer(
        fullName: event.fullName,
        phoneNumber: event.phoneNumber,
        email: event.email,
        password: event.password,
      );
      LoadingService.hide();

      response.match(
        (errorMsg) => emit(FailedToRegisterUser(message: errorMsg)),
        (success) => emit(CustomerRegisteredSuccessfully()),
      );
    });

    on<RegisterRider>((event, emit) async {
      LoadingService.show();
      final response = await authRemoteRepository.registerRider(
        fullName: event.fullName,
        phoneNumber: event.phoneNumber,
        email: event.email,
        password: event.password,
      );
      LoadingService.hide();

      response.match(
        (errorMsg) => emit(FailedToRegisterUser(message: errorMsg)),
        (success) => emit(RiderRegisteredSuccessfully()),
      );
    });
  }
}
