import type { Metadata } from "next";
import { CLASS_INFO } from "@/lib/students";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How sevenexcellent203.zone.id handles visitor and student data.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <p className="eyebrow">Privacy</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        Privacy policy.
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed text-muted">
        <section>
          <h2 className="text-lg font-semibold text-foreground">What we publish</h2>
          <p className="mt-3">
            This website publishes the names and absent numbers of Class 7E
            students of {CLASS_INFO.school}, and the name of the homeroom
            teacher. It does not publish addresses, contact details, birth
            dates, grades, or photographs - photographs are added only when
            authorized assets are supplied.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Consent and removal
          </h2>
          <p className="mt-3">
            Student names appear with the knowledge of the class. Any student,
            parent, or guardian may request removal or correction of a name by
            contacting the class through the school. Requests are honored as
            promptly as possible.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Tracking</h2>
          <p className="mt-3">
            This website does not use analytics, advertising, cookies, or
            third-party tracking. No visitor data is collected by the site
            itself.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Hosting</h2>
          <p className="mt-3">
            The site is served over HTTPS. Standard, short-lived server logs
            may exist at the hosting layer; they are not used to identify
            visitors.
          </p>
        </section>
      </div>
    </div>
  );
}
