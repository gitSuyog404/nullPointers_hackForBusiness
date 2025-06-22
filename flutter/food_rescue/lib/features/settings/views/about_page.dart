import 'package:flutter/material.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          const _AboutAppBar(),
          SliverPadding(
            padding: const EdgeInsets.all(16.0),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                const _AboutMission(),
                const SizedBox(height: 16),
                const _AboutChips(),
                const SizedBox(height: 24),
                const _MissionDetails(),
                const SizedBox(height: 16),
                const _MissionHighlights(),
                const SizedBox(height: 24),
                const _OurStory(),
                const SizedBox(height: 12),
                const _StoryChips(),
                const SizedBox(height: 20),
                const _QuoteCard(),
                const SizedBox(height: 32),
                const _ValuesSection(),
                const SizedBox(height: 32),
                const _ImpactMetrics(),
                const SizedBox(height: 32),
                const _JoinMission(),
                const SizedBox(height: 32),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _AboutAppBar extends StatelessWidget {
  const _AboutAppBar();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SliverAppBar(
      expandedHeight: 180,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        title: const Text('Food Rescue'),
        background: Container(
          color: theme.colorScheme.primary,
          child: const Center(
            child: Icon(Icons.restaurant, size: 80, color: Colors.white),
          ),
        ),
      ),
    );
  }
}

class _AboutMission extends StatelessWidget {
  const _AboutMission();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "About Our Mission",
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          "We're on a mission to eliminate food waste while fighting hunger in our communities. Every meal saved is a step toward a more sustainable and compassionate world.",
          style: theme.textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _AboutChips extends StatelessWidget {
  const _AboutChips();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final labels = ["Global Impact", "Growing Community", "Local Action"];
    return Wrap(
      spacing: 10,
      children:
          labels
              .map(
                (label) => Chip(
                  label: Text(label),
                  backgroundColor: theme.colorScheme.error,
                ),
              )
              .toList(),
    );
  }
}

class _MissionDetails extends StatelessWidget {
  const _MissionDetails();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Our Mission",
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          "Food Rescue was born from a simple yet powerful observation: while millions go hungry, tons of perfectly good food are wasted every day.",
          style: theme.textTheme.bodyMedium,
        ),
        const SizedBox(height: 8),
        Text(
          "We bridge this gap by connecting restaurants with surplus food to volunteers who distribute it to those in need.",
          style: theme.textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _MissionHighlights extends StatelessWidget {
  const _MissionHighlights();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final items = [
      {
        'icon': Icons.verified,
        'label': 'Food Safety First',
        'desc': 'Strict guidelines ensure safety standards',
      },
      {
        'icon': Icons.people,
        'label': 'Community Driven',
        'desc': 'Local volunteers lead the efforts',
      },
      {
        'icon': Icons.eco,
        'label': 'Environmental Impact',
        'desc': 'Reducing greenhouse gas emissions',
      },
    ];

    return Column(
      children:
          items
              .map(
                (item) => ListTile(
                  leading: Icon(
                    item['icon'] as IconData,
                    size: 32,
                    color: theme.colorScheme.onPrimary,
                  ),
                  title: Text(
                    item['label'] as String,
                    style: theme.textTheme.titleMedium,
                  ),
                  subtitle: Text(item['desc'] as String),
                ),
              )
              .toList(),
    );
  }
}

class _OurStory extends StatelessWidget {
  const _OurStory();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Our Story",
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          "It started with a conversation between a restaurant owner and a shelter volunteer...",
          style: theme.textTheme.bodyMedium,
        ),
        const SizedBox(height: 8),
        Text(
          "By creating a platform that connects food surplus with food need, we could scale this simple act of sharing across entire communities.",
          style: theme.textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _StoryChips extends StatelessWidget {
  const _StoryChips();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final labels = ["Growing Impact", "Expanding Reach"];
    return Wrap(
      spacing: 10,
      children:
          labels
              .map(
                (label) => Chip(
                  label: Text(label),
                  backgroundColor: theme.colorScheme.error,
                ),
              )
              .toList(),
    );
  }
}

class _QuoteCard extends StatelessWidget {
  const _QuoteCard();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.primaryContainer,
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(16),
      child: Text(
        '"Every meal we rescue represents hope - hope for someone who needed it, hope for our planet, and hope for a more compassionate world."\n\n- Food Rescue Team',
        style: theme.textTheme.bodyLarge?.copyWith(fontStyle: FontStyle.italic),
      ),
    );
  }
}

class _ValuesSection extends StatelessWidget {
  const _ValuesSection();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final items = [
      {
        'icon': Icons.favorite,
        'label': 'Compassion',
        'desc': 'Small kindness, big change.',
      },
      {
        'icon': Icons.recycling,
        'label': 'Sustainability',
        'desc': 'Each meal saved helps the planet.',
      },
      {
        'icon': Icons.group,
        'label': 'Community',
        'desc': 'Connecting restaurants & people.',
      },
      {
        'icon': Icons.shield,
        'label': 'Trust',
        'desc': 'Highest standards of safety.',
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Our Values",
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        ...items.map(
          (item) => ListTile(
            leading: Icon(
              item['icon'] as IconData,
              color: theme.colorScheme.onPrimary,
            ),
            title: Text(item['label'] as String),
            subtitle: Text(item['desc'] as String),
          ),
        ),
      ],
    );
  }
}

class _ImpactMetrics extends StatelessWidget {
  const _ImpactMetrics();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final metrics = [
      {'label': '50,000+', 'desc': 'Meals Rescued'},
      {'label': '200+', 'desc': 'Partner Restaurants'},
      {'label': '1,500+', 'desc': 'Active Volunteers'},
      {'label': '25+', 'desc': 'Communities Served'},
    ];

    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: 2.3,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
      children:
          metrics
              .map(
                (metric) => DecoratedBox(
                  decoration: BoxDecoration(
                    color: theme.colorScheme.error,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(8),

                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          metric['label']!,
                          style: theme.textTheme.headlineMedium,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          metric['desc']!,
                          style: theme.textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ),
              )
              .toList(),
    );
  }
}

class _JoinMission extends StatelessWidget {
  const _JoinMission();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Join Our Mission",
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          "Whether you're a restaurant owner, volunteer, or someone who wants to make a difference, there's a place for you in the Food Rescue community.",
          style: theme.textTheme.bodyMedium,
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.fastfood),
                label: const Text("List Your Food"),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.volunteer_activism),
                label: const Text("Become a Volunteer"),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
