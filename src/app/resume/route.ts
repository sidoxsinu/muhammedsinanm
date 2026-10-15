import { redirect } from 'next/navigation';

export async function GET() {
  redirect('/assets/documents/resume/muhammed-sinan-resume.pdf');
}
