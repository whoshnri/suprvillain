import prisma from "@/lib/prisma";

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.campaign.deleteMany({});

  const campaigns = [
    {
      title: "VIVA LA VIDA",
      description: "A celebration of life and style. High-energy streetwear for the bold.",
      image: "https://images.unsplash.com/photo-1555009393-334bd2aad32c?q=80&w=2000&auto=format&fit=crop",
      status: "active",
    },
    {
      title: "MIDNIGHT OPS",
      description: "Tactical gear for the urban operative. Stealth meets functionality.",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2000&auto=format&fit=crop",
      status: "active",
    },
    {
      title: "WINTER HEIST",
      description: "Cold-weather essentials for the ultimate getaway.",
      image: "https://images.unsplash.com/photo-1517177646040-d8f204836977?q=80&w=2000&auto=format&fit=crop",
      status: "active",
    },
  ];

  for (const campData of campaigns) {
    const campaign = await prisma.campaign.create({
      data: campData,
    });

    const products = [
      // Shirts
      { name: `${campaign.title} Tee Alpha`, category: "Shirts", price: 45.00, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" },
      { name: `${campaign.title} Tee Beta`, category: "Shirts", price: 48.00, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop" },
      { name: `${campaign.title} Longsleeve`, category: "Shirts", price: 65.00, image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=800&auto=format&fit=crop" },
      { name: `${campaign.title} Oversized Tee`, category: "Shirts", price: 55.00, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop" },
      // Hats
      { name: `${campaign.title} Beanie`, category: "Hats", price: 35.00, image: "https://images.unsplash.com/photo-1576828450750-f1e94406286f?q=80&w=800&auto=format&fit=crop" },
      { name: `${campaign.title} Snapback`, category: "Hats", price: 42.00, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop" },
      { name: `${campaign.title} Bucket Hat`, category: "Hats", price: 38.00, image: "https://images.unsplash.com/photo-1589831377283-33cb1cc6bd5d?q=80&w=800&auto=format&fit=crop" },
    ];

    for (const prodData of products) {
      await prisma.product.create({
        data: {
          ...prodData,
          description: `Limited edition ${prodData.name} from the ${campaign.title} collection. Engineered for comfort and style.`,
          stock: 50,
          sizes: ["S", "M", "L", "XL"],
          campaignId: campaign.id,
        },
      });
    }
  }

  console.log("Seed data created successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });