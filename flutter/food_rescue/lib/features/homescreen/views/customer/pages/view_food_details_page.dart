import 'package:flutter/material.dart';
import 'package:food_rescue/features/auth/views/wiidgets/button.dart';
import 'package:food_rescue/features/homescreen/views/customer/model/food_detail_model.dart';
import 'package:food_rescue/features/homescreen/views/customer/widgets/rating.dart';
import 'package:food_rescue/router/router.dart';

class ViewFoodDetailsPage extends StatefulWidget {
  const ViewFoodDetailsPage({
    super.key,
    required this.image,
    required this.category,
    required this.tag,
  });
  final String image, category, tag;

  @override
  State<ViewFoodDetailsPage> createState() => _ViewFoodDetailsPageState();
}

class _ViewFoodDetailsPageState extends State<ViewFoodDetailsPage> {
  final details = [
    FoodDetailModel(icon: Icons.location_on, name: 'New Baneshwor, Kathmandu'),
    FoodDetailModel(icon: Icons.currency_rupee_rounded, name: '110'),
    FoodDetailModel(icon: Icons.balance_sharp, name: '5'),
    FoodDetailModel(icon: Icons.calendar_month_sharp, name: '21/06/2025'),
    FoodDetailModel(icon: Icons.access_time, name: '10PM - 12PM'),
  ];
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: theme.colorScheme.primary,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios),
          onPressed: () => navigation.currentState?.pop(),
        ),
        title: Text(widget.category),
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Hero(
              tag: widget.tag,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.asset(
                  widget.image,
                  fit: BoxFit.cover,
                  width: double.infinity,
                  height: size.height * 0.23,
                  cacheWidth: size.width.toInt(),
                  cacheHeight: (size.height * 0.23).toInt(),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Text('Bajeko Sekuwa', style: theme.textTheme.bodyLarge),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Rating(receivedRating: 3.4),
                Text(' | 10', style: theme.textTheme.bodyMedium),
              ],
            ),
            SizedBox(height: 30),
            ListView.separated(
              physics: const NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              itemBuilder:
                  (context, index) => Row(
                    children: [
                      Icon(details[index].icon, size: 30),
                      const SizedBox(width: 5),
                      Text(
                        details[index].name,
                        style: theme.textTheme.bodyMedium,
                      ),
                    ],
                  ),
              separatorBuilder: (context, index) => SizedBox(height: 10),
              itemCount: details.length,
            ),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Pickup Instructions',
                      style: theme.textTheme.headlineMedium,
                    ),
                    SizedBox(height: 10),
                    Text(
                      'Please come to the main entrance and ask for the food rescue pickup. Bring your own containers if possible.',
                      style: theme.textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            Button(
              onPressed: () {
                showPlaceOrderDialog(
                  theme,
                  int.parse(details[1].name),
                  int.parse(details[2].name),
                );
              },
              title: 'Place Order',
            ),
          ],
        ),
      ),
    );
  }
}

Future<void> showPlaceOrderDialog(
  ThemeData theme,
  int price,
  int quantity,
) async {
  final ValueNotifier<int> quantityNotifier = ValueNotifier<int>(1);
  return showDialog(
    context: navigation.currentState!.context,
    builder: (context) {
      return AlertDialog(
        title: const Text('Quantity'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  onPressed: () {
                    if (quantityNotifier.value <= 1) {
                      return;
                    } // Prevent negative quantity
                    quantityNotifier.value--;
                  },
                  icon: const Icon(Icons.remove),
                ),
                const SizedBox(width: 10),
                DecoratedBox(
                  decoration: BoxDecoration(
                    color: theme.colorScheme.secondary,
                    border: Border.all(color: theme.colorScheme.onPrimary),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: ValueListenableBuilder(
                    valueListenable: quantityNotifier,
                    builder: (context, value, child) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(
                          vertical: 8,
                          horizontal: 16,
                        ),
                        child: Text(
                          value.toString(),
                          style: theme.textTheme.headlineMedium,
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(width: 10),
                IconButton(
                  onPressed: () {
                    if (quantityNotifier.value >= quantity) {
                      return;
                    }
                    quantityNotifier.value++;
                  },
                  icon: const Icon(Icons.add),
                ),
              ],
            ),

            const SizedBox(height: 10),
            ValueListenableBuilder(
              valueListenable: quantityNotifier,
              builder: (context, value, child) {
                return Text(
                  'Total: NRP ${value * price}',
                  style: theme.textTheme.bodyLarge,
                );
              },
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: Button(
                    title: 'Cancel',
                    onPressed: () {
                      Navigator.of(context).pop(); // Close the dialog
                    },
                  ),
                ),
                SizedBox(width: 10),
                Expanded(
                  child: Button(
                    title: 'Order',
                    onPressed: () {
                      // Do something
                      Navigator.of(context).pop();
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      );
    },
  );
}
