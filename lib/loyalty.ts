const PUNCH_KEY = 'lp-punches';
const REWARD_KEY = 'lp-reward';
export const PUNCHES_FOR_REWARD = 5;

export function getPunches(): number {
  try {
    return Math.min(PUNCHES_FOR_REWARD - 1, parseInt(localStorage.getItem(PUNCH_KEY) || '0', 10) || 0);
  } catch {
    return 0;
  }
}

/** Adds one punch. Returns true when this punch unlocks the reward. */
export function addPunch(): boolean {
  try {
    const next = (parseInt(localStorage.getItem(PUNCH_KEY) || '0', 10) || 0) + 1;
    if (next >= PUNCHES_FOR_REWARD) {
      localStorage.setItem(PUNCH_KEY, '0');
      localStorage.setItem(REWARD_KEY, '1');
      return true;
    }
    localStorage.setItem(PUNCH_KEY, String(next));
    return false;
  } catch {
    return false;
  }
}

export function hasReward(): boolean {
  try {
    return localStorage.getItem(REWARD_KEY) === '1';
  } catch {
    return false;
  }
}

export function clearReward() {
  try {
    localStorage.removeItem(REWARD_KEY);
  } catch {
    /* ignore */
  }
}

/** Rough kitchen wait in minutes based on the time of day. */
export function waitEstimate(d = new Date()): number {
  const h = d.getHours();
  if (h >= 12 && h < 14) return 25; // lunch rush
  if (h >= 18 && h < 21) return 30; // dinner rush
  if (h >= 21 || h < 8) return 10;
  return 15;
}
