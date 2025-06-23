import 'package:food_rescue/core/local_data_source/user_local_data_source.dart';
import 'package:food_rescue/core/services/dio_service.dart';
import 'package:fpdart/fpdart.dart';

class AuthRemoteRepository {
  final DioService _dioService;
  final UserLocalDataSource _userLocalDataSource;
  const AuthRemoteRepository(this._dioService, this._userLocalDataSource);
  Future<Either<String, bool>> login(String email, String password) async {
    try {
      final response = await _dioService.post('login', {
        "email": email,
        "password": password,
      });

      if (response.statusCode == 200) {
        final token = response.data['details']['user']['token'];
        print(token);
        // _userLocalDataSource.saveAccessToken()
        // ;
        return const Right(true);
      } else {
        return Left(response.data['message']);
      }
    } catch (e) {
      print('Error: ${e.toString()}');
      return Left('Cannot Login User');
    }
  }

  Future<Either<String, bool>> registerCustomer({
    required String fullName,
    required String phoneNumber,
    required String email,
    required String password,
  }) async {
    try {
      final response = await _dioService.post('api/register/customer', {
        "name": fullName,
        "email": email,
        "password": password,
        "phone": phoneNumber,
      });

      if (response.statusCode == 200 || response.statusCode == 201) {
        return const Right(true);
      } else {
        return Left(response.data['message'] ?? 'Registration failed');
      }
    } catch (e) {
      print('Error: ${e.toString()}');
      return Left('Cannot Register Customer');
    }
  }

  Future<Either<String, bool>> registerRider({
    required String fullName,
    required String phoneNumber,
    required String email,
    required String password,
  }) async {
    try {
      final response = await _dioService.post('api/register/rider', {
        "name": fullName,
        "email": email,
        "password": password,
        "phone": phoneNumber,
      });

      if (response.statusCode == 200 || response.statusCode == 201) {
        return const Right(true);
      } else {
        return Left(response.data['message'] ?? 'Registration failed');
      }
    } catch (e) {
      print('Error: ${e.toString()}');
      return Left('Cannot Register Rider');
    }
  }
}
