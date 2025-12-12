// prisma/seed.ts
import prisma from "@/lib/prisma";

async function main() {
  await prisma.$executeRaw`
    INSERT INTO products (id, name, description, price, image, category, stock, created_at, updated_at)
    VALUES
      ('prod_1', 'Minimalist Watch', 'Clean design timepiece with leather strap. Perfect for everyday wear with a timeless aesthetic.', 299.00, '/placeholder.svg?height=400&width=400', 'Accessories', 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('prod_2', 'Ceramic Vase', 'Handcrafted ceramic vase with smooth finish. Adds elegance to any space.', 89.00, '/placeholder.svg?height=400&width=400', 'Home', 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('prod_3', 'Linen Shirt', 'Premium linen shirt in natural color. Breathable and comfortable for all seasons.', 129.00, '/placeholder.svg?height=400&width=400', 'Clothing', 22, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('prod_4', 'Leather Wallet', 'Full-grain leather bifold wallet. Ages beautifully with minimal design.', 79.00, '/placeholder.svg?height=400&width=400', 'Accessories', 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('prod_5', 'Glass Carafe', 'Hand-blown glass carafe with cork stopper. Perfect for water or wine.', 65.00, '/placeholder.svg?height=400&width=400', 'Home', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('prod_6', 'Cotton Tote', 'Durable organic cotton tote bag. Simple and functional everyday carry.', 45.00, '/placeholder.svg?height=400&width=400', 'Accessories', 40, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('prod_7', 'Wool Blanket', 'Merino wool throw blanket. Soft, warm, and beautifully minimalist.', 189.00, '/placeholder.svg?height=400&width=400', 'Home', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('prod_8', 'Canvas Sneakers', 'Classic canvas low-top sneakers. Clean silhouette in versatile colors.', 95.00, '/placeholder.svg?height=400&width=400', 'Clothing', 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO NOTHING;
  `;
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });