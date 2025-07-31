import Image from 'next/image';

export default function Logo({style}) {
  // Error: Image with src "/logo.svg" is missing required "width" property.
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      style={style}
      width={160}
      height={47.16}
    />
  );
}
