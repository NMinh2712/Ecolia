/**
 * Generates a random 6-digit soul code
 * Used to provide a unique identifier after AI experience
 */
export function generateSoulCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Formats soul code with styling
 */
export function formatSoulCode(code: string): string {
  // Format as XXX-XXX for better readability
  return `${code.substring(0, 3)}-${code.substring(3)}`
}
