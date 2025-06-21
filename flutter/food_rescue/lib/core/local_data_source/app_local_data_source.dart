import 'package:food_rescue/core/constants/box_key_const.dart';
import 'package:food_rescue/core/services/hive_service.dart';

import '../constants/box_names_const.dart';

class AppLocalDataSource extends HiveService {
  AppLocalDataSource() : super(BoxNamesConst.core);

  Future<void> saveThemeMode(bool themeMode) async {
    await putData(BoxKeyConst.theme, themeMode);
  } 

 bool get isDarkMode => getData(BoxKeyConst.theme) ?? false;


}
