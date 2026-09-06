import { ScrollView, Text, View } from 'react-native';

import { GivingPlanSection } from '../components/GivingPlanSection';
import { TextLink } from '../components/TextLink';

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-1.5">
      <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">{label}</Text>
      <Text className="text-sm font-semibold text-ink dark:text-ink-dark">{value}</Text>
    </View>
  );
}

export default function Give() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-make dark:text-make-dark">
        Give Joyfully & Sacrificially
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Giving at BBC happens by bank transfer, or in person on a Sunday. Here's what you need
        for either, and a few thoughts on why we give at all.
      </Text>

      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Bank transfer details
        </Text>
        <View className="mt-2">
          <DetailRow label="Bank" value="Zenith Bank" />
          <DetailRow label="Account Name" value="Berean Church Planting Network" />
          <DetailRow label="Account Number" value="1311716705" />
          <DetailRow label="Currency" value="Naira (₦)" />
        </View>
        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">
          Tip: add your name as the transfer note so it's easy to reconcile.
        </Text>
      </View>

      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Why we give
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Giving is one way we say thank you to God for all he's given us — it's not a
          transaction, and it's not a tax.
        </Text>
        <Text className="mt-2 text-sm italic text-ink-soft dark:text-ink-soft-dark">
          "Each of you should give what you have decided in your heart to give, not reluctantly
          or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          However much or little, give freely and joyfully — that's the whole point.
        </Text>
        <TextLink href="/resourcing-vision" className="mt-3">
          Read more: Resourcing our Church Vision with Money
        </TextLink>
      </View>

      <GivingPlanSection />
    </ScrollView>
  );
}
