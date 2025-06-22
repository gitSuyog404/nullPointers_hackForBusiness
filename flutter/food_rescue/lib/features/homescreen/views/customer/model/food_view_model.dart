class FoodViewModel {
  String title;
  List<String> images;

  FoodViewModel({required this.title,required this.images});

  FoodViewModel.fromJson(Map<String, dynamic> json)
      : title = json['title'] ?? '',
        images = json['images'] != null
            ? List<String>.from(json['images'])
            : <String>[];

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['title'] = title;
    data['images'] = images;
    return data;
  }
}
