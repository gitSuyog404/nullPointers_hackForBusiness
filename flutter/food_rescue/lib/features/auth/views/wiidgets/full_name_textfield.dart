import 'package:flutter/material.dart';

class FullNameTextfield extends StatelessWidget {
  const FullNameTextfield({super.key, required this.controller});
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(8.0),
      borderSide: BorderSide(color: theme.colorScheme.onPrimary, width: 1),
    );
    return TextFormField(
      controller: controller,
      cursorColor: theme.colorScheme.onPrimary,
      decoration: InputDecoration(
        labelText: 'Full Name',
        hintText: 'eg:- John Doe',
        labelStyle: theme.textTheme.bodyMedium,
        enabledBorder: border,
        focusedBorder: border,
        border: border,
      ),
      keyboardType: TextInputType.text,
      textInputAction: TextInputAction.next,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter your name';
        }
        return null;
      },
    );
  }
}
