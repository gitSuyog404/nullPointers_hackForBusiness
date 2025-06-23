import 'package:flutter/material.dart';

class AdsCarousel extends StatelessWidget {
  AdsCarousel({super.key});
  final List<String> _ads = [
    'assets/images/ads_banner1.jpeg',
    'assets/images/ads_banner2.jpeg',
    'assets/images/ads_banner3.jpeg',
  ];

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return SizedBox(
      height: size.height / (size.height / 180),
      child: PageView.builder(
        controller: PageController(viewportFraction: 0.85),
        itemCount: 3,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.asset(_ads[index], fit: BoxFit.cover),
            ),
          );
        },
      ),
    );
  }
}
