import 'package:flutter/material.dart';

import '../../../router/router.dart';
import '../../homescreen/views/customer/widgets/drawer_model.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  List<DrawerModel> settings = [
    // DrawerModel(
    //     title: 'Change number',
    //     image: SvgPicture.asset(
    //       'assets/images/settings/change_number.svg',
    //       height: 30,
    //       width: 30,
    //     )),
    // DrawerModel(
    //     link: RouteNames.settings.contactUs,
    //     title: 'Contact us',
    //     image: SvgPicture.asset(
    //       'assets/images/settings/contact_us.svg',
    //       height: 30,
    //       width: 30,
    //     )),
    DrawerModel(
      link: RouteNames.about,
      title: 'About us',
      iconPath: Icons.info,
    ),
  ];
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
        leading: IconButton(
          onPressed: () => navigation.currentState?.pop(),
          icon: Icon(Icons.arrow_back_ios),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
        child: ListView(
          children: [
            Text('Account', style: theme.textTheme.headlineLarge),
            const SizedBox(height: 10),
            Column(
              children: List.generate(
                settings.length,
                (index) => ListTile(
                  onTap:
                      () =>
                          navigation.currentState?.pushNamed(RouteNames.about),
                  contentPadding: EdgeInsets.all(8),
                  leading: Icon(settings[index].iconPath),
                  title: Text(settings[index].title),
                  trailing: const Icon(Icons.arrow_forward_ios_outlined),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
