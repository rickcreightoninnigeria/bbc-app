import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function MealTrain() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meal Train & Practical Needs' }} />
      <PlaceholderScreen
        title="Meal Train & Practical Needs"
        note="Draft placeholder. A board for surfacing practical needs within the church (meals, help moving, etc.) and letting people sign up to meet them."
      />
    </>
  );
}
