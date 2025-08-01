const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixReviewImages() {
  try {
    // Map of names to existing image files
    const imageMap = {
      'Sarah Johnson': '/images/reviews/sarah.webp',
      'Michael Chen': '/images/reviews/matthew.webp', // Use matthew as placeholder
      'Emma Williams': '/images/reviews/justyna.webp', // Use justyna as placeholder
      'Ahmed': '/images/reviews/ahmed.webp',
      'Justyna': '/images/reviews/justyna.webp',
      'Matthew': '/images/reviews/matthew.webp',
      'Olena': '/images/reviews/olena.webp',
      'Sarah': '/images/reviews/sarah.webp',
      'Shannah': '/images/reviews/shannah.webp'
    };

    // Update all reviews with null images
    const reviews = await prisma.review.findMany({
      where: { image: null }
    });

    console.log(`Found ${reviews.length} reviews with null images`);

    for (const review of reviews) {
      let imagePath = imageMap[review.name];
      
      // If no exact match, try to find a suitable placeholder
      if (!imagePath) {
        // Use a default based on the first letter of the name
        const firstLetter = review.name.charAt(0).toLowerCase();
        if (firstLetter <= 'j') {
          imagePath = '/images/reviews/ahmed.webp';
        } else if (firstLetter <= 'o') {
          imagePath = '/images/reviews/matthew.webp';
        } else {
          imagePath = '/images/reviews/sarah.webp';
        }
      }

      await prisma.review.update({
        where: { id: review.id },
        data: { image: imagePath }
      });

      console.log(`Updated ${review.name} with image: ${imagePath}`);
    }

    console.log('✅ All review images updated successfully');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error updating review images:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

fixReviewImages();