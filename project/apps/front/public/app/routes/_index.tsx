import { MainPage } from '../components/main-page';
import { MainLayout } from '../layouts/main-layout';

import { ActionFunctionArgs, redirect } from 'react-router';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // const recipe = await db.recipes.create(formData);
  // return redirect(`/recipes/${recipe.id}`);
}

export default function Index() {
  return (
    <MainLayout>
      <MainPage />
    </MainLayout>
  );
}
