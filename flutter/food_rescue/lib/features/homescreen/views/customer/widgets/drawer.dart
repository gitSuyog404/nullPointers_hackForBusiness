import 'package:flutter/material.dart';
import 'package:food_rescue/features/homescreen/views/customer/widgets/drawer_model.dart';
import 'package:food_rescue/router/router.dart';

import 'rating.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Padding(
      padding: const EdgeInsets.only(top: 0, left: 20, right: 10, bottom: 50),
      child: Column(
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: size.height * 0.1),
          ListTile(
            minVerticalPadding: 10,
            contentPadding: EdgeInsets.all(0),
            leading: ClipRRect(
              borderRadius: BorderRadius.circular(30),
              child: Image.network(
                'https://th.bing.com/th/id/OIP.IrUBHhdMo6wWLFueKNreRwHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2',
                height: 60,
                width: 60,
                fit: BoxFit.cover,
              ),
            ),
            title: Text(
              'Hari Bahadur',
              style: Theme.of(
                context,
              ).textTheme.headlineLarge?.copyWith(fontSize: 14),
            ),
            subtitle: Row(
              children: [Rating(receivedRating: 3, size: 15), Text(' | 10')],
            ),
          ),

          ListView.separated(
            shrinkWrap: true,
            itemBuilder: (context, index) {
              final item = drawerItems[index];
              return GestureDetector(
                onTap: () {
                  navigation.currentState?.pushNamed(item.link);
                },
                child: Row(
                  children: [
                    Icon(item.iconPath, size: 25),
                    const SizedBox(width: 30),
                    Text(
                      item.title,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              );
            },
            separatorBuilder: (context, index) => const SizedBox(height: 20),
            itemCount: drawerItems.length - 1,
          ),
          Spacer(),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Icon(drawerItems.last.iconPath, size: 25),
              const SizedBox(width: 30),
              Text(
                drawerItems.last.title,
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
