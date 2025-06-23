import 'package:flutter/material.dart';
import 'package:food_rescue/core/services/food_rescue_toast.dart';
import 'package:food_rescue/features/homescreen/views/rider/models/customer_model.dart';
import 'package:food_rescue/features/homescreen/views/rider/models/order_model.dart';
import 'package:food_rescue/features/homescreen/views/rider/models/order_status.dart';
import 'package:food_rescue/features/homescreen/views/rider/widgets/chat_interface.dart';
import 'package:food_rescue/features/homescreen/views/rider/widgets/order_card.dart';
import 'package:food_rescue/router/router.dart';

class RiderContent extends StatefulWidget {
  final VoidCallback toggle;

  const RiderContent({super.key, required this.toggle});

  @override
  State<RiderContent> createState() => _RiderContentState();
}

class _RiderContentState extends State<RiderContent>
    with TickerProviderStateMixin {
  late TabController _tabController;
  List<OrderModel> _orders = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _loadSampleOrders();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _loadSampleOrders() {
    // Sample data - in a real app, this would come from an API
    _orders = [
      // 15 Pending Orders
      OrderModel(
        id: '1',
        foodName: 'Chicken Momo',
        restaurantName: 'Bajeko Sekuwa',
        restaurantAddress: 'New Baneshwor, Kathmandu',
        foodImage: 'assets/images/momo.jpg',
        quantity: 2,
        price: 110,
        totalAmount: 220,
        customer: CustomerModel(
          id: '1',
          name: 'Hari Bahadur',
          phone: '+977-9841234567',
          address: 'Thamel, Kathmandu',
          rating: 4.2,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 5)),
        pickupInstructions:
            'Please come to the main entrance and ask for the food rescue pickup.',
      ),
      OrderModel(
        id: '2',
        foodName: 'Chicken Burger',
        restaurantName: 'Burger House',
        restaurantAddress: 'Durbar Marg, Kathmandu',
        foodImage: 'assets/images/food.jpg',
        quantity: 1,
        price: 250,
        totalAmount: 250,
        customer: CustomerModel(
          id: '2',
          name: 'Sita Sharma',
          phone: '+977-9851234567',
          address: 'Patan, Lalitpur',
          rating: 3.8,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 8)),
        pickupInstructions: 'Ring the bell at the side entrance.',
      ),
      OrderModel(
        id: '3',
        foodName: 'French Fries',
        restaurantName: 'Quick Bites',
        restaurantAddress: 'Lazimpat, Kathmandu',
        foodImage: 'assets/images/fries.jpg',
        quantity: 3,
        price: 80,
        totalAmount: 240,
        customer: CustomerModel(
          id: '3',
          name: 'Ram Prasad',
          phone: '+977-9861234567',
          address: 'Bhaktapur',
          rating: 4.5,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 12)),
        pickupInstructions: 'Ask for manager at the counter.',
      ),
      OrderModel(
        id: '4',
        foodName: 'Chicken Chowmein',
        restaurantName: 'Noodle Corner',
        restaurantAddress: 'Putalisadak, Kathmandu',
        foodImage: 'assets/images/momo.jpg',
        quantity: 1,
        price: 180,
        totalAmount: 180,
        customer: CustomerModel(
          id: '4',
          name: 'Maya Gurung',
          phone: '+977-9841567890',
          address: 'Boudha, Kathmandu',
          rating: 4.1,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 15)),
        pickupInstructions: 'Food is ready at the kitchen counter.',
      ),
      OrderModel(
        id: '5',
        foodName: 'Pizza Margherita',
        restaurantName: 'Pizza Palace',
        restaurantAddress: 'Jhamsikhel, Lalitpur',
        foodImage: 'assets/images/food.jpg',
        quantity: 2,
        price: 450,
        totalAmount: 900,
        customer: CustomerModel(
          id: '5',
          name: 'Bikash Thapa',
          phone: '+977-9851987654',
          address: 'Kupondole, Lalitpur',
          rating: 3.9,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 18)),
        pickupInstructions: 'Pizza boxes are at the pickup counter.',
      ),
      OrderModel(
        id: '6',
        foodName: 'Dal Bhat Set',
        restaurantName: 'Nepali Kitchen',
        restaurantAddress: 'Maharajgunj, Kathmandu',
        foodImage: 'assets/images/momo.jpg',
        quantity: 1,
        price: 200,
        totalAmount: 200,
        customer: CustomerModel(
          id: '6',
          name: 'Sunita Rai',
          phone: '+977-9861456789',
          address: 'Baneshwor, Kathmandu',
          rating: 4.7,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 22)),
        pickupInstructions: 'Packed meals are ready at the front desk.',
      ),
      OrderModel(
        id: '7',
        foodName: 'Chicken Sekuwa',
        restaurantName: 'Sekuwa Ghar',
        restaurantAddress: 'Dillibazar, Kathmandu',
        foodImage: 'assets/images/food.jpg',
        quantity: 1,
        price: 320,
        totalAmount: 320,
        customer: CustomerModel(
          id: '7',
          name: 'Rajesh Shrestha',
          phone: '+977-9841789012',
          address: 'Koteshwor, Kathmandu',
          rating: 4.3,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 25)),
        pickupInstructions: 'Order is at the grill counter.',
      ),
      OrderModel(
        id: '8',
        foodName: 'Chicken Sandwich',
        restaurantName: 'Sandwich Hub',
        restaurantAddress: 'Pulchowk, Lalitpur',
        foodImage: 'assets/images/fries.jpg',
        quantity: 2,
        price: 150,
        totalAmount: 300,
        customer: CustomerModel(
          id: '8',
          name: 'Anita Tamang',
          phone: '+977-9851345678',
          address: 'Jawalakhel, Lalitpur',
          rating: 3.6,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 28)),
        pickupInstructions: 'Sandwiches are wrapped and ready.',
      ),
      OrderModel(
        id: '9',
        foodName: 'Buff Momo',
        restaurantName: 'Momo Station',
        restaurantAddress: 'Chabahil, Kathmandu',
        foodImage: 'assets/images/momo.jpg',
        quantity: 3,
        price: 120,
        totalAmount: 360,
        customer: CustomerModel(
          id: '9',
          name: 'Deepak Karki',
          phone: '+977-9861678901',
          address: 'Jorpati, Kathmandu',
          rating: 4.4,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 32)),
        pickupInstructions: 'Steamed momos are in the steamer.',
      ),
      OrderModel(
        id: '10',
        foodName: 'Chicken Biryani',
        restaurantName: 'Biryani House',
        restaurantAddress: 'Kalanki, Kathmandu',
        foodImage: 'assets/images/food.jpg',
        quantity: 1,
        price: 380,
        totalAmount: 380,
        customer: CustomerModel(
          id: '10',
          name: 'Priya Maharjan',
          phone: '+977-9841012345',
          address: 'Swayambhu, Kathmandu',
          rating: 4.0,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 35)),
        pickupInstructions: 'Biryani is packed and ready for pickup.',
      ),
      OrderModel(
        id: '11',
        foodName: 'Chicken Thukpa',
        restaurantName: 'Himalayan Kitchen',
        restaurantAddress: 'Boudha, Kathmandu',
        foodImage: 'assets/images/momo.jpg',
        quantity: 1,
        price: 220,
        totalAmount: 220,
        customer: CustomerModel(
          id: '11',
          name: 'Karma Sherpa',
          phone: '+977-9841234890',
          address: 'Bouddhanath, Kathmandu',
          rating: 4.6,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 38)),
        pickupInstructions: 'Hot soup is ready at the kitchen.',
      ),
      OrderModel(
        id: '12',
        foodName: 'Chicken Curry',
        restaurantName: 'Spice Garden',
        restaurantAddress: 'Teku, Kathmandu',
        foodImage: 'assets/images/food.jpg',
        quantity: 2,
        price: 280,
        totalAmount: 560,
        customer: CustomerModel(
          id: '12',
          name: 'Laxmi Poudel',
          phone: '+977-9851567890',
          address: 'Kalimati, Kathmandu',
          rating: 3.7,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 42)),
        pickupInstructions: 'Curry is in takeaway containers.',
      ),
      OrderModel(
        id: '13',
        foodName: 'Veg Fried Rice',
        restaurantName: 'Green Leaf',
        restaurantAddress: 'Balaju, Kathmandu',
        foodImage: 'assets/images/fries.jpg',
        quantity: 1,
        price: 160,
        totalAmount: 160,
        customer: CustomerModel(
          id: '13',
          name: 'Suman Adhikari',
          phone: '+977-9861890123',
          address: 'Gongabu, Kathmandu',
          rating: 4.2,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 45)),
        pickupInstructions: 'Vegetarian meal is ready.',
      ),
      OrderModel(
        id: '14',
        foodName: 'Fish Curry',
        restaurantName: 'Coastal Kitchen',
        restaurantAddress: 'Sinamangal, Kathmandu',
        foodImage: 'assets/images/food.jpg',
        quantity: 1,
        price: 350,
        totalAmount: 350,
        customer: CustomerModel(
          id: '14',
          name: 'Rita Basnet',
          phone: '+977-9841567123',
          address: 'Airport Area, Kathmandu',
          rating: 4.1,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 48)),
        pickupInstructions: 'Fresh fish curry is prepared.',
      ),
      OrderModel(
        id: '15',
        foodName: 'Mutton Sekuwa',
        restaurantName: 'Mountain Grill',
        restaurantAddress: 'Basantapur, Kathmandu',
        foodImage: 'assets/images/momo.jpg',
        quantity: 1,
        price: 420,
        totalAmount: 420,
        customer: CustomerModel(
          id: '15',
          name: 'Gopal Neupane',
          phone: '+977-9851789456',
          address: 'Hanuman Dhoka, Kathmandu',
          rating: 4.8,
        ),
        status: OrderStatus.pending,
        orderTime: DateTime.now().subtract(const Duration(minutes: 50)),
        pickupInstructions: 'Grilled mutton is ready at the counter.',
      ),

      // 1 Active Order (for demonstration)
      OrderModel(
        id: '16',
        foodName: 'Chicken Wings',
        restaurantName: 'Wings Palace',
        restaurantAddress: 'Kamaladi, Kathmandu',
        foodImage: 'assets/images/food.jpg',
        quantity: 2,
        price: 300,
        totalAmount: 600,
        customer: CustomerModel(
          id: '16',
          name: 'Suresh Magar',
          phone: '+977-9841678901',
          address: 'Putalisadak, Kathmandu',
          rating: 4.0,
        ),
        status: OrderStatus.delivering,
        orderTime: DateTime.now().subtract(const Duration(hours: 1)),
        pickupTime: DateTime.now().subtract(const Duration(minutes: 30)),
        pickupInstructions: 'Wings are crispy and packed.',
      ),

      // 3 History Orders (Delivered)
      OrderModel(
        id: '17',
        foodName: 'Chicken Momo',
        restaurantName: 'Everest Momo',
        restaurantAddress: 'Asan, Kathmandu',
        foodImage: 'assets/images/momo.jpg',
        quantity: 3,
        price: 100,
        totalAmount: 300,
        customer: CustomerModel(
          id: '17',
          name: 'Binod Chaudhary',
          phone: '+977-9841234567',
          address: 'Indrachowk, Kathmandu',
          rating: 4.5,
        ),
        status: OrderStatus.delivered,
        orderTime: DateTime.now().subtract(const Duration(hours: 3)),
        pickupTime: DateTime.now().subtract(
          const Duration(hours: 2, minutes: 30),
        ),
        deliveryTime: DateTime.now().subtract(const Duration(hours: 2)),
        pickupInstructions: 'Steamed momos were ready.',
      ),
      OrderModel(
        id: '18',
        foodName: 'Chicken Burger',
        restaurantName: 'Burger Junction',
        restaurantAddress: 'Ratnapark, Kathmandu',
        foodImage: 'assets/images/food.jpg',
        quantity: 1,
        price: 280,
        totalAmount: 280,
        customer: CustomerModel(
          id: '18',
          name: 'Kamala Devi',
          phone: '+977-9851456789',
          address: 'Tripureshwor, Kathmandu',
          rating: 3.9,
        ),
        status: OrderStatus.delivered,
        orderTime: DateTime.now().subtract(const Duration(hours: 5)),
        pickupTime: DateTime.now().subtract(
          const Duration(hours: 4, minutes: 30),
        ),
        deliveryTime: DateTime.now().subtract(const Duration(hours: 4)),
        pickupInstructions: 'Burger was fresh and hot.',
      ),
      OrderModel(
        id: '19',
        foodName: 'Dal Bhat Tarkari',
        restaurantName: 'Traditional Kitchen',
        restaurantAddress: 'Bhaktapur Durbar Square',
        foodImage: 'assets/images/momo.jpg',
        quantity: 2,
        price: 180,
        totalAmount: 360,
        customer: CustomerModel(
          id: '19',
          name: 'Shyam Sundar',
          phone: '+977-9861123456',
          address: 'Bhaktapur',
          rating: 4.7,
        ),
        status: OrderStatus.delivered,
        orderTime: DateTime.now().subtract(const Duration(hours: 6)),
        pickupTime: DateTime.now().subtract(
          const Duration(hours: 5, minutes: 30),
        ),
        deliveryTime: DateTime.now().subtract(const Duration(hours: 5)),
        pickupInstructions: 'Traditional meal was packed well.',
      ),
    ];
  }

  List<OrderModel> get _pendingOrders =>
      _orders.where((order) => order.status == OrderStatus.pending).toList();

  List<OrderModel> get activeOrders =>
      _orders
          .where(
            (order) =>
                order.status == OrderStatus.accepted ||
                order.status == OrderStatus.pickingUp ||
                order.status == OrderStatus.pickedUp ||
                order.status == OrderStatus.delivering,
          )
          .toList();

  List<OrderModel> get completedOrders =>
      _orders
          .where(
            (order) =>
                order.status == OrderStatus.delivered ||
                order.status == OrderStatus.cancelled,
          )
          .toList();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: DecoratedBox(
        decoration: BoxDecoration(color: theme.colorScheme.primary),
        child: Column(
          children: [
            // App Bar
            Container(
              padding: const EdgeInsets.only(top: 40, bottom: 16),
              child: Row(
                children: [
                  const SizedBox(width: 16),
                  IconButton(
                    onPressed: widget.toggle,
                    icon: const Icon(Icons.menu),
                  ),
                  const SizedBox(width: 8),
                  const Icon(Icons.delivery_dining),
                  const SizedBox(width: 8),
                  Text(
                    'Rider Dashboard',
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: () {
                      // Refresh orders
                      setState(() {
                        _loadSampleOrders();
                      });
                      FoodRescueToast.showSuccess('Orders refreshed');
                    },
                    icon: const Icon(Icons.refresh),
                  ),
                  const SizedBox(width: 8),
                ],
              ),
            ),

            // Tab Bar
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
              ),
              child: TabBar(
                indicatorSize: TabBarIndicatorSize.tab,
                controller: _tabController,
                indicator: BoxDecoration(
                  color: theme.colorScheme.onPrimary,
                  borderRadius: BorderRadius.circular(12),
                ),
                labelColor: theme.colorScheme.primary,
                unselectedLabelColor: theme.colorScheme.onSurface,
                labelStyle: theme.textTheme.bodySmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  fontSize: 11,
                ),
                unselectedLabelStyle: theme.textTheme.bodySmall?.copyWith(
                  fontSize: 11,
                ),
                isScrollable: false,
                tabAlignment: TabAlignment.fill,
                tabs: [
                  Tab(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.schedule, size: 14),
                        const SizedBox(height: 2),
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Text(
                            'Pending\n(${_pendingOrders.length})',
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 10, height: 1.1),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Tab(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.local_shipping, size: 14),
                        const SizedBox(height: 2),
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Text(
                            'Active\n(${activeOrders.length})',
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 10, height: 1.1),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Tab(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.done_all, size: 14),
                        const SizedBox(height: 2),
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Text(
                            'History\n(${completedOrders.length})',
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 10, height: 1.1),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Tab Content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  buildOrderList(_pendingOrders, showAcceptButton: true),
                  buildOrderList(activeOrders, showStatusUpdate: true),
                  buildOrderList(completedOrders),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _openChatInterface(context),
        backgroundColor: theme.colorScheme.onPrimary,
        child: Icon(Icons.message, color: theme.colorScheme.primary),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  Widget buildOrderList(
    List<OrderModel> orders, {
    bool showAcceptButton = false,
    bool showStatusUpdate = false,
  }) {
    if (orders.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              showAcceptButton
                  ? Icons.schedule
                  : showStatusUpdate
                  ? Icons.local_shipping
                  : Icons.done_all,
              size: 64,
              color: Theme.of(context).colorScheme.secondary,
            ),
            const SizedBox(height: 16),
            Text(
              showAcceptButton
                  ? 'No pending orders'
                  : showStatusUpdate
                  ? 'No active orders'
                  : 'No completed orders',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Theme.of(context).colorScheme.secondary,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              showAcceptButton
                  ? 'New orders will appear here'
                  : showStatusUpdate
                  ? 'Accepted orders will appear here'
                  : 'Completed orders will appear here',
              style: Theme.of(context).textTheme.bodySmall,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.only(top: 16, bottom: 100),
      itemCount: orders.length,
      itemBuilder: (context, index) {
        final order = orders[index];
        return OrderCard(
          order: order,
          onTap: () => showOrderDetails(order),
          onAccept: showAcceptButton ? () => acceptOrder(order) : null,
          onStatusUpdate:
              showStatusUpdate ? () => updateOrderStatus(order) : null,
        );
      },
    );
  }

  void showOrderDetails(OrderModel order) {
    // Navigate to order details page
    navigation.currentState?.pushNamed(
      RouteNames.orderDetails,
      arguments: {'order': order},
    );
  }

  void acceptOrder(OrderModel order) {
    setState(() {
      final index = _orders.indexWhere((o) => o.id == order.id);
      if (index != -1) {
        _orders[index] = order.copyWith(status: OrderStatus.accepted);
      }
    });
    FoodRescueToast.showSuccess('Order accepted successfully!');
  }

  void updateOrderStatus(OrderModel order) {
    OrderStatus nextStatus;
    String message;

    switch (order.status) {
      case OrderStatus.accepted:
        nextStatus = OrderStatus.pickingUp;
        message = 'Going to restaurant';
        break;
      case OrderStatus.pickingUp:
        nextStatus = OrderStatus.pickedUp;
        message = 'Order picked up';
        break;
      case OrderStatus.pickedUp:
        nextStatus = OrderStatus.delivering;
        message = 'Started delivery';
        break;
      case OrderStatus.delivering:
        nextStatus = OrderStatus.delivered;
        message = 'Order delivered successfully!';
        break;
      default:
        return;
    }

    setState(() {
      final index = _orders.indexWhere((o) => o.id == order.id);
      if (index != -1) {
        _orders[index] = order.copyWith(
          status: nextStatus,
          pickupTime:
              nextStatus == OrderStatus.pickedUp
                  ? DateTime.now()
                  : order.pickupTime,
          deliveryTime:
              nextStatus == OrderStatus.delivered
                  ? DateTime.now()
                  : order.deliveryTime,
        );
      }
    });

    FoodRescueToast.showSuccess(message);
  }

  void _openChatInterface(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const ChatInterface(),
    );
  }
}
