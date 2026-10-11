// Task53 adds only this class to the existing section, not a new wrapper,
// reader-visible copy, link, source row, or blanket answer-box/CTA policy.
import { beforeFaultHeroHtml } from "./fault-hero-clearance.mjs";
export const readingMarker = '<section class="section fault-guide-reading">';
// Task55 separately tests its only new hero class; preserve fixed older captures.
export const beforeFaultReadingHtml = html => beforeFaultHeroHtml(html).replace(readingMarker, '<section class="section">');
export const acceptedReadingHtmlHashes = [
  ["vaillant", "36c8c452813840464e79d7411ffe3439506675ba786c7c1dab7f23e788679767"],
  ["bulex", "514fc6d48b46234c12364b824cf03cc48a777cc23566905299317c1af36674c5"],
  ["bosch", "f3da4563cd78d9c56d1183fb267039362268e47e27f7a4b70b24e039b94f092f"],
  ["junkers", "9b8b0533faaba4d09c380d3af724b59d0a096504dc5ed244e7d656e8b13f3ecd"],
  ["remeha", "5edeb0d2e10f487422ebae4c8f2011c46e501d9a2f1539d80ab75774ccf9ebe4"],
  ["buderus", "21d210131de43e6f38c2b5513a7f502eac13be48e3121661bcbcb8fec9b3f455"],
  ["viessmann", "d0f72b7f0fdb636b9143ae90cdd036d336d68f0dc75197e42523723cb92a9159"],
  ["acv", "c2514bca37ebe6373388ab0ae3121f7bbd3a3cb5b69bb393af84ed26266ae625"],
  ["intergas", "788e17bdbc002195ebfe93e7ca53677f7aeea7e9579be07a184a957ca119e570"],
  ["nefit-bosch", "aac6148eb6d5e6b07fefbf1cbe6b7ce500c20c53153bf2a2667d5dd4aec70a81"],
  ["atag", "403a73a6913c9336ae5f89bb7b61dd0250a1333864dee27ceedb0b63d5ee39a4"],
  ["itho-daalderop", "9b7ddcb1b2351610c5c20706f34ba902ea9ac50de24944a2237dce38d4817f31"],
  ["ferroli", "3759917404777284794a4c490ab2a480e2ac27261cc971416a7d8d206b64db8e"],
];
