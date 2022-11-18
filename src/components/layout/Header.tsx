import {
  ActionIcon,
  Avatar,
  Button,
  Header, Image,
  Menu,
  useMantineColorScheme,
} from '@mantine/core';
import { IconLogin, IconLogout, IconMoonStars, IconSun } from '@tabler/icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import logo from '../../assets/logo.gif'

function ColorThemeSwitcher({ className }: { className?: string }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant='outline'
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
      className={className}
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
}

export default function AppHeader() {
  const { data: session } = useSession();
  return (
    <Header height={60} className='z-50 flex items-center' p='md'>
      <Link href='/'>
            <Image
                src={logo.src}
                alt='Bracket Ladder Logo'
            />
      </Link>
      <ColorThemeSwitcher className='ml-auto' />
      {session === null && (
        <Button
          className='ml-2'
          onClick={() => signIn()}
          rightIcon={<IconLogin size={18} />}
        >
          Log in
        </Button>
      )}
      {session !== null && (
        <>
          <Link href="/profile">
            <Avatar src={session.user?.image} className='ml-2' />
          </Link>
          <Button
            color='red'
            className='ml-2'
            rightIcon={<IconLogout size={18} />}
            onClick={() => signOut()}
          >
            Log out
          </Button>
        </>
      )}
    </Header>
  );
}
