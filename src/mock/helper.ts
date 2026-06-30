export const minutesAgo = (minutes: number): Date => {
   const date = new Date();
   date.setMinutes(date.getMinutes() - minutes);
   return date;
};

export const hoursAgo = (h: number): Date => minutesAgo(h * 60);

export const daysAgo = (days: number): Date => {
   const date = new Date();
   date.setDate(date.getDate() - days);
   return date;
};

export function dayKey(date: Date): string {
   const d = new Date(date);
   const today = new Date();
   const yesterday = new Date();
   yesterday.setDate(today.getDate() - 1);

   const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

   if (isSameDay(d, today)) return "Today";
   if (isSameDay(d, yesterday)) return "Yesterday";
   return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: d.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
   });
}
