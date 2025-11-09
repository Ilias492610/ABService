import Image from 'next/image';

const FloatingWhatsAppButton = () => {
  const phoneNumber = '32495799899';
  const message = encodeURIComponent('Hallo, ik heb een vraag.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-5 left-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-110 md:bottom-6 md:left-6 md:h-[60px] md:w-[60px]"
    >
      <Image
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/svgs/whatsapp-logo-5.svg"
        alt="WhatsApp icoon"
        width={32}
        height={32}
        unoptimized
        className="h-8 w-8"
      />
    </a>
  );
};

export default FloatingWhatsAppButton;
