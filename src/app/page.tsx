import Link from 'next/link';

export default function Home() {
  return <>
    <h1>Welcome home!</h1>
    <Link href={'/dashboard'}>Dashboard </Link>
    <Link href={'/chatscreen'}>Chat Screen </Link> 
    <Link href={'/doctorscreen'}>Doctor Screen </Link>
    <Link href={'/profile'}>Profile </Link> 
  </>;
}
