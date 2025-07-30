import Image from 'next/image';

export default function Logo({style}) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      style={style}
    />
  );
}
