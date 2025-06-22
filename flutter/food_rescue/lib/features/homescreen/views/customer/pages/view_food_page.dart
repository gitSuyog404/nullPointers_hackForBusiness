import 'package:flutter/material.dart';

import '../widgets/drawer.dart';
import '../widgets/view_food_content.dart';

class ViewFoodPage extends StatefulWidget {
  const ViewFoodPage({super.key});

  @override
  State<ViewFoodPage> createState() => _ViewFoodPageState();
}

class _ViewFoodPageState extends State<ViewFoodPage>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 250),
    );
  }

  void toggle() =>
      _controller.isDismissed ? _controller.forward() : _controller.reverse();
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          double slide = 225 * _controller.value;
          double scale = 1 - (_controller.value * 0.3);
          return Stack(
            children: [
              AppDrawer(),
              Transform(
                transform:
                    Matrix4.identity()
                      ..translate(slide)
                      ..scale(scale),
                alignment: Alignment.centerLeft,
                child: ViewFoodContent(toggle: toggle),
              ),
            ],
          );
        },
      ),
    );
  }
}
