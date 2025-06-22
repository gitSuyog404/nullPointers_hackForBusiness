import 'package:flutter/material.dart';

class PersonalInfoTile extends StatelessWidget {
  const PersonalInfoTile({
    super.key,
    required this.leading,
    required this.title,
    required this.trailing,
  });
  final IconData leading;
  final String title, trailing;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: ListTile(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        tileColor: theme.cardColor,
        leading: Icon(leading),
        title: Text(title, style: theme.textTheme.bodyMedium),
        trailing: Text(
          trailing,
          style: theme.textTheme.bodySmall?.copyWith(
            color: theme.colorScheme.onPrimary,
          ),
        ),
      ),
    );
  }
}
