import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
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

export default function PrivacyPolicy() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Privacy Policy' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Privacy Policy</Text>
      <Text className="mt-2 text-xs text-ink-faint dark:text-ink-faint-dark">
        Draft — not yet reviewed or approved by BBC leadership. Written to accurately describe
        what this app actually does today; update it whenever that changes.
      </Text>
      <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">
        Last updated: 7 September 2026
      </Text>

      <Section heading="Who this covers">
        <P>
          This policy covers the Berean Bible Church (BBC) app. BBC is based at 8 Wamba Road,
          Jos. This app has no accounts or login — there is no way for us to identify who you
          are unless you choose to tell us, by typing a name into one of the app's forms.
        </P>
      </Section>

      <Section heading="What we collect, and who can see it">
        <P>
          <Text className="font-semibold">Prayer requests. </Text>
          If you post to the Prayer Request Wall, your request text and the name you choose to
          give (or "Anonymous") are visible to anyone using the app. This is public by design —
          the screen says so before you post.
        </P>
        <P>
          <Text className="font-semibold">Spiritual Gifts Survey. </Text>
          If you complete the survey, your name and your results are sent to BBC's leadership so
          they can follow up. Other members cannot see this — it isn't shown anywhere in the
          app, and only a project administrator can access it directly.
        </P>
        <P>
          <Text className="font-semibold">My Giving Plan. </Text>
          Anything you enter here — amount, frequency, designation — stays on your phone only.
          It is never sent to us or anyone else, and it's deleted if you uninstall the app.
        </P>
        <P>
          <Text className="font-semibold">Notifications. </Text>
          Giving-plan reminders are scheduled entirely on your device. No data leaves your phone
          for this feature.
        </P>
      </Section>

      <Section heading="What we don't do">
        <P>
          We don't show ads, use analytics or tracking tools, or share any information with
          advertisers. We don't sell data — we don't have a way to, and wouldn't if we could.
        </P>
      </Section>

      <Section heading="Links to other services">
        <P>
          Some screens link out to YouTube, Spotify, Google Maps, and the Google Play Store.
          Once you leave the app for one of these, their own privacy policy applies — we have no
          control over what they do with your information.
        </P>
      </Section>

      <Section heading="Children">
        <P>
          This app is for the whole church family, including parents of children in BBC's Kids
          Ministry. It doesn't knowingly collect information from children directly, and no
          child-specific data (like check-in records) is collected through the app itself.
        </P>
      </Section>

      <Section heading="Removing something you posted">
        <P>
          There's currently no self-service way to edit or delete a prayer request from within
          the app. To ask us to remove something you posted, contact [privacy contact].
        </P>
      </Section>

      <Section heading="Changes to this policy">
        <P>
          If what the app collects or does changes, we'll update this page. Continuing to use
          the app after a change means you accept the update.
        </P>
      </Section>

      <Section heading="Contact">
        <P>Questions about this policy: [privacy contact].</P>
      </Section>
    </ScrollView>
  );
}
