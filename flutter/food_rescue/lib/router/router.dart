import 'package:flutter/material.dart';
import 'package:food_rescue/features/auth/views/pages/login_page.dart';

import '../features/app_start/view/app_start_view.dart';

final navigation = GlobalKey<NavigatorState>();

class RouteNames {
  static const String startApp = '/';
  static const String login = '/login';
}

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case RouteNames.startApp:
      return MaterialPageRoute(builder: (context) => const AppStartPage());
    // case RouteNames.login:
    //   return _createRouteAnimation(const AppStartPage(), animationType: 'LR');
    case RouteNames.login:
      return MaterialPageRoute(builder: (context) => const LoginPage());
    default:
      return MaterialPageRoute(builder: (context) => const AppStartPage());
  }
}

PageRouteBuilder _createRouteAnimation(
  Widget page, {
  String animationType = 'LT',
}) {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => page,
    transitionDuration: const Duration(milliseconds: 300),
    reverseTransitionDuration: const Duration(milliseconds: 300),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      switch (animationType) {
        case 'LR':
          var slideAnimation = Tween<Offset>(
            begin: const Offset(-1.0, 0.0), // Right to left
            end: const Offset(0.0, 0.0),
          ).animate(animation);
          return SlideTransition(position: slideAnimation, child: child);
        case 'DU':
          var slideAnimation = Tween<Offset>(
            begin: const Offset(0.0, 1.0), // Down To Up
            end: const Offset(0.0, 0.0),
          ).animate(animation);
          return SlideTransition(position: slideAnimation, child: child);
        case 'RT':
        default:
          var slideAnimation = Tween<Offset>(
            begin: const Offset(1.0, 0.0), // Right to left
            end: Offset.zero,
          ).animate(animation);
          return SlideTransition(position: slideAnimation, child: child);
      }
    },
  );
}
