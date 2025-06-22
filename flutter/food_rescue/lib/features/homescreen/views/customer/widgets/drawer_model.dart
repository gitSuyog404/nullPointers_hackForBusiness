import 'package:flutter/material.dart';

import '../../../../../router/router.dart';

class DrawerModel {
  final String title;
  final IconData iconPath;
  final String link;

  DrawerModel({
    required this.title,
    required this.iconPath,
    required this.link,
  });
}

List<DrawerModel> drawerItems = [
  DrawerModel(
    title: 'Profile',
    iconPath: Icons.person,
    link: RouteNames.customerProfile,
  ),

  DrawerModel(title: 'My Orders', iconPath: Icons.list_alt, link: '/orders'),
  DrawerModel(
    title: 'Settings',
    iconPath: Icons.settings,
    link: RouteNames.settings,
  ),
  DrawerModel(title: 'About', iconPath: Icons.info, link: RouteNames.about),
  DrawerModel(title: 'Logout', iconPath: Icons.logout, link: '/logout'),
];
