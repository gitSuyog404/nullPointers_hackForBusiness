import 'package:flutter/material.dart';
import 'package:food_rescue/features/auth/views/wiidgets/clickable_message.dart';
import 'package:food_rescue/features/auth/views/wiidgets/email_textfield.dart';
import 'package:food_rescue/features/auth/views/wiidgets/full_name_textfield.dart';
import 'package:food_rescue/features/auth/views/wiidgets/password_textfield.dart';
import 'package:food_rescue/features/auth/views/wiidgets/phone_number_textfield.dart';

import '../../../../router/router.dart';
import '../wiidgets/button.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key, this.isRider = false});
  final bool isRider;

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _fullnameController = TextEditingController();
  final TextEditingController _phoneNumberController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final theme = Theme.of(context);
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
                  'Create Your Account',
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                SizedBox(height: size.height * 0.02),
                Text(
                  'Welcome Please Enter Your Details',
                  style: theme.textTheme.bodySmall?.copyWith(fontSize: 24),
                ),
                SizedBox(height: size.height * 0.1),
                FullNameTextfield(controller: _fullnameController),
                SizedBox(height: 30),
                PhoneNumberTextfield(controller: _phoneNumberController),
                SizedBox(height: 30),
                EmailTextfield(controller: _emailController),
                SizedBox(height: 30),
                PasswordTextField(controller: _passwordController),
                SizedBox(height: 30),
                PasswordTextField(
                  controller: _confirmPasswordController,
                  isConfirmPassword: true,
                ),
                SizedBox(height: 25),
                ClickableMessage(
                  theme: theme,
                  ontap: () {
                    navigation.currentState?.pushReplacementNamed(
                      RouteNames.login,
                    );
                  },
                  text: 'Already have an account?',
                  buttonText: 'Login',
                ),
                Align(
                  alignment: Alignment.center,
                  child: Button(
                    onPressed: () {
                      // if (widget.isRider) {
                      //   navigation.currentState?.pushNamed(RouteNames.rider);
                      // }
                    },
                    title:
                        //  widget.isRider ? 'Next' :
                        'Sign Up',
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
