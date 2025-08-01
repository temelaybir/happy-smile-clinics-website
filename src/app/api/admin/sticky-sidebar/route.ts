import { NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'sticky-sidebar.json')

async function ensureDataDir() {
  const dir = path.dirname(dataPath)
  try {
    await mkdir(dir, { recursive: true })
  } catch (error) {
    // Directory already exists
  }
}

export async function GET() {
  try {
    await ensureDataDir()
    
    try {
      const data = await readFile(dataPath, 'utf-8')
      const settings = JSON.parse(data)
      
      return NextResponse.json({
        success: true,
        items: settings.items || settings,
        model: settings.model || 'gradient'
      })
    } catch (error) {
      // Return default items if file doesn't exist
      return NextResponse.json({
        success: true,
        model: 'gradient',
        items: [
          {
            id: 'events',
            label: 'Events',
            icon: 'calendar',
            action: 'link',
            value: '/events',
            enabled: true
          },
          {
            id: 'contact',
            label: 'Contact Us',
            icon: 'message',
            action: 'modal',
            value: 'contact',
            enabled: true
          },
          {
            id: 'whatsapp',
            label: 'WhatsApp',
            icon: 'phone',
            action: 'external',
            value: 'https://wa.me/905551234567',
            enabled: true
          },
          {
            id: 'instagram',
            label: 'Instagram',
            icon: 'instagram',
            action: 'external',
            value: 'https://instagram.com/happysmileclinicstr',
            enabled: true
          }
        ]
      })
    }
  } catch (error) {
    console.error('Error loading sticky sidebar:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load sticky sidebar' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    await ensureDataDir()
    const settings = {
      items: body.items,
      model: body.model || 'gradient'
    }
    await writeFile(dataPath, JSON.stringify(settings, null, 2))
    
    return NextResponse.json({
      success: true,
      items: settings.items,
      model: settings.model
    })
  } catch (error) {
    console.error('Error saving sticky sidebar:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save sticky sidebar' },
      { status: 500 }
    )
  }
}