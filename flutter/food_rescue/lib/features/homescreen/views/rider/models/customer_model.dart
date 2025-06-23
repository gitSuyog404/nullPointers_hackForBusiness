class CustomerModel {
  final String id;
  final String name;
  final String phone;
  final String address;
  final String? profileImage;
  final double? rating;

  CustomerModel({
    required this.id,
    required this.name,
    required this.phone,
    required this.address,
    this.profileImage,
    this.rating,
  });

  CustomerModel.fromJson(Map<String, dynamic> json)
      : id = json['id'] ?? '',
        name = json['name'] ?? '',
        phone = json['phone'] ?? '',
        address = json['address'] ?? '',
        profileImage = json['profileImage'],
        rating = json['rating']?.toDouble();

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'address': address,
      'profileImage': profileImage,
      'rating': rating,
    };
  }
}
