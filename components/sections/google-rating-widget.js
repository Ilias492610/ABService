import Image from 'next/image';

const GoogleRatingWidget = () => {
  return (
    <div className="inline-flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
      <Image
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d15aabd3-7400-4814-b987-c0ca0874e387-verwarmingbros-be/assets/images/images_17.png"
        alt="Google"
        width={40}
        height={40}
        unoptimized
      />
      <div>
        <p className="text-sm font-bold text-[#1a2c3d]">Verwarming Bros</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1a2c3d]">5.0</span>
          <div className="flex text-[#f59e0b]">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="text-base leading-none">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleRatingWidget;
