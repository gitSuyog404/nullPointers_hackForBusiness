import 'package:flutter/material.dart';
import 'package:food_rescue/router/router.dart';

class FoodSection extends StatelessWidget {
  final String title;
  final List<String> images;

  const FoodSection({super.key, required this.title, required this.images});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 24),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Text(title, style: theme.textTheme.headlineMedium),
          ),
          const SizedBox(height: 8),
          SizedBox(
            height: 150, // constrain height
            child: ListView.builder(
              scrollDirection: Axis.horizontal, // horizontal scroll
              itemCount: images.length,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(right: 10.0),
                  child: GestureDetector(
                    onTap: () {
                      navigation.currentState?.pushNamed(
                        RouteNames.viewFoodDetails,
                        arguments: {
                          'image': images[index],
                          'category': title,
                          'tag': '${title}_$index',
                        },
                      );
                    },
                    child: Hero(
                      tag: '${title}_$index',
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.asset(images[index], fit: BoxFit.cover),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
