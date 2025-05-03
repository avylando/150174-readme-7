import { MainPage } from '../components/main-page';
import { MainLayout } from '../layouts/main-layout';

import { ActionFunctionArgs, redirect } from 'react-router';
import { publicApiService } from '../services/api.service';
import { ExternalRoute } from '../constants/routes';

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    const response = await publicApiService.loginUser({ email, password });
  } catch (error) {
    console.error('Error logging in:', error);
  }
  return redirect(ExternalRoute.BLOG);
}

export default function Index() {
  return (
    <MainLayout>
      <MainPage />
    </MainLayout>
  );
}
