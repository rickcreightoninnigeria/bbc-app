import { Text, View } from 'react-native';

export function FeatureList({ features, accentClass }: { features: string[]; accentClass: string }) {
  return (
    <View className="mt-3">
      {features.map((feature) => (
        <View key={feature} className="mb-2 flex-row">
          <Text className={`mr-2 ${accentClass}`}>–</Text>
          <Text className="flex-1 text-sm text-ink-soft dark:text-ink-soft-dark">{feature}</Text>
        </View>
      ))}
    </View>
  );
}
