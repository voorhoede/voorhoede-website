const MIN_INTERVAL = 35 // Time between letters should be at least 35ms
const MAX_INTERVAL = 70 // Time between letters should be no more than 70ms
const BASE_DURATION = 1000 // Transition duration to aim for is 1s

/**
 * Get the interval between letters for the self typing text component
 * 
 * @param {string} text 
 * 
 * @returns {number} interval between letters in milliseconds
 */
export default function(text) {
  const intervalByDuration = (BASE_DURATION / text.length)
  /* Get interval that is not higher than max or lower than min */
  return [MIN_INTERVAL, Math.round(intervalByDuration), MAX_INTERVAL].sort()[1]
}
