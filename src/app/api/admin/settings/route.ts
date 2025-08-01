import { NextRequest, NextResponse } from 'next/server'
import { loadSettings, saveSettings } from '@/lib/file-storage'

// GET site settings
export async function GET() {
  try {
    const settings = await loadSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// PUT update settings
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Save to file
    await saveSettings(data)
    
    console.log('Settings updated successfully')
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}