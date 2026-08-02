import { redirect } from 'next/navigation';

export default function ReviewHistoryPage() {
  redirect('/account/reviews?tab=history');
}
