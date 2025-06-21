import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart' show ThemeData;
import 'package:flutter/widgets.dart';

import '../../../../router/router.dart';

class ClickableMessage extends StatelessWidget {
  const ClickableMessage({super.key, required this.theme, required this.ontap, required this.text, required this.buttonText});

  final ThemeData theme;
  final VoidCallback ontap;
  final String text, buttonText;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.center,
      child: RichText(
        text: TextSpan(
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onPrimary,
          ),
          children: [
            TextSpan(
              text: text,
              style: theme.textTheme.bodySmall?.copyWith(fontSize: 16),
            ),
            TextSpan(
              text: buttonText,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.secondary,
                fontWeight: FontWeight.w900,
              ),
              recognizer:
                  TapGestureRecognizer()
                    ..onTap = ontap
            ),
          ],
        ),
      ),
    );
  }
}
