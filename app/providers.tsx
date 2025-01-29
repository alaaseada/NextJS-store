'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  )
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default Providers
