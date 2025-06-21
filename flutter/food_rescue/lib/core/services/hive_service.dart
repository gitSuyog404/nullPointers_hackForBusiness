import 'package:hive/hive.dart';

class HiveService {
  final String _boxName;
  late Box box;
  HiveService(this._boxName) {
    openBox();
  }

  
  Future<void> openBox<T>() async {
    if (!Hive.isBoxOpen(_boxName)) {
      box = await Hive.openBox<T>(_boxName);
    }
     box = Hive.box<T>(_boxName);
  }

  Future<void> putData<T>(String key, T data) async{
   await box.put(key, data);
  }

  T? getData<T>(String key)  {
    if (box.containsKey(key)) {
      return box.get(key) as T?;
    }
    return null;
  }

  Future<void> clear() async{
   await box.clear();
  }

}
