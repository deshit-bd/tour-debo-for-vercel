import { redirect } from 'next/navigation';

export default function EarnRedirectPage() {
  redirect('/account/points?from=earn');
}
