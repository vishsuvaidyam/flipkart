import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const MOCK_PRODUCTS = [
  // Electronics
  {
    name: 'PROD001',
    title: 'boAt Rockerz 450 Bluetooth On-Ear Headphones with Mic',
    description: 'Superior audio performance with 40mm dynamic drivers, 15 hours battery life, and integrated mic. Foldable design with plush ear cushions for all-day comfort. Bluetooth 5.0 for seamless connectivity.',
    price: 1299,
    originalPrice: 4999,
    discount: 74,
    stock: 150,
    category: 'Electronics',
    brand: 'boAt',
    rating: 4.2,
    reviews: 25431,
    image: 'https://placehold.co/400x400/2874f0/ffffff?text=boAt+Headphones',
    assured: true,
    freeDelivery: true,
    seller: 'RetailNet',
    specs: { 'Connectivity': 'Bluetooth 5.0', 'Battery Life': '15 hours', 'Driver Size': '40mm', 'Weight': '200g', 'Color': 'Luscious Black' },
  },
  {
    name: 'PROD002',
    title: 'Noise ColorFit Pro 3 Smartwatch with SpO2 & Heart Rate Monitor',
    description: '1.55" TFT full touch screen display, SpO2 monitoring, heart rate tracking, 10+ sports modes, 7 days battery life, IP68 water resistant, built-in GPS.',
    price: 2499,
    originalPrice: 6999,
    discount: 64,
    stock: 200,
    category: 'Electronics',
    brand: 'Noise',
    rating: 4.1,
    reviews: 18234,
    image: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Noise+Smartwatch',
    assured: true,
    freeDelivery: true,
    seller: 'TechHub',
    specs: { 'Display': '1.55" TFT', 'Battery': '7 days', 'Water Resistance': 'IP68', 'Connectivity': 'Bluetooth 5.0', 'GPS': 'Built-in' },
  },
  {
    name: 'PROD003',
    title: 'Mi 20000mAh Power Bank 3i with 18W Fast Charging',
    description: '20000mAh high capacity, 18W fast charging support, triple output ports, dual input charging, LED battery level indicator, travel friendly.',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    stock: 300,
    category: 'Electronics',
    brand: 'Mi',
    rating: 4.4,
    reviews: 42189,
    image: 'https://placehold.co/400x400/ff6b6b/ffffff?text=Mi+Power+Bank',
    assured: true,
    freeDelivery: true,
    seller: 'Xiaomi India',
    specs: { 'Capacity': '20000mAh', 'Input': '18W Fast Charge', 'Output Ports': '3', 'Weight': '440g', 'Charging Time': '7-8 hours' },
  },
  {
    name: 'PROD004',
    title: 'JBL C50HI In-Ear Headphones with Mic (Black)',
    description: 'Premium sound with 8.6mm dynamic drivers, tangle-free flat cable, universal 3-button remote with microphone, carry case included.',
    price: 599,
    originalPrice: 1499,
    discount: 60,
    stock: 500,
    category: 'Electronics',
    brand: 'JBL',
    rating: 4.0,
    reviews: 33456,
    image: 'https://placehold.co/400x400/2c3e50/ffffff?text=JBL+C50HI',
    assured: true,
    freeDelivery: false,
    seller: 'Electronics Hub',
    specs: { 'Driver': '8.6mm Dynamic', 'Impedance': '16 Ohm', 'Frequency': '20Hz-20kHz', 'Cable': '1.2m Flat', 'Connector': '3.5mm' },
  },
  {
    name: 'PROD005',
    title: 'Zebronics Zeb-County Wireless Optical Mouse',
    description: '2.4GHz wireless technology, 1600 DPI optical sensor, up to 8 meters range, 3 buttons with scroll wheel, low power consumption, plug & play.',
    price: 299,
    originalPrice: 799,
    discount: 63,
    stock: 400,
    category: 'Electronics',
    brand: 'Zebronics',
    rating: 3.9,
    reviews: 12567,
    image: 'https://placehold.co/400x400/27ae60/ffffff?text=Zebronics+Mouse',
    assured: false,
    freeDelivery: false,
    seller: 'Compuzone',
    specs: { 'Technology': '2.4GHz Wireless', 'DPI': '1600', 'Range': '8 meters', 'Buttons': '3', 'Battery': 'AAA x1' },
  },
  // Mobiles
  {
    name: 'PROD006',
    title: 'Redmi Note 13 5G (Midnight Black, 6GB RAM, 128GB Storage)',
    description: 'Snapdragon 685 Octa-core processor, 6.67" FHD+ 120Hz display, 108MP triple camera, 5000mAh battery with 33W fast charging, side-mounted fingerprint.',
    price: 12999,
    originalPrice: 16999,
    discount: 24,
    stock: 80,
    category: 'Mobiles',
    brand: 'Redmi',
    rating: 4.3,
    reviews: 8943,
    image: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Redmi+Note+13',
    assured: true,
    freeDelivery: true,
    seller: 'Flipkart Official',
    specs: { 'Processor': 'Snapdragon 685', 'RAM': '6GB', 'Storage': '128GB', 'Camera': '108MP Triple', 'Battery': '5000mAh 33W' },
  },
  {
    name: 'PROD007',
    title: 'Samsung Galaxy M34 5G (Midnight Blue, 6GB RAM, 128GB)',
    description: 'Exynos 1280 6nm processor, 6.5" Super AMOLED 120Hz display, 50MP triple camera with OIS, 6000mAh battery with 25W fast charging, IP67 rating.',
    price: 16499,
    originalPrice: 24999,
    discount: 34,
    stock: 60,
    category: 'Mobiles',
    brand: 'Samsung',
    rating: 4.2,
    reviews: 15234,
    image: 'https://placehold.co/400x400/0f3460/ffffff?text=Samsung+M34',
    assured: true,
    freeDelivery: true,
    seller: 'Samsung India',
    specs: { 'Processor': 'Exynos 1280', 'Display': '6.5" AMOLED 120Hz', 'Camera': '50MP OIS', 'Battery': '6000mAh 25W', 'Rating': 'IP67' },
  },
  {
    name: 'PROD008',
    title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB)',
    description: 'Snapdragon 695 5G, 6.72" LCD 120Hz display, 108MP main camera, 5000mAh battery with 67W SUPERVOOC charging, 5G ready.',
    price: 17999,
    originalPrice: 22999,
    discount: 22,
    stock: 45,
    category: 'Mobiles',
    brand: 'OnePlus',
    rating: 4.1,
    reviews: 6789,
    image: 'https://placehold.co/400x400/16a085/ffffff?text=OnePlus+Nord',
    assured: true,
    freeDelivery: true,
    seller: 'OnePlus Store',
    specs: { 'Processor': 'Snapdragon 695 5G', 'Display': '6.72" 120Hz', 'Camera': '108MP', 'Battery': '5000mAh 67W', 'OS': 'OxygenOS 13' },
  },
  // Fashion - Men
  {
    name: 'PROD009',
    title: "Levi's Men's 511 Slim Fit Jeans (Dark Indigo)",
    description: 'Slim fit from hip to ankle, sits below the waist, 99% cotton 1% elastane, machine washable, classic 5-pocket styling.',
    price: 1799,
    originalPrice: 3999,
    discount: 55,
    stock: 120,
    category: 'Fashion',
    brand: "Levi's",
    rating: 4.3,
    reviews: 9876,
    image: 'https://placehold.co/400x400/34495e/ffffff?text=Levis+Jeans',
    assured: false,
    freeDelivery: true,
    seller: 'Fashion World',
    specs: { 'Fit': 'Slim', 'Fabric': '99% Cotton, 1% Elastane', 'Care': 'Machine Wash', 'Closure': 'Zip & Button', 'Pockets': '5 Pockets' },
  },
  {
    name: 'PROD010',
    title: 'Nike Air Max 270 Running Shoes for Men (Black/White)',
    description: 'Max Air heel unit for all-day cushioning, engineered mesh upper for breathability, foam midsole for responsive cushioning, rubber outsole.',
    price: 2995,
    originalPrice: 5995,
    discount: 50,
    stock: 75,
    category: 'Fashion',
    brand: 'Nike',
    rating: 4.5,
    reviews: 23456,
    image: 'https://placehold.co/400x400/2c3e50/ffffff?text=Nike+Air+Max',
    assured: true,
    freeDelivery: true,
    seller: 'Nike India',
    specs: { 'Type': 'Running', 'Upper': 'Mesh', 'Sole': 'Rubber', 'Closure': 'Lace-up', 'Technology': 'Air Max' },
  },
  {
    name: 'PROD011',
    title: 'Allen Solly Men\'s Regular Fit Casual Shirt (Blue)',
    description: 'Regular fit casual shirt, 100% cotton fabric, full sleeves with cuffs, spread collar, chest pocket, easy-care fabric.',
    price: 699,
    originalPrice: 1499,
    discount: 53,
    stock: 200,
    category: 'Fashion',
    brand: 'Allen Solly',
    rating: 4.0,
    reviews: 5432,
    image: 'https://placehold.co/400x400/2980b9/ffffff?text=Allen+Solly',
    assured: false,
    freeDelivery: false,
    seller: 'Myntra',
    specs: { 'Fit': 'Regular', 'Fabric': '100% Cotton', 'Sleeve': 'Full Sleeve', 'Collar': 'Spread', 'Care': 'Machine Wash' },
  },
  // Fashion - Women
  {
    name: 'PROD012',
    title: 'Puma Women\'s Active Poly T-Shirt (Pink Lemonade)',
    description: 'dryCELL technology to keep you dry and comfortable, ribbed crewneck, relaxed fit, breathable polyester fabric, perfect for workouts.',
    price: 599,
    originalPrice: 1299,
    discount: 54,
    stock: 180,
    category: 'Fashion',
    brand: 'Puma',
    rating: 4.1,
    reviews: 3210,
    image: 'https://placehold.co/400x400/e91e63/ffffff?text=Puma+Tshirt',
    assured: false,
    freeDelivery: false,
    seller: 'Sports Warehouse',
    specs: { 'Fit': 'Relaxed', 'Fabric': '100% Polyester', 'Technology': 'dryCELL', 'Neck': 'Crew Neck', 'Sleeve': 'Short Sleeve' },
  },
  {
    name: 'PROD013',
    title: 'W for Woman Ethnic Kurta with Palazzo Set (Beige)',
    description: 'Cotton blend kurta with palazzo set, ethnic print, comfortable fit, festive wear collection, 3/4 sleeves with side slits.',
    price: 1199,
    originalPrice: 2499,
    discount: 52,
    stock: 90,
    category: 'Fashion',
    brand: 'W',
    rating: 4.2,
    reviews: 7654,
    image: 'https://placehold.co/400x400/c0392b/ffffff?text=W+Kurta+Set',
    assured: false,
    freeDelivery: true,
    seller: 'W Official',
    specs: { 'Type': 'Kurta & Palazzo Set', 'Fabric': 'Cotton Blend', 'Occasion': 'Festive/Ethnic', 'Sleeve': '3/4 Sleeve', 'Care': 'Hand Wash' },
  },
  // Home & Furniture
  {
    name: 'PROD014',
    title: 'Milton Thermosteel Flip Lid Flask 1000ml (Silver)',
    description: 'Double wall stainless steel vacuum insulation, flip lid with lock, keeps hot 24hrs / cold 24hrs, food grade material, rust-proof.',
    price: 449,
    originalPrice: 899,
    discount: 50,
    stock: 350,
    category: 'Home',
    brand: 'Milton',
    rating: 4.4,
    reviews: 28765,
    image: 'https://placehold.co/400x400/7f8c8d/ffffff?text=Milton+Flask',
    assured: true,
    freeDelivery: false,
    seller: 'Home Essentials',
    specs: { 'Capacity': '1000ml', 'Material': 'Stainless Steel', 'Hot/Cold': '24 hours each', 'Lid': 'Flip Lid with Lock', 'Warranty': '2 Years' },
  },
  {
    name: 'PROD015',
    title: 'Prestige Induction Cooktop PIC 16.0 Plus (1600W)',
    description: '1600W power, 7 preset cooking menus, auto shutoff, child lock, LED digital display, advanced crystal glass plate, keeps warm function.',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    stock: 60,
    category: 'Home',
    brand: 'Prestige',
    rating: 4.2,
    reviews: 11234,
    image: 'https://placehold.co/400x400/e74c3c/ffffff?text=Prestige+Induction',
    assured: true,
    freeDelivery: true,
    seller: 'Kitchen Pro',
    specs: { 'Power': '1600W', 'Preset Menus': '7', 'Display': 'LED Digital', 'Auto Shutoff': 'Yes', 'Warranty': '1 Year' },
  },
  // Beauty
  {
    name: 'PROD016',
    title: 'Lakme 9 to 5 Primer + Matte Perfect Cover Foundation SPF 20 (Ivory)',
    description: 'Oil-free formula, SPF 20 protection, 16 hour matte finish, buildable coverage, lightweight texture, suitable for normal to oily skin.',
    price: 399,
    originalPrice: 799,
    discount: 50,
    stock: 250,
    category: 'Beauty',
    brand: 'Lakme',
    rating: 4.1,
    reviews: 15678,
    image: 'https://placehold.co/400x400/f39c12/ffffff?text=Lakme+Foundation',
    assured: false,
    freeDelivery: false,
    seller: 'Beauty Hub',
    specs: { 'Finish': 'Matte', 'Coverage': 'Medium to Full', 'SPF': '20', 'Skin Type': 'Normal to Oily', 'Volume': '25ml' },
  },
  {
    name: 'PROD017',
    title: 'Mamaearth Vitamin C Face Wash with Vitamin C & Turmeric (100ml)',
    description: 'Brightening face wash with Vitamin C & Turmeric, removes tan and dark spots, SLS-free, paraben-free, dermatologically tested.',
    price: 199,
    originalPrice: 399,
    discount: 50,
    stock: 400,
    category: 'Beauty',
    brand: 'Mamaearth',
    rating: 4.3,
    reviews: 32456,
    image: 'https://placehold.co/400x400/f1c40f/ffffff?text=Mamaearth+FaceWash',
    assured: false,
    freeDelivery: false,
    seller: 'Mamaearth Official',
    specs: { 'Key Ingredients': 'Vitamin C, Turmeric', 'Volume': '100ml', 'Skin Type': 'All Skin Types', 'Free From': 'SLS, Parabens', 'Usage': 'Twice daily' },
  },
  {
    name: 'PROD018',
    title: "L'Oreal Paris Total Repair 5 Shampoo for Damaged Hair (640ml)",
    description: 'Intensive repair for 5 signs of damage, restores vitality and shine, strengthens hair, ceramide formula, suitable for dry/damaged hair.',
    price: 319,
    originalPrice: 599,
    discount: 47,
    stock: 180,
    category: 'Beauty',
    brand: "L'Oreal",
    rating: 4.2,
    reviews: 21345,
    image: 'https://placehold.co/400x400/9b59b6/ffffff?text=LOreal+Shampoo',
    assured: false,
    freeDelivery: false,
    seller: 'Health & Glow',
    specs: { 'Volume': '640ml', 'Hair Type': 'Dry/Damaged', 'Key Ingredient': 'Ceramide', 'Repairs': '5 Signs of Damage', 'Sulphate Free': 'No' },
  },
  // Books
  {
    name: 'PROD019',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits (Paperback)',
    description: 'By James Clear. A revolutionary system to get 1% better every day. Proven strategies to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    price: 399,
    originalPrice: 799,
    discount: 50,
    stock: 500,
    category: 'Books',
    brand: 'Penguin',
    rating: 4.7,
    reviews: 45678,
    image: 'https://placehold.co/400x400/e67e22/ffffff?text=Atomic+Habits',
    assured: false,
    freeDelivery: true,
    seller: 'Book World',
    specs: { 'Author': 'James Clear', 'Publisher': 'Penguin Random House', 'Pages': '320', 'Language': 'English', 'Format': 'Paperback' },
  },
  {
    name: 'PROD020',
    title: 'The Psychology of Money: Timeless Lessons on Wealth (Paperback)',
    description: 'By Morgan Housel. 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life\'s most important topics.',
    price: 349,
    originalPrice: 699,
    discount: 50,
    stock: 400,
    category: 'Books',
    brand: 'Harriman House',
    rating: 4.6,
    reviews: 38921,
    image: 'https://placehold.co/400x400/2ecc71/ffffff?text=Psychology+Money',
    assured: false,
    freeDelivery: true,
    seller: 'Book World',
    specs: { 'Author': 'Morgan Housel', 'Publisher': 'Harriman House', 'Pages': '256', 'Language': 'English', 'Format': 'Paperback' },
  },
  // Sports
  {
    name: 'PROD021',
    title: 'Cosco Finisher Cricket Bat (Short Handle, Grade 4 English Willow)',
    description: 'Grade 4 English Willow, traditional short handle, well-knocked bat, suitable for hard tennis and rubber ball, fine finish.',
    price: 599,
    originalPrice: 1199,
    discount: 50,
    stock: 100,
    category: 'Sports',
    brand: 'Cosco',
    rating: 3.8,
    reviews: 4567,
    image: 'https://placehold.co/400x400/8e44ad/ffffff?text=Cosco+Cricket+Bat',
    assured: false,
    freeDelivery: false,
    seller: 'Sports Arena',
    specs: { 'Type': 'English Willow Grade 4', 'Handle': 'Short Handle', 'Size': 'Full Size', 'Weight': '1.1-1.2 lbs', 'For': 'Hard Tennis/Rubber Ball' },
  },
  {
    name: 'PROD022',
    title: 'Nivia Spinner Football Size 5 (White/Black)',
    description: 'Size 5 football, machine stitched, 32 panels, PU material, suitable for all weather conditions, FIFA approved weight and circumference.',
    price: 449,
    originalPrice: 899,
    discount: 50,
    stock: 150,
    category: 'Sports',
    brand: 'Nivia',
    rating: 4.0,
    reviews: 6789,
    image: 'https://placehold.co/400x400/1abc9c/ffffff?text=Nivia+Football',
    assured: false,
    freeDelivery: false,
    seller: 'Sports Depot',
    specs: { 'Size': '5', 'Material': 'PU', 'Panels': '32', 'Stitching': 'Machine Stitched', 'Circumference': '68-70 cm' },
  },
  // Toys
  {
    name: 'PROD023',
    title: 'Funskool Play & Learn 100 Building Blocks Set (Multi-Color)',
    description: 'Set of 100 colorful building blocks, develops fine motor skills and creativity, non-toxic ABS plastic, suitable for 3+ years, storage bag included.',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    stock: 200,
    category: 'Toys',
    brand: 'Funskool',
    rating: 4.4,
    reviews: 8901,
    image: 'https://placehold.co/400x400/e74c3c/ffffff?text=Funskool+Blocks',
    assured: false,
    freeDelivery: true,
    seller: 'Toy Paradise',
    specs: { 'Pieces': '100', 'Material': 'ABS Plastic', 'Age': '3+ Years', 'Colors': 'Multi-Color', 'Safety': 'Non-Toxic' },
  },
  // Appliances
  {
    name: 'PROD024',
    title: 'Bajaj Majesty Mini Dry Iron 750W (White)',
    description: '750W power, non-stick soleplate for smooth gliding, light weight, corded design, suitable for all fabric types, 2 year warranty.',
    price: 549,
    originalPrice: 1099,
    discount: 50,
    stock: 120,
    category: 'Appliances',
    brand: 'Bajaj',
    rating: 4.1,
    reviews: 13456,
    image: 'https://placehold.co/400x400/95a5a6/ffffff?text=Bajaj+Iron',
    assured: true,
    freeDelivery: false,
    seller: 'Appliance World',
    specs: { 'Power': '750W', 'Soleplate': 'Non-Stick', 'Type': 'Dry Iron', 'Weight': '0.8 kg', 'Warranty': '2 Years' },
  },
  {
    name: 'PROD025',
    title: 'Philips HD9216 Air Fryer (1.8L, Black) with Rapid Air Technology',
    description: 'Rapid Air Technology for healthy frying with 75% less fat, 1.8L capacity, adjustable temperature (80-200°C), 30-minute timer, easy to clean.',
    price: 5999,
    originalPrice: 11995,
    discount: 50,
    stock: 40,
    category: 'Appliances',
    brand: 'Philips',
    rating: 4.5,
    reviews: 19876,
    image: 'https://placehold.co/400x400/2c3e50/ffffff?text=Philips+Air+Fryer',
    assured: true,
    freeDelivery: true,
    seller: 'Philips Authorized',
    specs: { 'Capacity': '1.8L', 'Power': '1425W', 'Temperature': '80-200°C', 'Timer': '30 minutes', 'Warranty': '2 Years' },
  },
  {
    name: 'PROD026',
    title: 'boAt Airdopes 141 TWS Ear Buds with 42H Playtime (Black)',
    description: 'Bluetooth 5.1 TWS earbuds, 6mm drivers, IPX4 water resistance, IWP technology for instant pairing, ASAP charge - 10min = 75min playtime.',
    price: 999,
    originalPrice: 3990,
    discount: 75,
    stock: 220,
    category: 'Electronics',
    brand: 'boAt',
    rating: 4.1,
    reviews: 67234,
    image: 'https://placehold.co/400x400/2874f0/ffffff?text=boAt+Airdopes',
    assured: true,
    freeDelivery: true,
    seller: 'RetailNet',
    specs: { 'Connectivity': 'Bluetooth 5.1', 'Driver': '6mm', 'Playback': '42 hours total', 'Water Resistance': 'IPX4', 'Fast Charge': 'ASAP Charge' },
  },
  {
    name: 'PROD027',
    title: 'OnePlus Bullets Z2 Bluetooth Wireless Neckband (Magico Black)',
    description: '12.4mm dynamic driver, 30 hours battery, IP55 splash proof, Dirac sound tuning, IP55 waterproof, fast charge 10min = 20 hours.',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    stock: 180,
    category: 'Electronics',
    brand: 'OnePlus',
    rating: 4.3,
    reviews: 34567,
    image: 'https://placehold.co/400x400/16a085/ffffff?text=OnePlus+Bullets',
    assured: true,
    freeDelivery: true,
    seller: 'OnePlus Store',
    specs: { 'Driver': '12.4mm Dynamic', 'Battery': '30 hours', 'Water Proof': 'IP55', 'Fast Charge': '10min = 20hrs', 'Connectivity': 'Bluetooth 5.0' },
  },
]

