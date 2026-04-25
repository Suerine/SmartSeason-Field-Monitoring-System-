const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Field = require("./models/Field");
const Crop = require("./models/Crop");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Seeding...");

  await User.deleteMany({});
  await Field.deleteMany({});
  await Crop.deleteMany({});

  // ─── CROPS ────────────────────────────────────────────────────────────────
  const [
    maize,
    wheat,
    rice,
    beans,
    coffee,
    potatoes,
    tomatoes,
    sunflower,
    sorghum,
    cassava,
    sweetPotato,
    kale,
  ] = await Crop.create([
    {
      name: "Maize",
      description: "Staple grain crop widely grown across East Africa.",
      optimalConditions: {
        temperature: "18–27°C",
        humidity: "50–80%",
        soilType: "Loamy",
      },
      growthStages: [
        {
          stageName: "Germination",
          category: "Planted",
          durationDays: 7,
          careInstructions:
            "Check for seedling emergence. Keep soil moist but not waterlogged.",
        },
        {
          stageName: "Vegetative",
          category: "Growing",
          durationDays: 40,
          careInstructions:
            "Apply top-dress fertilizer at 3 weeks. Watch for stalk borer.",
        },
        {
          stageName: "Flowering",
          category: "Growing",
          durationDays: 20,
          careInstructions:
            "Ensure consistent watering during tasseling. Critical window.",
        },
        {
          stageName: "Grain Fill",
          category: "Ready",
          durationDays: 14,
          careInstructions: "Cobs are firm. Reduce irrigation gradually.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 7,
          careInstructions:
            "Dry cobs to 13% moisture before shelling and storage.",
        },
      ],
    },
    {
      name: "Wheat",
      description: "Cool-season cereal grown mainly in highland areas.",
      optimalConditions: {
        temperature: "10–24°C",
        humidity: "40–70%",
        soilType: "Clay-loam",
      },
      growthStages: [
        {
          stageName: "Establishment",
          category: "Planted",
          durationDays: 10,
          careInstructions:
            "Drill seeds at 2–3 cm depth. Ensure even distribution.",
        },
        {
          stageName: "Tillering",
          category: "Growing",
          durationDays: 45,
          careInstructions:
            "Top-dress with CAN fertilizer. Scout for rust disease.",
        },
        {
          stageName: "Heading",
          category: "Growing",
          durationDays: 30,
          careInstructions:
            "Apply fungicide if rust detected. Avoid waterlogging.",
        },
        {
          stageName: "Ripening",
          category: "Ready",
          durationDays: 14,
          careInstructions:
            "Moisture content below 14% before harvest. Golden color.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 5,
          careInstructions:
            "Thresh within 48hrs of cutting. Store in dry bags.",
        },
      ],
    },
    {
      name: "Rice",
      description: "Paddy rice grown in irrigated lowland fields.",
      optimalConditions: {
        temperature: "20–35°C",
        humidity: "70–90%",
        soilType: "Clay",
      },
      growthStages: [
        {
          stageName: "Transplanting",
          category: "Planted",
          durationDays: 21,
          careInstructions: "Flood paddy to 5cm after transplanting seedlings.",
        },
        {
          stageName: "Tillering",
          category: "Growing",
          durationDays: 45,
          careInstructions:
            "Apply Urea at tillering stage. Maintain water level.",
        },
        {
          stageName: "Panicle Initiation",
          category: "Growing",
          durationDays: 30,
          careInstructions: "Keep fields flooded. Watch for blast disease.",
        },
        {
          stageName: "Ripening",
          category: "Ready",
          durationDays: 30,
          careInstructions:
            "Drain field 2 weeks before harvest. Check grain hardness.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 7,
          careInstructions:
            "Sun-dry to 14% moisture. Bag and store in raised store.",
        },
      ],
    },
    {
      name: "Beans",
      description: "Common bean — vital protein source for smallholders.",
      optimalConditions: {
        temperature: "16–24°C",
        humidity: "50–70%",
        soilType: "Well-drained loam",
      },
      growthStages: [
        {
          stageName: "Sowing",
          category: "Planted",
          durationDays: 10,
          careInstructions: "Inoculate seeds with rhizobium. Plant 5cm deep.",
        },
        {
          stageName: "Vegetative",
          category: "Growing",
          durationDays: 35,
          careInstructions: "Weed at 3 weeks. Minimal fertiliser needed.",
        },
        {
          stageName: "Pod Filling",
          category: "Growing",
          durationDays: 20,
          careInstructions:
            "Monitor for bean fly and aphids. Avoid overhead irrigation.",
        },
        {
          stageName: "Drying",
          category: "Ready",
          durationDays: 10,
          careInstructions: "Harvest when pods rattle. Pull entire plant.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 5,
          careInstructions:
            "Dry pods before threshing. Store with ash to prevent weevils.",
        },
      ],
    },
    {
      name: "Coffee (Arabica)",
      description: "High-value perennial cash crop grown in highland regions.",
      optimalConditions: {
        temperature: "15–24°C",
        humidity: "60–80%",
        soilType: "Volcanic",
      },
      growthStages: [
        {
          stageName: "Pruning/Maintenance",
          category: "Planted",
          durationDays: 30,
          careInstructions: "Clear old branches. Apply compost around base.",
        },
        {
          stageName: "Flowering",
          category: "Growing",
          durationDays: 60,
          careInstructions:
            "Monitor for Coffee Berry Borer. Spray if necessary.",
        },
        {
          stageName: "Berry Development",
          category: "Growing",
          durationDays: 150,
          careInstructions: "Apply organic mulch. Maintain shade trees.",
        },
        {
          stageName: "Ripening",
          category: "Ready",
          durationDays: 30,
          careInstructions:
            "Pick only cherry-red berries. Selective picking only.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 10,
          careInstructions: "Pulp within 24hrs. Ferment for 36hrs then wash.",
        },
      ],
    },
    {
      name: "Potatoes",
      description: "High-energy tuber crop suited to cool highland climates.",
      optimalConditions: {
        temperature: "15–20°C",
        humidity: "70–85%",
        soilType: "Loose, sandy loam",
      },
      growthStages: [
        {
          stageName: "Sprouting",
          category: "Planted",
          durationDays: 15,
          careInstructions:
            "Ensure seed eyes face up. Pre-sprout in shade for 2 weeks.",
        },
        {
          stageName: "Tuber Initiation",
          category: "Growing",
          durationDays: 30,
          careInstructions:
            "Earth up soil around stems to protect tubers from light.",
        },
        {
          stageName: "Tuber Bulking",
          category: "Growing",
          durationDays: 45,
          careInstructions:
            "Maintain consistent moisture. Watch for late blight.",
        },
        {
          stageName: "Maturation",
          category: "Ready",
          durationDays: 20,
          careInstructions:
            "Wait for foliage to yellow and die back naturally.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 10,
          careInstructions: "Cure in dark for 2 weeks before storage or sale.",
        },
      ],
    },
    {
      name: "Tomatoes",
      description:
        "Popular vegetable for greenhouse and open field production.",
      optimalConditions: {
        temperature: "20–28°C",
        humidity: "60–70%",
        soilType: "Rich loam",
      },
      growthStages: [
        {
          stageName: "Transplanting",
          category: "Planted",
          durationDays: 14,
          careInstructions: "Stake plants immediately. Water at base only.",
        },
        {
          stageName: "Early Growth",
          category: "Growing",
          durationDays: 20,
          careInstructions:
            "Remove suckers weekly. Apply calcium to prevent blossom rot.",
        },
        {
          stageName: "Fruit Set",
          category: "Growing",
          durationDays: 20,
          careInstructions: "Apply high-potassium feed. Watch for whitefly.",
        },
        {
          stageName: "Red Ripening",
          category: "Ready",
          durationDays: 10,
          careInstructions: "Pick when fully colored. Harvest every 2 days.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 3,
          careInstructions: "Handle gently. Grade by size before packing.",
        },
      ],
    },
    {
      name: "Sunflower",
      description:
        "Oilseed crop excellent for semi-arid regions and smallholder farms.",
      optimalConditions: {
        temperature: "20–30°C",
        humidity: "40–60%",
        soilType: "Well-drained loam",
      },
      growthStages: [
        {
          stageName: "Emergence",
          category: "Planted",
          durationDays: 10,
          careInstructions: "Thin to one plant per hole after emergence.",
        },
        {
          stageName: "Vegetative",
          category: "Growing",
          durationDays: 35,
          careInstructions:
            "Top-dress with CAN. Control weeds aggressively early.",
        },
        {
          stageName: "Flowering",
          category: "Growing",
          durationDays: 25,
          careInstructions:
            "Do not spray insecticides — pollinators are critical now.",
        },
        {
          stageName: "Seed Fill",
          category: "Ready",
          durationDays: 20,
          careInstructions:
            "Protect from birds. Check back of head for yellowing.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 7,
          careInstructions:
            "Cut heads when back turns yellow-brown. Dry before threshing.",
        },
      ],
    },
    {
      name: "Sorghum",
      description:
        "Drought-tolerant cereal ideal for semi-arid and ASAL regions.",
      optimalConditions: {
        temperature: "25–35°C",
        humidity: "30–60%",
        soilType: "Sandy-loam",
      },
      growthStages: [
        {
          stageName: "Planting",
          category: "Planted",
          durationDays: 10,
          careInstructions:
            "Plant at onset of rains. 5cm depth. 2 seeds per hole.",
        },
        {
          stageName: "Tillering",
          category: "Growing",
          durationDays: 40,
          careInstructions: "Tolerates dry spells. Light top-dress only.",
        },
        {
          stageName: "Booting",
          category: "Growing",
          durationDays: 30,
          careInstructions:
            "Watch for shoot fly. Apply pesticide if infestation detected.",
        },
        {
          stageName: "Grain Fill",
          category: "Ready",
          durationDays: 20,
          careInstructions: "Heads should be firm. Bird scaring required.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 7,
          careInstructions:
            "Cut heads and dry under shade for 5 days before threshing.",
        },
      ],
    },
    {
      name: "Cassava",
      description: "Hardy starch crop with 12–18 month growing cycle.",
      optimalConditions: {
        temperature: "25–29°C",
        humidity: "50–80%",
        soilType: "Sandy loam",
      },
      growthStages: [
        {
          stageName: "Establishment",
          category: "Planted",
          durationDays: 30,
          careInstructions:
            "Plant cuttings at 45° angle. Keep weed-free for first month.",
        },
        {
          stageName: "Canopy Growth",
          category: "Growing",
          durationDays: 120,
          careInstructions:
            "Minimal inputs needed. Monitor for cassava mosaic virus.",
        },
        {
          stageName: "Root Bulking",
          category: "Growing",
          durationDays: 180,
          careInstructions:
            "Avoid waterlogging. Do not disturb soil around base.",
        },
        {
          stageName: "Maturation",
          category: "Ready",
          durationDays: 30,
          careInstructions:
            "Test roots by lifting one plant. Roots should snap cleanly.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 14,
          careInstructions:
            "Process within 48hrs or sun-dry into chips immediately.",
        },
      ],
    },
    {
      name: "Sweet Potato",
      description: "Fast-maturing nutritious root crop for food security.",
      optimalConditions: {
        temperature: "21–26°C",
        humidity: "50–70%",
        soilType: "Sandy loam",
      },
      growthStages: [
        {
          stageName: "Vine Establishment",
          category: "Planted",
          durationDays: 21,
          careInstructions:
            "Plant vine cuttings on ridges. Water for first 2 weeks.",
        },
        {
          stageName: "Vine Spreading",
          category: "Growing",
          durationDays: 40,
          careInstructions:
            "Do not over-fertilise with nitrogen — promotes leaves not roots.",
        },
        {
          stageName: "Root Development",
          category: "Growing",
          durationDays: 40,
          careInstructions: "Lift a plant to check root size. Keep soil loose.",
        },
        {
          stageName: "Maturation",
          category: "Ready",
          durationDays: 20,
          careInstructions:
            "Leaves turn yellow. Roots should be firm and full-sized.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 5,
          careInstructions: "Cure for 1 week in warm shade to harden skin.",
        },
      ],
    },
    {
      name: "Kale (Sukuma Wiki)",
      description: "Fast-growing leafy vegetable, staple of Kenyan diet.",
      optimalConditions: {
        temperature: "15–25°C",
        humidity: "60–80%",
        soilType: "Rich loam",
      },
      growthStages: [
        {
          stageName: "Transplanting",
          category: "Planted",
          durationDays: 14,
          careInstructions:
            "Transplant seedlings at 4-leaf stage. Water daily.",
        },
        {
          stageName: "Leafing",
          category: "Growing",
          durationDays: 30,
          careInstructions:
            "Apply nitrogen fertilizer weekly. Watch for aphids and caterpillars.",
        },
        {
          stageName: "Harvesting",
          category: "Ready",
          durationDays: 60,
          careInstructions:
            "Pick outer leaves only. Plant continues producing for months.",
        },
        {
          stageName: "Harvested",
          category: "Harvested",
          durationDays: 3,
          careInstructions:
            "Bundle and sell fresh. Do not store more than 3 days.",
        },
      ],
    },
  ]);

  // ─── USERS ────────────────────────────────────────────────────────────────
  const admin = await User.create({
    name: "Coordinator Grace Muthoni",
    email: "admin@smartseason.com",
    password: "admin123",
    role: "admin",
  });

  const [jane, brian, samuel, fatuma] = await User.create([
    {
      name: "Jane Wanjiku",
      email: "jane@smartseason.com",
      password: "agent123",
      role: "agent",
    },
    {
      name: "Brian Otieno",
      email: "brian@smartseason.com",
      password: "agent123",
      role: "agent",
    },
    {
      name: "Samuel Kiprop",
      email: "samuel@smartseason.com",
      password: "agent123",
      role: "agent",
    },
    {
      name: "Fatuma Hassan",
      email: "fatuma@smartseason.com",
      password: "agent123",
      role: "agent",
    },
  ]);

  const today = new Date();
  const daysAgo = (n) => new Date(today.getTime() - n * 864e5);

  // ─── FIELDS ───────────────────────────────────────────────────────────────
  // Status breakdown targets:
  // Active:    8 fields
  // At Risk:   5 fields (2 silent agent, 3 overdue stage)
  // Completed: 3 fields

  await Field.create([
    // ── JANE'S FIELDS (Nakuru / Rift Valley) ──────────────────────────────

    {
      name: "Nakuru Maize Block A",
      cropType: maize._id,
      plantingDate: daysAgo(35),
      currentStage: "Vegetative",
      assignedAgent: jane._id,
      updates: [
        {
          stage: "Germination",
          note: "Good emergence. 92% germination rate.",
          updatedBy: jane._id,
          createdAt: daysAgo(35),
        },
        {
          stage: "Vegetative",
          note: "Applied top-dress CAN. Looking strong.",
          updatedBy: jane._id,
          createdAt: daysAgo(4),
        },
      ],
    },
    {
      name: "Nakuru Wheat Plot",
      cropType: wheat._id,
      plantingDate: daysAgo(95),
      currentStage: "Ripening",
      assignedAgent: jane._id,
      updates: [
        {
          stage: "Establishment",
          note: "Even germination achieved.",
          updatedBy: jane._id,
          createdAt: daysAgo(95),
        },
        {
          stage: "Tillering",
          note: "Applied CAN. Some rust detected, sprayed.",
          updatedBy: jane._id,
          createdAt: daysAgo(60),
        },
        {
          stage: "Heading",
          note: "Heads emerging well. Fungicide applied.",
          updatedBy: jane._id,
          createdAt: daysAgo(30),
        },
        {
          stage: "Ripening",
          note: "Turning golden. Harvest in ~2 weeks.",
          updatedBy: jane._id,
          createdAt: daysAgo(2),
        },
      ],
    },
    {
      // AT RISK — stage overdue. Sprouting only lasts 15 days, planted 25 days ago
      name: "Njoro Potato Farm",
      cropType: potatoes._id,
      plantingDate: daysAgo(25),
      currentStage: "Sprouting",
      assignedAgent: jane._id,
      updates: [
        {
          stage: "Sprouting",
          note: "Slow emergence, soil too compact. Loosened topsoil.",
          updatedBy: jane._id,
          createdAt: daysAgo(1),
        },
      ],
    },
    {
      // COMPLETED
      name: "Subukia Bean Plot",
      cropType: beans._id,
      plantingDate: daysAgo(85),
      currentStage: "Harvested",
      assignedAgent: jane._id,
      updates: [
        {
          stage: "Sowing",
          note: "Planted after first rains. Good moisture.",
          updatedBy: jane._id,
          createdAt: daysAgo(85),
        },
        {
          stage: "Vegetative",
          note: "Healthy stands. Weeded.",
          updatedBy: jane._id,
          createdAt: daysAgo(60),
        },
        {
          stage: "Pod Filling",
          note: "Pods filling well. No pest pressure.",
          updatedBy: jane._id,
          createdAt: daysAgo(35),
        },
        {
          stage: "Drying",
          note: "Pods rattling. Ready to pull.",
          updatedBy: jane._id,
          createdAt: daysAgo(15),
        },
        {
          stage: "Harvested",
          note: "Excellent yield — 8 bags per acre. Sold locally.",
          updatedBy: jane._id,
          createdAt: daysAgo(5),
        },
      ],
    },

    // ── BRIAN'S FIELDS (Mwea / Kirinyaga — rice country) ──────────────────

    {
      name: "Mwea Irrigation Scheme Block 3",
      cropType: rice._id,
      plantingDate: daysAgo(60),
      currentStage: "Tillering",
      assignedAgent: brian._id,
      updates: [
        {
          stage: "Transplanting",
          note: "Seedlings transplanted from nursery. Water level maintained.",
          updatedBy: brian._id,
          createdAt: daysAgo(60),
        },
        {
          stage: "Tillering",
          note: "Urea applied. Tillers forming well.",
          updatedBy: brian._id,
          createdAt: daysAgo(3),
        },
      ],
    },
    {
      // AT RISK — silent agent. Last update was 12 days ago
      name: "Mwea Irrigation Scheme Block 7",
      cropType: rice._id,
      plantingDate: daysAgo(45),
      currentStage: "Transplanting",
      assignedAgent: brian._id,
      updates: [
        {
          stage: "Transplanting",
          note: "Paddy flooded. Seedlings in.",
          updatedBy: brian._id,
          createdAt: daysAgo(12),
        },
      ],
    },
    {
      // COMPLETED
      name: "Kirinyaga Rice Paddy",
      cropType: rice._id,
      plantingDate: daysAgo(160),
      currentStage: "Harvested",
      assignedAgent: brian._id,
      updates: [
        {
          stage: "Transplanting",
          note: "Good establishment.",
          updatedBy: brian._id,
          createdAt: daysAgo(160),
        },
        {
          stage: "Tillering",
          note: "Strong tiller count.",
          updatedBy: brian._id,
          createdAt: daysAgo(120),
        },
        {
          stage: "Panicle Initiation",
          note: "Panicles emerging.",
          updatedBy: brian._id,
          createdAt: daysAgo(80),
        },
        {
          stage: "Ripening",
          note: "Field drained. Grain hardening.",
          updatedBy: brian._id,
          createdAt: daysAgo(40),
        },
        {
          stage: "Harvested",
          note: "Bumper harvest. 22 bags/acre. Record season.",
          updatedBy: brian._id,
          createdAt: daysAgo(8),
        },
      ],
    },
    {
      name: "Thika Tomato Greenhouse",
      cropType: tomatoes._id,
      plantingDate: daysAgo(45),
      currentStage: "Fruit Set",
      assignedAgent: brian._id,
      updates: [
        {
          stage: "Transplanting",
          note: "Staked and watered in.",
          updatedBy: brian._id,
          createdAt: daysAgo(45),
        },
        {
          stage: "Early Growth",
          note: "Suckers removed. Calcium spray applied.",
          updatedBy: brian._id,
          createdAt: daysAgo(25),
        },
        {
          stage: "Fruit Set",
          note: "Fruits sizing well. Whitefly pressure moderate.",
          updatedBy: brian._id,
          createdAt: daysAgo(3),
        },
      ],
    },

    // ── SAMUEL'S FIELDS (Rift Valley / ASAL) ──────────────────────────────

    {
      name: "Baringo Sorghum Plot",
      cropType: sorghum._id,
      plantingDate: daysAgo(50),
      currentStage: "Tillering",
      assignedAgent: samuel._id,
      updates: [
        {
          stage: "Planting",
          note: "Planted at onset of long rains. Good soil moisture.",
          updatedBy: samuel._id,
          createdAt: daysAgo(50),
        },
        {
          stage: "Tillering",
          note: "Healthy tiller count. No pest pressure yet.",
          updatedBy: samuel._id,
          createdAt: daysAgo(5),
        },
      ],
    },
    {
      // AT RISK — overdue. Sunflower vegetative stage is 35 days, planted 55 days ago
      name: "Nakuru Sunflower Block",
      cropType: sunflower._id,
      plantingDate: daysAgo(55),
      currentStage: "Vegetative",
      assignedAgent: samuel._id,
      updates: [
        {
          stage: "Emergence",
          note: "Good stand. Thinned to one per hole.",
          updatedBy: samuel._id,
          createdAt: daysAgo(55),
        },
        {
          stage: "Vegetative",
          note: "Growing slowly due to dry spell.",
          updatedBy: samuel._id,
          createdAt: daysAgo(2),
        },
      ],
    },
    {
      name: "Turkana Cassava Plot",
      cropType: cassava._id,
      plantingDate: daysAgo(200),
      currentStage: "Root Bulking",
      assignedAgent: samuel._id,
      updates: [
        {
          stage: "Establishment",
          note: "Cuttings planted. 85% strike rate.",
          updatedBy: samuel._id,
          createdAt: daysAgo(200),
        },
        {
          stage: "Canopy Growth",
          note: "Canopy closed. Mosaic virus not detected.",
          updatedBy: samuel._id,
          createdAt: daysAgo(100),
        },
        {
          stage: "Root Bulking",
          note: "Checked one plant — roots bulking well.",
          updatedBy: samuel._id,
          createdAt: daysAgo(6),
        },
      ],
    },
    {
      // AT RISK — silent agent. Last update 9 days ago
      name: "Eldoret Wheat Expansion",
      cropType: wheat._id,
      plantingDate: daysAgo(55),
      currentStage: "Tillering",
      assignedAgent: samuel._id,
      updates: [
        {
          stage: "Establishment",
          note: "Seeded. Germination looks even.",
          updatedBy: samuel._id,
          createdAt: daysAgo(55),
        },
        {
          stage: "Tillering",
          note: "Tillering started. CAN applied.",
          updatedBy: samuel._id,
          createdAt: daysAgo(9),
        },
      ],
    },

    // ── FATUMA'S FIELDS (Coast / Mombasa hinterland) ──────────────────────

    {
      name: "Kilifi Sweet Potato Ridges",
      cropType: sweetPotato._id,
      plantingDate: daysAgo(70),
      currentStage: "Root Development",
      assignedAgent: fatuma._id,
      updates: [
        {
          stage: "Vine Establishment",
          note: "Vines planted on ridges. Irrigation set up.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(70),
        },
        {
          stage: "Vine Spreading",
          note: "Vines spreading well. Minimal weeding needed.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(35),
        },
        {
          stage: "Root Development",
          note: "Lifted sample plant — roots forming nicely.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(4),
        },
      ],
    },
    {
      name: "Kwale Kale Nursery Block",
      cropType: kale._id,
      plantingDate: daysAgo(30),
      currentStage: "Leafing",
      assignedAgent: fatuma._id,
      updates: [
        {
          stage: "Transplanting",
          note: "Seedlings in at 4-leaf stage. Watered daily.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(30),
        },
        {
          stage: "Leafing",
          note: "Growing fast. Applied CAN. Some aphids treated.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(2),
        },
      ],
    },
    {
      // AT RISK — overdue. Coffee Berry Development is 150 days, started 220 days ago
      name: "Taita Hills Coffee Estate",
      cropType: coffee._id,
      plantingDate: daysAgo(280),
      currentStage: "Berry Development",
      assignedAgent: fatuma._id,
      updates: [
        {
          stage: "Pruning/Maintenance",
          note: "Pruned and composted.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(280),
        },
        {
          stage: "Flowering",
          note: "Good blossom set after short rains.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(220),
        },
        {
          stage: "Berry Development",
          note: "Berries developing. CBB trap counts rising.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(4),
        },
      ],
    },
    {
      // COMPLETED
      name: "Mombasa Kale Plot",
      cropType: kale._id,
      plantingDate: daysAgo(110),
      currentStage: "Harvested",
      assignedAgent: fatuma._id,
      updates: [
        {
          stage: "Transplanting",
          note: "Planted on raised beds.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(110),
        },
        {
          stage: "Leafing",
          note: "Harvesting outer leaves every 5 days.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(80),
        },
        {
          stage: "Harvesting",
          note: "Selling 3x weekly to Kongowea market.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(30),
        },
        {
          stage: "Harvested",
          note: "Plot exhausted after 80 days of picking. Good ROI.",
          updatedBy: fatuma._id,
          createdAt: daysAgo(2),
        },
      ],
    },
  ]);

  console.log("\n✅ Seeding Complete!");
  console.log("─────────────────────────────────────────");
  console.log("Admin:   admin@smartseason.com  / admin123");
  console.log(
    "Agent 1: jane@smartseason.com   / agent123  (Nakuru/Rift Valley)",
  );
  console.log("Agent 2: brian@smartseason.com  / agent123  (Mwea/Kirinyaga)");
  console.log("Agent 3: samuel@smartseason.com / agent123  (Rift Valley/ASAL)");
  console.log("Agent 4: fatuma@smartseason.com / agent123  (Coast/Mombasa)");
  console.log("─────────────────────────────────────────");
  console.log("Expected status breakdown:");
  console.log("  Active:    8 fields");
  console.log("  At Risk:   5 fields (2 silent agents, 3 overdue stages)");
  console.log("  Completed: 3 fields");
  console.log("─────────────────────────────────────────");
  process.exit();
}

seed().catch(console.error);
