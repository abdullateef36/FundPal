import { Stack } from 'expo-router';

const MenuLayout = () => {
  return (
   <>
   <Stack>
        <Stack.Screen name="LinkedProfile" options={{ headerShown: false }} />
        <Stack.Screen name="StartAFund" options={{ headerShown: false }} />
        <Stack.Screen name="GenerateFundLink" options={{ headerShown: false }} />
        <Stack.Screen name="About" options={{ headerShown: false }} />
        <Stack.Screen name="HelpCenter" options={{ headerShown: false }} />
        <Stack.Screen name="FundLaunched" options={{ headerShown: false }} />
        <Stack.Screen name="SendInvite" options={{ headerShown: false }} />
        <Stack.Screen name="MyFund" options={{ headerShown: false }} />
        <Stack.Screen name="Payment" options={{ headerShown: false }} />
        <Stack.Screen name="Supported" options={{ headerShown: false }} />
   </Stack>
   </>
  )
}

export default MenuLayout