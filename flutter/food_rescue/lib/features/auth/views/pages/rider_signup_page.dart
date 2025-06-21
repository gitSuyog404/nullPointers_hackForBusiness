import 'package:flutter/material.dart';
import 'package:food_rescue/features/auth/views/wiidgets/button.dart';
import 'package:food_rescue/router/router.dart';

class RiderSignupPage extends StatefulWidget {
  const RiderSignupPage({super.key});

  @override
  State<RiderSignupPage> createState() => _RiderSignupPageState();
}

class _RiderSignupPageState extends State<RiderSignupPage> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: theme.colorScheme.primary,
          leading: IconButton(
            onPressed: () {
              navigation.currentState?.pop();
            },
            icon: Icon(Icons.arrow_back_ios),
          ),
        ),
        body: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Document', style: theme.textTheme.headlineLarge),
              SizedBox(height: size.height * 0.02),
              Text(
                'Select Your Documents',
                style: theme.textTheme.bodySmall?.copyWith(fontSize: 24),
              ),
              SizedBox(height: size.height * 0.1),
              Text(
                'Citizenship',
                style: theme.textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: size.height * 0.02),
              Container(
                width: size.width / 2.5,
                height: size.height * 0.17,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: theme.colorScheme.onPrimary,
                    width: 1,
                  ),
                  color: theme.colorScheme.primaryContainer,
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Icon(Icons.cloud_upload_outlined, size: size.height * 0.1),
                    Text('Select File'),
                  ],
                ),
              ),
              SizedBox(height: size.height * 0.34),
              Button(onPressed: () {}, title: 'Sign Up'),
            ],
          ),
        ),
      ),
    );
  }
}
