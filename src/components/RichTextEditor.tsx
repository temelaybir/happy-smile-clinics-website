'use client'

import { useRef, useState, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Link2, 
  List, 
  ListOrdered,
  Quote,
  Heading2,
  Code,
  Undo,
  Redo,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [textColor, setTextColor] = useState('#000000')
  
  console.log('RichTextEditor rendered with value:', value?.substring(0, 50) + '...')

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      console.log('RichTextEditor: Updating content from prop:', value?.substring(0, 50) + '...')
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  useEffect(() => {
    setIsEditorReady(true)
  }, [])

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const formatBlock = (tag: string) => {
    document.execCommand('formatBlock', false, tag)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl)
      setShowLinkDialog(false)
      setLinkUrl('')
    }
  }

  const applyColor = (color: string) => {
    execCommand('foreColor', color)
    setTextColor(color)
    setShowColorPicker(false)
  }

  const changeFontSize = (size: string) => {
    document.execCommand('fontSize', false, size)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const tools = [
    { icon: Bold, command: 'bold', tooltip: 'Bold' },
    { icon: Italic, command: 'italic', tooltip: 'Italic' },
    { icon: Underline, command: 'underline', tooltip: 'Underline' },
    { divider: true },
    { icon: Type, command: () => changeFontSize('1'), tooltip: 'Small Text' },
    { icon: Type, command: () => changeFontSize('3'), tooltip: 'Normal Text' },
    { icon: Type, command: () => changeFontSize('5'), tooltip: 'Large Text' },
    { divider: true },
    { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Center' },
    { icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
    { divider: true },
    { icon: Heading2, command: () => formatBlock('h3'), tooltip: 'Heading' },
    { icon: Quote, command: () => formatBlock('blockquote'), tooltip: 'Quote' },
    { icon: Code, command: () => formatBlock('pre'), tooltip: 'Code' },
    { divider: true },
    { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
    { divider: true },
    { icon: Palette, command: () => setShowColorPicker(true), tooltip: 'Text Color' },
    { icon: Link2, command: () => setShowLinkDialog(true), tooltip: 'Insert Link' },
    { divider: true },
    { icon: Undo, command: 'undo', tooltip: 'Undo' },
    { icon: Redo, command: 'redo', tooltip: 'Redo' }
  ]

  const colorPresets = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#808080', // Gray
    '#FFA500', // Orange
    '#800080', // Purple
    '#FFC0CB', // Pink
  ]

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2 flex items-center gap-1 flex-wrap">
        {tools.map((tool, index) => {
          if (tool.divider) {
            return <div key={index} className="w-px h-6 bg-gray-300 mx-1" />
          }

          const Icon = tool.icon
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                if (typeof tool.command === 'function') {
                  tool.command()
                } else {
                  execCommand(tool.command)
                }
              }}
              className="p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
              title={tool.tooltip}
            >
              <Icon className="w-4 h-4" />
            </button>
          )
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none bg-gray-800 text-gray-100"
        onInput={(e) => {
          const newContent = e.currentTarget.innerHTML
          console.log('RichTextEditor: Content changed:', newContent.substring(0, 50) + '...')
          onChange(newContent)
        }}
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
        data-placeholder={placeholder || 'Start typing...'}
        style={{ 
          minHeight: '200px',
          color: '#e5e7eb',
          caretColor: '#60a5fa'
        }}
        suppressContentEditableWarning={true}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowLinkDialog(false)
                  setLinkUrl('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Color Picker Dialog */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Choose Text Color</h3>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  onClick={() => applyColor(color)}
                  className="w-10 h-10 rounded border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="text-sm font-medium">Custom:</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="#000000"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowColorPicker(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => applyColor(textColor)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}