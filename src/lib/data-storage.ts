import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const RESULTS_FILE = path.join(DATA_DIR, 'results.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

export async function loadResults() {
  await ensureDataDir()
  
  try {
    const data = await fs.readFile(RESULTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Return default data if file doesn't exist
    return {
      results: [
        {
          id: '1',
          name: 'JOANNA, POLAND',
          afterImage: '/images/results/result1.jpg',
          treatments: [
            'Smile Design',
            'All on Four / All on X Implants System',
            'x28 Zirconia Porcelain Crowns',
            'x12 Dental Implants',
            'Color: BL3'
          ],
          featured: true,
          order: 0,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'MICHAEL, USA',
          afterImage: '/images/results/result2.jpg',
          treatments: [
            'Hollywood Smile Design',
            'x20 E-max Porcelain Veneers',
            'Teeth Whitening',
            'Gum Contouring',
            'Color: BL1'
          ],
          featured: true,
          order: 1,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'SARAH, UK',
          afterImage: '/images/results/result3.jpg',
          treatments: [
            'Full Mouth Rehabilitation',
            'x24 Zirconia Crowns',
            'x6 Dental Implants',
            'Bone Grafting',
            'Color: A2'
          ],
          featured: false,
          order: 2,
          createdAt: new Date().toISOString()
        }
      ]
    }
  }
}

export async function saveResults(data: any) {
  await ensureDataDir()
  await fs.writeFile(RESULTS_FILE, JSON.stringify(data, null, 2))
  return data
}