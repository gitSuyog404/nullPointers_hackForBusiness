import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

import '../../../../../core/constants/color_constants.dart';

class Rating extends StatelessWidget {
  const Rating({super.key, required this.receivedRating});
  final double receivedRating;
  @override
  Widget build(BuildContext context) {
    return RatingBarIndicator(
      rating: receivedRating,
      unratedColor: AppColors.ratingColor, // Float value for stars
      itemBuilder:
          (context, index) =>
              const Icon(Icons.star, color: AppColors.starsCoolor),
      itemCount: 5,
      itemSize: 24.0,
    );
  }
}
