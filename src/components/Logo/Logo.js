import Image from 'next/image';

export default function Logo({style}) {
  return (
    <div style={style}>
      <Image
        src="/logo.svg"
        alt="Logo"
        fill
        sizes="160px"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
