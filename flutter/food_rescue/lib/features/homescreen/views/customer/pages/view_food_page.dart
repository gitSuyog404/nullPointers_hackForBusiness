import 'package:flutter/material.dart';
import 'package:food_rescue/features/homescreen/views/customer/model/food_view_model.dart';

import '../widgets/ads_crousel.dart';
import '../widgets/food_section.dart';

class ViewFoodPage extends StatefulWidget {
  const ViewFoodPage({super.key});

  @override
  State<ViewFoodPage> createState() => _ViewFoodPageState();
}

class _ViewFoodPageState extends State<ViewFoodPage> {
  final List<FoodViewModel> _foodData = [
    FoodViewModel(
      title: "Momo",
      images: [
        'assets/images/momo.jpg',
        'assets/images/momo.jpg',
        'assets/images/momo.jpg',
      ],
    ),
    FoodViewModel(
      title: "Burger",
      images: [
        'assets/images/food.jpg',
        'assets/images/food.jpg',
        'assets/images/food.jpg',
      ],
    ),
    FoodViewModel(
      title: 'Fries',
      images: [
        'assets/images/fries.jpg',
        'assets/images/fries.jpg',
        'assets/images/fries.jpg',
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        // controller: _scrollController,
        slivers: [
          SliverAppBar.medium(
            leading: IconButton(onPressed: () {}, icon: const Icon(Icons.menu)),
            automaticallyImplyLeading: false,
            title: Row(
              children: [
                Icon(Icons.local_pizza_sharp),
                SizedBox(width: 10),
                const Text('Food Rescue'),
              ],
            ),
          ),

          const SliverToBoxAdapter(child: AdsCarousel()),
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
