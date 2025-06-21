import 'package:flutter/material.dart';
import 'package:food_rescue/features/auth/views/pages/login_page.dart';
import 'package:food_rescue/features/auth/views/pages/rider_signup_page.dart';
import 'package:food_rescue/features/auth/views/pages/signup_page.dart';

import '../features/app_start/view/app_start_view.dart';
import '../features/auth/views/pages/signup_choose_page.dart';

final navigation = GlobalKey<NavigatorState>();

class RouteNames {
  static const String startApp = '/';
  static const String login = '/login';
  static const String signUp = '/signup';
  static const String signUpChoose = '/signupChoose';
  static const String rider = '/rider';
}

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case RouteNames.startApp:
      return MaterialPageRoute(builder: (context) => const AppStartPage());
    // case RouteNames.login:
    //   return _createRouteAnimation(const AppStartPage(), animationType: 'LR');
    case RouteNames.login:
      return _createRouteAnimation(const LoginPage(), animationType: 'LR');
    case RouteNames.signUp:
      if (settings.arguments != null) {
        final args = settings.arguments as Map<String, dynamic>;
        final bool isRider = args['isRider'];
        return _createRouteAnimation(
          SignupPage(isRider: isRider),
          animationType: 'LR',
        );
      }
      return _createRouteAnimation(const SignupPage(), animationType: 'LR');
    case RouteNames.signUpChoose:
      return _createRouteAnimation(
        const SignupChoosePage(),
        animationType: 'LR',
      );
    case RouteNames.rider:
      return _createRouteAnimation(
        const RiderSignupPage(),
        animationType: 'LR',
      );
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
