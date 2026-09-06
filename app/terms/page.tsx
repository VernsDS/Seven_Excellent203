import type { Metadata } from "next";
import { CLASS_INFO } from "@/lib/students";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for sevenexcellent203.zone.id.",
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <p className="eyebrow">Terms</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        Terms of use.
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed text-muted">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Purpose</h2>
          <p className="mt-3">
            This website is the official home of Class 7E / Seven Excellent,{" "}
            {CLASS_INFO.school}. It exists to present class identity, the
            student directory, class memories, and the weekly schedule.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Content</h2>
          <p className="mt-3">
            Content is maintained by the class for informational purposes.
            Class photographs and student work belong to their creators and
            must not be reproduced without permission.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Acceptable use</h2>
          <p className="mt-3">
            Do not attempt to disrupt the website, scrape it for bulk reuse of
            student data, or misrepresent affiliation with the class or school.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Changes</h2>
          <p className="mt-3">
            These terms may be updated as the website evolves. Continued use
            of the site after changes means you accept the current version.
          </p>
        </section>
      </div>
    </div>
  );
}
