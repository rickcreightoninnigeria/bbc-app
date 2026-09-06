import { ScrollView, Text, View } from 'react-native';

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
      <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
        {heading}
      </Text>
      <View className="mt-2 gap-2">{children}</View>
    </View>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <Text className="text-sm text-ink dark:text-ink-dark">{children}</Text>;
}

function Verse({ children }: { children: React.ReactNode }) {
  return (
    <Text className="text-sm italic text-ink-soft dark:text-ink-soft-dark">{children}</Text>
  );
}

function Bullet({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="flex-row">
      <Text className="mr-2 text-make dark:text-make-dark">–</Text>
      <Text className="flex-1 text-sm text-ink dark:text-ink-dark">
        <Text className="font-semibold">{label} </Text>
        {children}
      </Text>
    </View>
  );
}

export default function ResourcingVision() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-make dark:text-make-dark">
        Resourcing our Church Vision with Money
      </Text>

      <Section heading="We give because he gave first">
        <P>
          Before we talk about giving, we look at the gospel. Jesus "though he was rich, yet for
          our sake became poor, so that you through his poverty might become rich."
        </P>
        <Verse>— 2 Corinthians 8:9</Verse>
        <P>
          God has already been extravagantly generous with us — giving us himself. Our giving is
          simply a response: an echo of grace we've already received, not a payment we owe.
        </P>
      </Section>

      <Section heading="Giving is part of growing in Christ">
        <P>
          At BBC we want to Grow in Christ in every part of life — how we read the Bible, how we
          pray, how we love one another, and how we handle money. Giving isn't a separate,
          awkward topic; it's an ordinary part of discipleship, just like prayer or serving.
          "How's your giving going?" is as natural a discipleship question as "how's your Bible
          reading going?"
        </P>
      </Section>

      <Section heading="We're managers, not owners">
        <P>
          Everything belongs to God — not ninety percent of it, all of it (Colossians 1:16).
          We're not owners of what we have; we're managers of it, entrusted with resources to use
          well (Matthew 25:14-30). A good manager doesn't hoard what's been entrusted to them,
          and doesn't spend it carelessly either — they use it for what the owner actually cares
          about.
        </P>
      </Section>

      <Section heading="Money can't be our security">
        <P>
          It's easy to quietly look to money for the security or satisfaction only God can give.
          Jesus put it plainly:
        </P>
        <Verse>"You cannot serve both God and money." — Matthew 6:24</Verse>
        <P>
          Giving is one way we keep practicing that money is a tool, not a master — and that our
          security is in him, not our bank balance.
        </P>
      </Section>

      <Section heading="A few practical steps">
        <Bullet label="Plan it, don't leave it to chance.">
          Work out your income and expenses, and decide what you'll give as part of that plan —
          not whatever happens to be left over.
        </Bullet>
        <Bullet label="Pick a proportion, and let it grow.">
          There's no single percentage commanded in the New Testament; the consistent principle
          is generosity in proportion to what you have (1 Corinthians 16:2), given freely rather
          than reluctantly.
        </Bullet>
        <Bullet label="Make it regular.">
          A standing bank transfer, timed to when you're paid, is usually easier to keep than
          remembering each week.
        </Bullet>
        <Bullet label="BBC first, then wherever else God leads.">
          A church's own pastors and ministry are its members' first responsibility (1 Timothy
          5:17-18) — BBC is supported entirely by people in the church, not from outside. From
          there, plenty of other good causes are worth your generosity too.
        </Bullet>
        <Bullet label="Equal sacrifice, not equal amounts.">
          Giving isn't a flat fee everyone owes; it's a sacrifice everyone is invited to make in
          proportion to what they have (2 Corinthians 8:2-3).
        </Bullet>
      </Section>

      <Section heading="One last thought">
        <P>
          None of this is meant to produce guilt — quite the opposite. Giving, done rightly, is
          one of the more joyful parts of following Jesus: a small, regular reminder that
          everything is his, that he's given us everything, and that we get to take part in what
          he's doing through this church and beyond it.
        </P>
      </Section>
    </ScrollView>
  );
}
