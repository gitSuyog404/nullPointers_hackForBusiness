import 'package:flutter/material.dart';

class TextButtonComponent extends StatelessWidget {
  const TextButtonComponent({
    super.key,
    required this.onPressed,
    required this.title,
  });
  final VoidCallback onPressed;
  final String title;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return TextButton(
      onPressed: onPressed,
      child: Text(title, style: theme.textTheme.bodySmall),
    );
  }
}
