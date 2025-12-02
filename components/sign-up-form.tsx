import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const rePasswordInputRef = React.useRef<TextInput>(null);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const router = useRouter();

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onPasswordSubmitEditing() {
    rePasswordInputRef.current?.focus();
  }

  function onSubmit() {
    setModalVisible(true);
  }

  function handleAccept() {
    setModalVisible(false);
    router.push('/(onboarding)');
  }

  return (
    <>
      <View className="absolute top-[-4] w-full">
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
            <CardDescription className="text-center sm:text-left">
              Welcome! Please fill in the details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="gap-6">
              <View className="gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="gmail@example.com"
                  keyboardType="email-address"
                  autoComplete="email"
                  autoCapitalize="none"
                  onSubmitEditing={onEmailSubmitEditing}
                  returnKeyType="next"
                  submitBehavior="submit"
                />
              </View>
              <View className="gap-1.5">
                <View className="flex-row items-center">
                  <Label htmlFor="password">Password</Label>
                </View>
                <Input
                  ref={passwordInputRef}
                  id="password"
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={onPasswordSubmitEditing}
                />
              </View>
              <View className="gap-1.5">
                <View className="flex-row items-center">
                  <Label htmlFor="re-password">Re-enter Password</Label>
                </View>
                <Input
                  ref={rePasswordInputRef}
                  id="re-password"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={onSubmit}
                />
              </View>

              <Button className="w-full bg-green-500" onPress={onSubmit}>
                <Text> Sign Up</Text>
              </Button>
            </View>
            <Text className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/(auth)/login" className="text-sm underline underline-offset-4">
                Sign in
              </Link>
            </Text>
            <View className="flex-row items-center"></View>
          </CardContent>
        </Card>
      </View>
      <Dialog open={isModalVisible} onOpenChange={setModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              Please read and accept the terms and conditions before creating an account.
              {'\n\n'}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
              fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onPress={() => setModalVisible(false)}>
              <Text>Decline</Text>
            </Button>
            <Button onPress={handleAccept}>
              <Text>Accept</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

