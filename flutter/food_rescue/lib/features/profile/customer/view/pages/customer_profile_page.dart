import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_rescue/features/app_start/app_start_bloc/theme_cubit.dart';
import 'package:food_rescue/features/homescreen/views/customer/widgets/rating.dart';
import 'package:food_rescue/features/profile/customer/model/profile_info_model.dart';
import 'package:food_rescue/features/profile/customer/view/widgets/personal_info_tile.dart';

class CustomerProfilePage extends StatefulWidget {
  const CustomerProfilePage({super.key});

  @override
  State<CustomerProfilePage> createState() => _CustomerProfilePageState();
}

class _CustomerProfilePageState extends State<CustomerProfilePage> {
  final List<ProfileInfoModel> profileInfo = [
    ProfileInfoModel(
      icon: Icons.email,
      title: 'E-mail',
      content: 'example@gmail.com',
    ),
    ProfileInfoModel(
      icon: Icons.call,
      title: 'Phone',
      content: '+977 9812345678',
    ),
    ProfileInfoModel(icon: Icons.person, title: 'Role', content: 'Customer'),
    ProfileInfoModel(
      icon: Icons.list_alt_sharp,
      title: 'Total orders',
      content: '12',
    ),
    // ProfileInfoModel(icon: Icons.email, title: 'E-mail', content: 'example@gmail.com'),
  ];
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        automaticallyImplyLeading: true,
        title: const Text('Profile'),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: () {
              context.read<ThemeCubit>().toggleTheme();
            },
            icon: Icon(Icons.dark_mode_sharp),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
        child: Column(
          children: [
            const SizedBox(height: 20),
            DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(62),
                border: Border.all(
                  width: 3,
                  color: theme.colorScheme.onPrimary,
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(4.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(60),
                  child: Image.network(
                    'https://th.bing.com/th/id/OIP.IrUBHhdMo6wWLFueKNreRwHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2',
                    height: 120,
                    width: 120,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 5),
            Text(
              "John Doe",
              style: theme.textTheme.headlineMedium?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Rating(receivedRating: 3),
                const SizedBox(width: 10),
                Text('| 10'),
              ],
            ),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Personal Information',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TextButton.icon(
                  style: TextButton.styleFrom(
                    padding: EdgeInsets.all(0),
                    splashFactory: NoSplash.splashFactory,
                  ),
                  onPressed: () {},
                  label: Text('Edit', style: theme.textTheme.bodyMedium),
                  icon: Icon(Icons.edit, color: theme.colorScheme.onPrimary),
                ),
              ],
            ),
            ...List.generate(profileInfo.length, (index) {
              final info = profileInfo[index];
              return PersonalInfoTile(
                leading: info.icon,
                title: info.title,
                trailing: info.content,
              );
            }),
          ],
        ),
      ),
    );
  }
}
