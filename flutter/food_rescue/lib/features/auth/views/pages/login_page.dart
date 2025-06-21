import 'package:flutter/material.dart';
import 'package:food_rescue/features/auth/views/wiidgets/button.dart';
import 'package:food_rescue/features/auth/views/wiidgets/email_textfield.dart';
import 'package:food_rescue/features/auth/views/wiidgets/password_textfield.dart';
import 'package:food_rescue/features/auth/views/wiidgets/text_button_component.dart';

import '../../../../router/router.dart';
import '../wiidgets/clickable_message.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});


  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: size.height * 0.1),
                Text(
                  'Let\'s Sign You In.',
                  style: theme.textTheme.headlineLarge,
                ),
                SizedBox(height: size.height * 0.02),
                Text(
                  'Welcome back,\nyou\'ve been missed!',
                  style: theme.textTheme.bodySmall?.copyWith(fontSize: 24),
                ),
                SizedBox(height: size.height * 0.15),
                EmailTextfield(controller: _emailController),
                SizedBox(height: 30),
                PasswordTextField(controller: _passwordController),
                Align(
                  alignment: Alignment.topRight,
                  child: TextButtonComponent(
                    onPressed: () {},
                    title: 'Forget Password?',
                  ),
                ),
                SizedBox(height: size.height * 0.2),
                ClickableMessage(
                  theme: theme,
                  ontap: () {
                    navigation.currentState?.pushNamed(RouteNames.signUpChoose);
                  },
                  buttonText: 'Sign Up',
                  text: "Don't have an account? ",
                ),
                Button(
                  onPressed: () {},
                  title:'Log In',
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
