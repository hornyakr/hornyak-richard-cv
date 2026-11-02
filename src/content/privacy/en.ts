import type { PrivacyCopy } from "@/content/privacy/types";

export const privacyEn: PrivacyCopy = {
  locale: "en",
  path: "/en/privacy",
  metaTitle: "Privacy notice – Richárd Hornyák",
  metaDescription:
    "What data this site processes, for what purpose and on what legal basis, who receives it, and what your rights are.",
  eyebrow: "Privacy",
  title: "Privacy notice",
  updated: "Effective: 2 November 2026",
  intro:
    "Under Article 13 of the EU General Data Protection Regulation (GDPR), this notice explains what personal data I process when you use this website or contact me by email. The site uses no cookies.",
  sections: [
    {
      id: "controller",
      title: "The controller",
      paragraphs: [
        "Richárd Hornyák, a private individual. For data protection matters, too, I can be reached at hornyak.richard94@gmail.com. I have not appointed a data protection officer, as I am not required to.",
      ],
    },
    {
      id: "hosting",
      title: "1. Serving the site",
      paragraphs: [
        "The site is served by Vercel Inc. (United States). When you open a page, your browser sends Vercel's servers your IP address, browser and operating system details (user agent), the requested address, the referring page and the time. The site cannot be displayed without them.",
        "Purpose: serving the site and handling errors and abuse. Legal basis: Article 6(1)(f) GDPR; my legitimate interest in a secure and reliable site. Retention: in Vercel's server logs, for the short period set by Vercel. I do not combine this data with other data or use it to identify anyone.",
      ],
    },
    {
      id: "analytics",
      title: "2. Visitor statistics (only with consent)",
      paragraphs: [
        "If you consent, Vercel Web Analytics compiles aggregate statistics about visits. For each page view it records the address viewed, the referring page, the browser, the operating system, the device type and the country derived from the IP address. Vercel tells visitors apart with an identifier derived from the request that is discarded after 24 hours; it does not store the IP address and uses no cookies.",
        "Legal basis: your consent (Article 6(1)(a) GDPR; section 155(4) of Hungarian Act C of 2003 on Electronic Communications). Without consent, the analytics script is not loaded. You can withdraw consent at any time with the “Analytics settings” button at the bottom of the page; withdrawal does not affect the lawfulness of earlier measurement. Retention: the aggregate statistics are kept for the retention period of my Vercel account.",
      ],
    },
    {
      id: "device",
      title: "3. Settings stored on your device",
      paragraphs: [
        "The site uses no cookies. At most two settings may be created in your browser's local storage (localStorage), and neither is sent to me or to any third party:",
      ],
      items: [
        "theme: your chosen light or dark theme; created only when you switch with the theme toggle.",
        "analytics-consent: your decision on visitor statistics (accepted or declined), so you are not asked again on every visit.",
      ],
    },
    {
      id: "contact",
      title: "4. Contact by email",
      paragraphs: [
        "If you email me, I process the data in your message (name, email address, content). Purpose: replying to your enquiry and, if it leads to a job or engagement, preparing it. Legal basis: Article 6(1)(b) GDPR where it concerns steps prior to a contract, otherwise Article 6(1)(f) (my legitimate interest in answering enquiries).",
        "Retention: up to one year after the enquiry is closed; if a contract is concluded, for the retention period that applies to it. Emails are stored in the Gmail service of Google LLC (United States).",
      ],
    },
    {
      id: "recipients",
      title: "5. Recipients and transfers",
      paragraphs: [
        "I do not sell your data or use it for advertising. Recipients: Vercel Inc. (hosting and visitor statistics, as processor) and Google LLC (email). Both are based in the United States; transfers rely on the European Commission's adequacy decision on the EU–US Data Privacy Framework or on the Commission's standard contractual clauses. Their own notices describe their processing: vercel.com/legal/privacy-policy and policies.google.com/privacy.",
        "Downloading the CV and following external links (such as GitHub or project sites) does not start any data collection on this site. On an external site, its operator processes the data.",
      ],
    },
    {
      id: "rights",
      title: "6. Your rights",
      paragraphs: [
        "You may ask for information about the data I hold about you, and ask me to rectify or erase it or restrict its processing. You may ask to receive your data in a machine-readable format, and object to processing based on legitimate interest. You may withdraw your consent at any time. I reply within one month at the latest.",
        "Providing data is not mandatory, but I cannot reply without an email address. There is no automated decision-making or profiling.",
      ],
    },
    {
      id: "remedies",
      title: "7. Complaints and remedies",
      paragraphs: [
        "If you believe I have infringed your data protection rights, please write to me first. You may lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH; 1055 Budapest, Falk Miksa utca 9–11; postal address: 1363 Budapest, Pf. 9.; ugyfelszolgalat@naih.hu; naih.hu) or with the supervisory authority of your EU country of residence, and you may go to court.",
      ],
    },
  ],
  backToCv: "Back to the CV",
  footerLink: "Privacy notice",
  consent: {
    title: "Visitor statistics",
    body: "This site uses no cookies. With your consent, Vercel Web Analytics records anonymous statistics: which page is viewed, where visitors come from, which browser and device they use, and from which country. You can change your choice at any time with “Analytics settings” at the bottom of the page.",
    privacyLink: "Details in the privacy notice",
    accept: "Accept",
    decline: "Decline",
    settings: "Analytics settings",
  },
};
