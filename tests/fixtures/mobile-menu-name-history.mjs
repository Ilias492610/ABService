// Admit only Task132's exact removal of the contradictory action label.
export function beforeMobileMenuNameSource(source) {
  return source.replace('<summary>Menu</summary>', '<summary aria-label="Menu openen">Menu</summary>');
}
