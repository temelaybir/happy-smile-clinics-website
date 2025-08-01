const fs = require('fs').promises;
const path = require('path');

async function initializeReviews() {
  const dataDir = path.join(process.cwd(), 'data');
  const reviewsFile = path.join(dataDir, 'reviews.json');
  
  // Ensure data directory exists
  await fs.mkdir(dataDir, { recursive: true });
  
  // Check if reviews file already exists
  try {
    await fs.access(reviewsFile);
    console.log('Reviews file already exists. Skipping initialization.');
    return;
  } catch {
    // File doesn't exist, create it
  }
  
  // Default reviews data
  const reviews = [
    {
      id: "1",
      name: "Sarah Johnson",
      country: "United Kingdom",
      rating: 5,
      text: "Exceptional dental care! The team at Happy Smile Clinics transformed my smile with their All-on-4 treatment. Professional, caring, and the results exceeded my expectations.",
      verified: true,
      featured: true,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "2",
      name: "Michael Chen",
      country: "United States",
      rating: 5,
      text: "I traveled from the US for dental implants and it was worth every mile. The clinic is state-of-the-art, staff speaks perfect English, and I saved thousands compared to US prices.",
      verified: true,
      featured: true,
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "3",
      name: "Emma Thompson",
      country: "Australia",
      rating: 5,
      text: "My veneers look absolutely natural! The digital smile design process let me see the results before treatment. Couldn't be happier with my Hollywood smile!",
      verified: true,
      featured: false,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "4",
      name: "Ahmed Hassan",
      country: "UAE",
      rating: 5,
      text: "Professional service from start to finish. The clinic arranged everything including airport transfers and hotel. My new teeth feel and look amazing!",
      verified: true,
      featured: true,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "5",
      name: "Maria Garcia",
      country: "Spain",
      rating: 5,
      text: "Best decision I ever made! The team is incredibly skilled and caring. My dental implants feel like my natural teeth. Highly recommend!",
      verified: true,
      featured: false,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  // Write to file
  await fs.writeFile(reviewsFile, JSON.stringify(reviews, null, 2));
  
  console.log('Reviews initialized successfully!');
  console.log(`Created ${reviews.length} sample reviews`);
}

initializeReviews().catch(console.error);