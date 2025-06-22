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
}
