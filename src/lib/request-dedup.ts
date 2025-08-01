// Request deduplication to prevent multiple simultaneous requests
const pendingRequests = new Map<string, Promise<any>>()

export async function deduplicatedRequest<T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> {
  // Check if there's already a pending request
  const pending = pendingRequests.get(key)
  if (pending) {
    console.log(`♻️ Reusing pending request for: ${key}`)
    return pending
  }

  // Create new request
  const promise = fn().finally(() => {
    // Clean up after request completes
    pendingRequests.delete(key)
  })

  pendingRequests.set(key, promise)
  return promise
}