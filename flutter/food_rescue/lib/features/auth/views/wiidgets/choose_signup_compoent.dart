import 'package:flutter/material.dart';

class ChooseSignupCompoent extends StatelessWidget {
  const ChooseSignupCompoent({
    super.key,
    required this.title,
    required this.onTap,
  });
  final String title;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: DecoratedBox(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1), // Shadow color
              blurRadius: 10, // Softness of the shadow
              spreadRadius: 5, // Spread distance
              offset: Offset(0, 4), // Direction: x, y
            ),
          ],
          border: Border.all(color: theme.colorScheme.onPrimary, width: 2.0),
          color: theme.colorScheme.primary,
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: theme.textTheme.headlineMedium),
              Icon(
                Icons.arrow_forward_ios,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
