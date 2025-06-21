import 'package:food_rescue/core/constants/box_key_const.dart';
import 'package:food_rescue/core/constants/box_names_const.dart';
import 'package:food_rescue/core/services/hive_service.dart';

class UserLocalDataSource extends HiveService {
  UserLocalDataSource() : super(BoxNamesConst.user);

  Future<void> saveAccessToken(String accessToken) async {
    await putData(BoxKeyConst.accessToken, accessToken);
  }

  String getUserData() {
    return getData(BoxKeyConst.accessToken) ?? '';
  }
}
