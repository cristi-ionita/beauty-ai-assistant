type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

function cleanupExpiredEntries() {
  const now = Date.now();

  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  cleanupExpiredEntries();

  const now = Date.now();

  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    };

    store.set(key, newEntry);

    return {
      success: true,
      remaining: limit - 1,
      resetAt: newEntry.resetAt,
    };
  }

  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;

  store.set(key, existing);

  return {
    success: true,
    remaining: Math.max(limit - existing.count, 0),
    resetAt: existing.resetAt,
  };
}