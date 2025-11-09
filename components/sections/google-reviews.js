'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Maria',
    date: '1 dag geleden',
    text: 'Helemaal top! Heel snel afspraak kunnen maken ondanks de drukke planning. Vriendelijke technieker, professioneel, op tijd! Een aanrader!',
    rating: 5,
    avatar:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/icons/google_avatar-5.png',
  },
  {
    name: 'Frank Bastiaens',
    date: '2 dagen geleden',
    text: 'Prima en stipte uitvoering. Zeker aan te bevelen.',
    rating: 5,
    avatar:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/images_18.png',
  },
  {
    name: 'Yvonne Claessens',
    date: '9 dagen geleden',
    text: 'Vlotte communicatie en een perfecte uitvoering. Heel tevreden!',
    rating: 5,
    avatar:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/images_19.png',
  },
];

const ReviewCard = ({ review }) => (
  <div className="relative flex h-full w-[340px] flex-shrink-0 snap-start flex-col rounded-xl bg-white p-8 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
    <Image
      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/images_17.png"
      alt="Google logo"
      width={24}
      height={24}
      unoptimized
      className="absolute right-6 top-6"
    />
    <div className="mb-4 flex">
      {Array.from({ length: review.rating }).map((_, index) => (
        <Star key={index} className="h-5 w-5 fill-current text-[#f59e0b]" />
      ))}
    </div>
    <p className="mb-6 flex-grow text-[15px] leading-relaxed text-[#5a6c7d]">
      “ {review.text}
    </p>
    <div className="mt-auto flex items-center gap-3 pt-4">
      <Image
        src={review.avatar}
        alt={review.name}
        width={40}
        height={40}
        unoptimized
        className="h-10 w-10 rounded-full"
      />
      <div>
        <p className="font-semibold text-[#1a2c3d]">{review.name}</p>
        <p className="text-xs text-[#9aa5b1]">{review.date}</p>
      </div>
    </div>
  </div>
);

const GoogleReviews = () => {
  const scrollRef = useRef(null);
  const extendedReviews = [...reviews, ...reviews];

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector('[data-card]');
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className="overflow-hidden bg-[#e8f4f8] py-20">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2f7a6f]">
              Google reviews
            </p>
            <h2 className="mt-3 text-[42px] font-bold leading-tight text-[#1a2c3d]">
              Ontdek wat onze klanten zeggen
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-[#5a6c7d]">
              Benieuwd naar de ervaringen van onze klanten? Ontdek hun verhalen en beoordelingen en zie waarom ze voor ons kiezen!
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#2f7a6f] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#27685f]"
            >
              Bekijk alle reviews
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mb-12 inline-flex max-w-sm items-center gap-4 rounded-xl bg-white p-6 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/images_17.png"
            alt="Google"
            width={40}
            height={40}
            unoptimized
          />
          <div>
            <p className="font-bold text-[#1a2c3d]">Verwarming Bros</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#1a2c3d]">5.0</span>
              <div className="flex text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll naar links"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-slate-100 lg:-left-6"
        >
          <ChevronLeft className="h-6 w-6 text-[#1a2c3d]" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll naar rechts"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-slate-100 lg:-right-6"
        >
          <ChevronRight className="h-6 w-6 text-[#1a2c3d]" />
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-6 py-4"
        >
          {extendedReviews.map((review, index) => (
            <div key={`${review.name}-${index}`} data-card="true">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
