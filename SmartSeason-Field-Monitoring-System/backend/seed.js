const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Field = require("./models/Field");
const Crop = require("./models/Crop");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Seeding logic with Mapping Strategy...");

  await User.deleteMany({});
  await Field.deleteMany({});
  await Crop.deleteMany({});

  // --- Crops with Categories ---
  // Note: 'stageName' can be unique (like 'Tasseling'),
  // but 'category' must be one of our 4 core buckets.
  const [maize, wheat, rice, beans, coffee, potatoes, tomatoes] =
    await Crop.create([
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
            careInstructions: "Check for seedling emergence.",
          },
          {
            stageName: "Vegetative",
            category: "Growing",
            durationDays: 40,
            careInstructions: "Apply top-dress fertilizer.",
          },
          {
            stageName: "Flowering",
            category: "Growing",
            durationDays: 20,
            careInstructions: "Ensure consistent watering.",
          },
          {
            stageName: "Ready",
            category: "Ready",
            durationDays: 14,
            careInstructions: "Cobs are firm.",
          },
          {
            stageName: "Harvested",
            category: "Harvested",
            durationDays: 7,
            careInstructions: "Dry properly.",
          },
        ],
      },
      {
        name: "Wheat",
        description: "Cool-season cereal.",
        growthStages: [
          {
            stageName: "Planted",
            category: "Planted",
            durationDays: 10,
            careInstructions: "Standard sowing.",
          },
          {
            stageName: "Growing",
            category: "Growing",
            durationDays: 90,
            careInstructions: "Monitor for rust.",
          },
          {
            stageName: "Ready",
            category: "Ready",
            durationDays: 14,
            careInstructions: "Golden brown color.",
          },
          {
            stageName: "Harvested",
            category: "Harvested",
            durationDays: 5,
            careInstructions: "Store dry.",
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
            careInstructions: "Maintain 5cm water level.",
          },
          {
            stageName: "Tillering",
            category: "Growing",
            durationDays: 45,
            careInstructions: "Apply Urea fertilizer.",
          },
          {
            stageName: "Panicle Initiation",
            category: "Growing",
            durationDays: 30,
            careInstructions: "Keep fields flooded.",
          },
          {
            stageName: "Ripening",
            category: "Ready",
            durationDays: 30,
            careInstructions: "Drain field 2 weeks before harvest.",
          },
          {
            stageName: "Harvested",
            category: "Harvested",
            durationDays: 7,
            careInstructions: "Dry to 14% moisture.",
          },
        ],
      },
      {
        name: "Beans",
        description: "Common bean, a vital protein source for smallholders.",
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
            careInstructions: "Check for soil moisture.",
          },
          {
            stageName: "Vegetative",
            category: "Growing",
            durationDays: 35,
            careInstructions: "Weed at 3 weeks.",
          },
          {
            stageName: "Pod Filling",
            category: "Growing",
            durationDays: 20,
            careInstructions: "Monitor for aphids.",
          },
          {
            stageName: "Drying",
            category: "Ready",
            durationDays: 10,
            careInstructions: "Harvest when pods rattle.",
          },
          {
            stageName: "Harvested",
            category: "Harvested",
            durationDays: 5,
            careInstructions: "Store in cool, dry place.",
          },
        ],
      },
      {
        name: "Coffee (Arabica)",
        description: "High-value perennial cash crop.",
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
            careInstructions: "Clear old branches.",
          },
          {
            stageName: "Flowering",
            category: "Growing",
            durationDays: 60,
            careInstructions: "Monitor for Coffee Berry Borer.",
          },
          {
            stageName: "Berry Development",
            category: "Growing",
            durationDays: 150,
            careInstructions: "Apply organic mulch.",
          },
          {
            stageName: "Ripening",
            category: "Ready",
            durationDays: 30,
            careInstructions: "Pick only cherry-red berries.",
          },
          {
            stageName: "Harvested",
            category: "Harvested",
            durationDays: 10,
            careInstructions: "Pulping and fermentation.",
          },
        ],
      },
      {
        name: "Potatoes",
        description: "High-energy tuber crop for cool climates.",
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
            careInstructions: "Ensure eyes are facing up.",
          },
          {
            stageName: "Tuber Initiation",
            category: "Growing",
            durationDays: 30,
            careInstructions: "Earth up the soil around stems.",
          },
          {
            stageName: "Tuber Bulking",
            category: "Growing",
            durationDays: 45,
            careInstructions: "Maintain consistent moisture.",
          },
          {
            stageName: "Maturation",
            category: "Ready",
            durationDays: 20,
            careInstructions: "Wait for foliage to turn yellow.",
          },
          {
            stageName: "Harvested",
            category: "Harvested",
            durationDays: 10,
            careInstructions: "Cure in the dark for 2 weeks.",
          },
        ],
      },
      {
        name: "Tomatoes",
        description:
          "Popular vegetable crop for both greenhouse and open field.",
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
            careInstructions: "Staking should begin now.",
          },
          {
            stageName: "Early Growth",
            category: "Growing",
            durationDays: 20,
            careInstructions: "Remove suckers.",
          },
          {
            stageName: "Fruit Set",
            category: "Growing",
            durationDays: 20,
            careInstructions: "Apply high-potassium feed.",
          },
          {
            stageName: "Red Ripening",
            category: "Ready",
            durationDays: 10,
            careInstructions: "Pick when fully colored.",
          },
          {
            stageName: "Harvested",
            category: "Harvested",
            durationDays: 3,
            careInstructions: "Handle gently to avoid bruising.",
          },
        ],
      },
    ]);

  // --- Users ---
  const admin = await User.create({
    name: "Admin Coordinator",
    email: "admin@smartseason.com",
    password: "admin123",
    role: "admin",
  });

  const agent1 = await User.create({
    name: "Jane Wanjiku",
    email: "jane@smartseason.com",
    password: "agent123",
    role: "agent",
  });

  const agent2 = await User.create({
    name: "Brian Otieno",
    email: "brian@smartseason.com",
    password: "agent123",
    role: "agent",
  });

  const today = new Date();
  const daysAgo = (n) => new Date(today.getTime() - n * 864e5);

  // --- Fields ---
  await Field.create([
    {
      name: "Healthy Maize Plot",
      cropType: maize._id,
      plantingDate: daysAgo(20),
      currentStage: "Growing", // Mapped to 'Growing'. Planted 20 days ago, Vegetative starts after Day 7.
      assignedAgent: agent1._id,
      updates: [
        {
          stage: "Growing",
          note: "Looking green and healthy.",
          updatedBy: agent1._id,
          createdAt: daysAgo(2),
        },
      ],
    },
    {
      name: "Nakuru Coffee Estate",
      cropType: coffee._id, // Coffee has long durations
      plantingDate: daysAgo(40),
      currentStage: "Flowering", // Mapped to 'Growing'.
      assignedAgent: agent1._id,
      updates: [
        {
          stage: "Pruning/Maintenance",
          note: "Maintenance done.",
          updatedBy: agent1._id,
          createdAt: daysAgo(35),
        },
      ],
    },
    {
      name: "AT RISK: Silent Agent (Rice)",
      cropType: rice._id,
      plantingDate: daysAgo(15),
      currentStage: "Transplanting",
      assignedAgent: agent2._id,
      updates: [
        // Update was 10 days ago. Since 10 > 7, this triggers "At Risk"
        {
          stage: "Transplanting",
          note: "Paddy flooded.",
          updatedBy: agent2._id,
          createdAt: daysAgo(10),
        },
      ],
    },
    {
      name: "AT RISK: Overdue Potatoes",
      cropType: potatoes._id,
      plantingDate: daysAgo(25), // Planted 25 days ago
      currentStage: "Sprouting", // Sprouting only lasts 15 days. This is overdue!
      assignedAgent: agent1._id,
      updates: [
        {
          stage: "Sprouting",
          note: "Slow emergence.",
          updatedBy: agent1._id,
          createdAt: daysAgo(1),
        },
      ],
    },
    {
      name: "Mwea Rice Paddy",
      cropType: rice._id,
      plantingDate: daysAgo(150),
      currentStage: "Harvested", // Category: Harvested -> Status: Completed
      assignedAgent: agent2._id,
      updates: [
        {
          stage: "Harvested",
          note: "Bumper harvest achieved.",
          updatedBy: agent2._id,
          createdAt: daysAgo(5),
        },
      ],
    },
    {
      name: "Thika Tomato Greenhouse",
      cropType: tomatoes._id,
      plantingDate: daysAgo(45),
      currentStage: "Fruit Set", // 14 (Transplanting) + 20 (Early Growth) = 34 days. Day 45 is mid-Fruit Set.
      assignedAgent: agent2._id,
      updates: [
        {
          stage: "Fruit Set",
          note: "Fruits are sizing up well.",
          updatedBy: agent2._id,
          createdAt: daysAgo(3),
        },
      ],
    },
  ]);

  console.log("\nSeeding Complete!");
  console.log(
    'Test "At Risk" logic on the dashboard with the "Silent" and "Overdue" plots.',
  );
  process.exit();
}

seed().catch(console.error);
