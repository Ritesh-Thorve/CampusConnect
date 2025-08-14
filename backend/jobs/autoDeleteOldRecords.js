import cron from 'node-cron';
import prisma from '../config/db.js';

// Runs daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Delete old updates
    const deletedUpdates = await prisma.update.deleteMany({
      where: { createdAt: { lt: thirtyDaysAgo } }
    });

    console.log(`Auto-deleted ${deletedUpdates.count} updates older than 30 days`);

    // Delete old trends
    const deletedTrends = await prisma.trend.deleteMany({
      where: { createdAt: { lt: thirtyDaysAgo } }
    });

    console.log(`Auto-deleted ${deletedTrends.count} trends older than 30 days`);

  } catch (err) {
    console.error('Error auto-deleting old records:', err);
  }
});
