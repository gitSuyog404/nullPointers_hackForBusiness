import 'package:flutter/material.dart';
import 'package:food_rescue/features/homescreen/views/customer/widgets/ads_crousel.dart'
    show AdsCarousel;

import '../model/food_view_model.dart';
import 'food_section.dart';

class ViewFoodContent extends StatelessWidget {
  ViewFoodContent({super.key, required this.toggle});
  final VoidCallback toggle;
  final List<FoodViewModel> _foodData = [
    FoodViewModel(
      title: "Momo",
      images: [
        'assets/images/steam_momo.jpg',
        'assets/images/fried_momo.jpg',
        'assets/images/c_momo.jpeg',
      ],
    ),
    FoodViewModel(
      title: "Burger",
      images: [
        'assets/images/burger1.jpeg',
        'assets/images/burger2.jpeg',
        'assets/images/burger3.jpeg',
      ],
    ),
    FoodViewModel(
      title: 'Fries',
      images: [
        'assets/images/fries1.jpeg',
        'assets/images/fries2.jpeg',
        'assets/images/fries3.jpeg',
      ],
    ),
  ];
  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(color: Theme.of(context).colorScheme.primary),
      child: CustomScrollView(
        // controller: _scrollController,
        slivers: [
          SliverAppBar.medium(
            leading: IconButton(
              onPressed: toggle,
              icon: const Icon(Icons.menu),
            ),
            automaticallyImplyLeading: false,
            title: Row(
              children: [
                Icon(Icons.local_pizza_sharp),
                SizedBox(width: 10),
                const Text('Food Rescue'),
              ],
            ),
          ),

           SliverToBoxAdapter(child: AdsCarousel()),
          SliverPadding(
            padding: const EdgeInsets.only(bottom: 8.0),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate((context, index) {
                final food = _foodData[index];
                return FoodSection(title: food.title, images: food.images);
              }, childCount: _foodData.length),
            ),
          ),
        ],
      ),
    );
  }
}