export const productStore = defineStore('flipkart-products', () => {
  const products = ref([])
  const cart = ref([])
  const wishlist = ref([])
  const toast = ref(null)
  let promise = null

  const fetchProducts = async () => {
    if (promise) return promise

    promise = (async () => {
      try {
        const response = await fetch(
          '/api/resource/Product?fields=["name","title","description","image","price","stock"]&limit_page_length=100',
          { credentials: 'include' }
        )
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        if (data.data && data.data.length > 0) {
          products.value = data.data.map((p) => ({
            ...p,
            originalPrice: Math.round(p.price * (1 + Math.random() * 0.5 + 0.1)),
            discount: Math.floor(Math.random() * 40 + 10),
            category: 'Electronics',
            brand: 'Generic',
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            reviews: Math.floor(Math.random() * 10000 + 500),
            assured: Math.random() > 0.5,
            freeDelivery: Math.random() > 0.4,
            seller: 'RetailNet',
            specs: {},
          }))
        } else {
          throw new Error('No products from API')
        }
      } catch {
        products.value = MOCK_PRODUCTS
      }
    })()

    return promise
  }

  const showToast = (message, type = 'success') => {
    toast.value = { message, type, id: Date.now() }
    setTimeout(() => { toast.value = null }, 3000)
  }

  const addToCart = (product) => {
    const existing = cart.value.find((i) => i.name === product.name)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
    showToast(`"${product.title.substring(0, 30)}..." added to cart!`)
  }

  const removeFromCart = (productName) => {
    cart.value = cart.value.filter((i) => i.name !== productName)
    showToast('Item removed from cart', 'info')
  }

  const updateQuantity = (productName, quantity) => {
    const item = cart.value.find((i) => i.name === productName)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) removeFromCart(productName)
    }
  }

  const addToWishlist = (product) => {
    if (!wishlist.value.find((i) => i.name === product.name)) {
      wishlist.value.push(product)
      showToast('Added to Wishlist!', 'success')
    } else {
      showToast('Already in Wishlist', 'info')
    }
  }

  const removeFromWishlist = (productName) => {
    wishlist.value = wishlist.value.filter((i) => i.name !== productName)
    showToast('Removed from Wishlist', 'info')
  }

  const isInWishlist = (productName) => {
    return wishlist.value.some((i) => i.name === productName)
  }

  const moveToCart = (product) => {
    removeFromWishlist(product.name)
    addToCart(product)
  }

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const cartCount = computed(() => cart.value.reduce((sum, i) => sum + i.quantity, 0))

  return {
    products,
    cart,
    wishlist,
    toast,
    fetchProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    cartTotal,
    cartCount,
    showToast,
  }
})
