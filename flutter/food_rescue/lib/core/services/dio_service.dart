import 'package:dio/dio.dart';
import 'package:food_rescue/core/constants/app_constants.dart';
import 'package:food_rescue/core/local_data_source/user_local_data_source.dart';
import 'package:food_rescue/router/router.dart';

// ... [previous imports remain the same]

final class DioService {
  final Dio _dio;
  final UserLocalDataSource authLocalDataSource;
  static final bool _isRateLimited = false; // Changed variable name for clarity
  static DateTime? _retryUntil;

  DioService(this.authLocalDataSource)
    : _dio = Dio(BaseOptions(baseUrl: AppConstants.baseUrl)) {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final accessToken = authLocalDataSource.getAccessToken();
          options.headers['Authorization'] = accessToken;
          return handler.next(options);
        },
        onResponse: (response, handler) {
          return handler.next(response);
        },
        onError: (DioException error, handler) async {
          final statusCode = error.response?.statusCode;

          if (statusCode == 400 || statusCode == 409 || statusCode == 404) {
            print('Received [400||409] response: ${error.response?.data}');
            return handler.resolve(error.response!);
          } else if (statusCode == 403) {
            print('Session expired');
            navigation.currentState!.pushReplacementNamed(RouteNames.login);
            return handler.resolve(error.response!);
          } else if (statusCode == 401) {
            navigation.currentState!.pushReplacementNamed(RouteNames.login);
            return handler.resolve(error.response!);
            // final refreshSuccess = await _refreshAccessToken();
            // if (refreshSuccess) {
            //   final newOptions = Options(
            //     method: error.requestOptions.method,
            //     headers: error.requestOptions.headers,
            //   );
            //   final response = await _dio.request(
            //     error.requestOptions.path,
            //     options: newOptions,
            //     data: error.requestOptions.data,
            //     queryParameters: error.requestOptions.queryParameters,
            //   );
            //   return handler.resolve(response);
          }
        },

        //   print(
        //     'Error [Status Code: ${error.response?.statusCode}]: ${error.message}',
        //   );
        //   return handler.next(error);
        // },
      ),
    );
  }

  Future<Response<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
  }) async {
    return await _dio.get<T>(path, queryParameters: queryParameters);
  }

  Future<Response<T>> post<T>(
    String path,
    dynamic data, {
    Function(int, int)? onSendProgress,
  }) async {
    return await _dio.post<T>(path, data: data, onSendProgress: onSendProgress);
  }

  Future<Response<T>> patch<T>(String path, dynamic data) async {
    return await _dio.patch<T>(path, data: data);
  }

  Future<Response<T>> put<T>(String path, dynamic data) async {
    return await _dio.put<T>(path, data: data);
  }

  Future<Response<T>> delete<T>(String path, {dynamic data}) async {
    return await _dio.delete<T>(path, data: data);
  }
}
