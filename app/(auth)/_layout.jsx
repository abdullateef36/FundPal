import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
   <>
   <Stack>
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="ProfileCreated" options={{ headerShown: false }} />
        <Stack.Screen name="Signin" options={{ headerShown: false }} />
        <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmationEmail" options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeMsg" options={{ headerShown: false }} />
        <Stack.Screen name="UserInfo" options={{ headerShown: false }} />
   </Stack>
   </>
  )
}

export default AuthLayout