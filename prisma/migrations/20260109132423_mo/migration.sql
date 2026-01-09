-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_campaign_id_fkey";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
