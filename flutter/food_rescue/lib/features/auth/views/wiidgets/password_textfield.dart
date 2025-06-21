import 'package:flutter/material.dart';

class PasswordTextField extends StatelessWidget {
  const PasswordTextField({
    super.key,
    required this.controller,
    this.isConfirmPassword = false,
  });
  final TextEditingController controller;
  final bool isConfirmPassword;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(8.0),
      borderSide: BorderSide(color: theme.colorScheme.onPrimary, width: 1),
    );
    final hidePassword = ValueNotifier<bool>(true);
    return ValueListenableBuilder(
      valueListenable: hidePassword,
      builder: (context, value, child) {
        return TextFormField(
          controller: controller,
          obscureText: value,
          cursorColor: theme.colorScheme.onPrimary,
          decoration: InputDecoration(
            labelText:
                isConfirmPassword
                    ? 'Re-enter your password'
                    : 'Enter your password',
            labelStyle: theme.textTheme.bodyMedium,
            hintText: '********',
            enabledBorder: border,
            focusedBorder: border,
            border: border,
            suffixIcon: IconButton(
              icon: Icon(
                value ? Icons.visibility_off_outlined : Icons.visibility,
                color: theme.colorScheme.onPrimary,
              ),
              onPressed: () {
                hidePassword.value = !hidePassword.value;
              },
            ),
          ),
          keyboardType: TextInputType.visiblePassword,
          textInputAction: TextInputAction.next,

          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter your password';
            }
            return null;
          },
        );
      },
    );
  }
}
