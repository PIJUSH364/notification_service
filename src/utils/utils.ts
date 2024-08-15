//----------------
// active user immediately process other wise its take 30 min
//--------------

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  priority: number;
};

export const delayCalculation = (user: User): number => {
  const ONE_MINUTE_MS = 60 * 1000; // 1 minute in milliseconds
  const HALF_HOUR_MS = 30 * ONE_MINUTE_MS; // 30 minutes in milliseconds
  const ONE_HOUR_MS = 60 * ONE_MINUTE_MS; // 1 hour in milliseconds

  switch (user.priority) {
    case 1:
      return user.active ? 0 : HALF_HOUR_MS;
    case 2:
      return ONE_HOUR_MS; // 1 hour
    case 3:
      return 2 * ONE_HOUR_MS; // 2 hours
    default:
      return 0;
  }
};
