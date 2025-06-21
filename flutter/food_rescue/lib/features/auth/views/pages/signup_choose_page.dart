import 'package:flutter/material.dart';
import 'package:food_rescue/features/auth/views/wiidgets/choose_signup_compoent.dart';
import 'package:food_rescue/router/router.dart';

class SignupChoosePage extends StatefulWidget {
  const SignupChoosePage({super.key});

  @override
  State<SignupChoosePage> createState() => _SignupChoosePageState();
}

class _SignupChoosePageState extends State<SignupChoosePage> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: theme.primaryColor,
          leading: IconButton(
            onPressed: () => navigation.currentState?.pop(),
            icon: Icon(Icons.arrow_back_ios),
          ),
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ChooseSignupCompoent(
                title: 'Register as a customer',
                onTap: () {
                  navigation.currentState?.pop();
                  navigation.currentState?.pushReplacementNamed(
                    RouteNames.signUp,
                  );
                },
              ),
              SizedBox(height: 50),
              ChooseSignupCompoent(
                title: 'Register as a Rider',
                onTap: () {
                  navigation.currentState?.pop();
                  navigation.currentState?.pushReplacementNamed(
                    RouteNames.signUp,
                    arguments: {'isRider': true},
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
