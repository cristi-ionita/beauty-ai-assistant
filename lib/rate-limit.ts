type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt < now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      success: true,
      remaining: limit - 1,
    };
  }

  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    success: true,
    remaining: limit - current.count,
  };
}