
const dienstenLinks = [
  { text: 'Onderhoud gasketel', href: '/onderhoud' },
  { text: 'Herstelling gasketel', href: '/herstelling' },
  { text: 'Installatie gasketel', href: '/installaties/gasketels' },
  { text: 'Keuring gasketel', href: '/keuring' },
];

const algemeenLinks = [
  { text: 'Over ons', href: '/over-ons' },
  { text: 'FAQ', href: '/faq' },
  { text: 'Contact', href: '/contact' },
  { text: 'Privacy voorwaarden', href: '/privacy-policy' },
  { text: 'Algemene voorwaarden', href: '/algemene-voorwaarden' },
];

const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
    <ul className="space-y-1.5 text-sm text-white/80">
      {links.map((link) => (
        <li key={link.text || link}>
          <a href={link.href || '#'} className="transition-opacity hover:opacity-100">
            {link.text || link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-donkerblauw text-white">
      <div className="mx-auto max-w-[1200px] px-8 pb-6 pt-[60px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-semibold">AB Service</h3>
            <p className="mb-6 text-sm text-white/90">
              Wij garanderen snelle en efficiënte oplossingen en bieden tevens installaties van nieuwe gasketels aan. Uw comfort is onze hoogste prioriteit.
            </p>
            <h4 className="mb-4 text-base font-semibold">Volg ons</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/32484906966"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white transition-colors hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white transition-colors hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
            </div>
          </div>

          <FooterLinkColumn title="Diensten" links={dienstenLinks} />
          <FooterLinkColumn title="Algemeen" links={algemeenLinks} />
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-white/70 md:flex md:items-center md:justify-between">
          <p className="text-[13px]">© AB Service. Alle rechten voorbehouden</p>
          <div className="text-[13px]">
            Website door{' '}
            <a
              href="https://wa.me/32468068136"
              className="text-white underline underline-offset-2 hover:text-white/90"
            >
              Ilias
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
