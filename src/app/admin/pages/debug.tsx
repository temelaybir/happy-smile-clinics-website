'use client'

import { useEffect, useState } from 'react'

export default function DebugPages() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/pages')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data)
        setData(data)
      })
      .catch(err => {
        console.error('Error:', err)
        setError(err.message)
      })
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Pages API</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      {data && (
        <div>
          <h2 className="text-xl font-semibold mb-2">API Response:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
          
          <h2 className="text-xl font-semibold mt-6 mb-2">Pages Count: {data.pages?.length || 0}</h2>
          
          {data.pages?.map((page: any) => (
            <div key={page.id} className="bg-white p-4 rounded shadow mb-4">
              <h3 className="font-bold">{page.title}</h3>
              <p className="text-gray-600">{page.slug}</p>
              <p className="text-sm text-gray-500">Sections: {page.sections?.length || 0}</p>
              
              {page.sections?.map((section: any) => (
                <div key={section.id} className="ml-4 mt-2 p-2 bg-gray-50 rounded">
                  <p className="font-medium">{section.type}: {section.title || 'No title'}</p>
                  <p className="text-sm text-gray-600">Content length: {section.content?.length || 0} chars</p>
                  {section.image && <p className="text-sm text-blue-600">Has image: {section.image}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}