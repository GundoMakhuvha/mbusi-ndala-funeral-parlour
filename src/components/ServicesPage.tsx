import { Check, Clock, AlertCircle, Heart, ArrowRight } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";

interface ServicesPageProps {
  onSelectPackage: (packageName: string) => void;
}

export function ServicesPage({ onSelectPackage }: ServicesPageProps) {
  const packages = [
    {
      name: "Forever in Our Hearts Package",
      coverage: "Member + 9 Dependents (up to age 75)",
      services: [
        "3 Tier coffin",
        "Hearse + 2 family cars",
        "Burial service",
        "Death registration",
        "Tent, 40 chairs, 2 tables, 1 mobile toilet",
        "Grave booking (grave fee excluded)",
        "R1000 cash payout",
      ],
      premiums: [
        { ageRange: "18–65", amount: "R288" },
        { ageRange: "65–70", amount: "R384" },
        { ageRange: "71–75", amount: "R464" },
      ],
      counselling: "Free 2 × one-hour counselling sessions for bereaved family members",
    },
    {
      name: "Senior Citizens Package",
      coverage: "Senior citizen + spouse",
      services: [
        "Casket",
        "Hearse + 2 family cars",
        "Burial service",
        "Death registration",
        "Tent, 40 chairs, 2 tables, 1 mobile toilet",
        "Grave booking (grave fee excluded)",
        "R1000 cash payout",
      ],
      premiums: [
        { ageRange: "65–70", amount: "R319" },
        { ageRange: "71–75", amount: "R497" },
      ],
      counselling: "Free 2 × one-hour counselling sessions for bereaved family members",
    },
    {
      name: "Family Package",
      coverage: "Member + 5 Dependents (up to age 75)",
      services: [
        "Casket",
        "Hearse + 2 family cars",
        "Burial service",
        "Death registration",
        "Tent, 40 chairs, 2 tables, 1 mobile toilet",
        "Grave booking (grave fee excluded)",
        "R1000 cash payout",
      ],
      premiums: [
        { ageRange: "18–65", amount: "R260" },
        { ageRange: "65–70", amount: "R343" },
        { ageRange: "71–75", amount: "R416" },
      ],
      counselling: "Free 2 × one-hour counselling sessions for bereaved family members",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Funeral Cover"
        title="Our Funeral Packages"
        subtitle="Comprehensive packages designed to give you peace of mind and financial security for you and your loved ones."
      />

      {/* Packages Grid */}
      <section className="pt-4 pb-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.name} delay={index * 120} className="h-full">
                <article className="h-full flex flex-col rounded-[2rem] bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 hover:border-black/40 dark:hover:border-white/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                  {/* Card header */}
                  <div className="px-7 pt-8 pb-7 bg-gray-50 dark:bg-white/[0.04] border-b border-gray-100 dark:border-white/10 text-center">
                    <h2 className="text-black dark:text-white text-2xl md:text-[1.7rem] font-serif font-medium leading-tight mb-4">
                      {pkg.name}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-white/50 mb-1">Coverage</p>
                    <p className="text-gray-700 dark:text-white/80">{pkg.coverage}</p>
                    <p className="mt-5 text-black dark:text-white">
                      <span className="text-sm text-gray-500 dark:text-white/50">from </span>
                      <span className="text-4xl font-serif font-medium">{pkg.premiums[0].amount}</span>
                      <span className="text-sm text-gray-500 dark:text-white/50"> /month</span>
                    </p>
                  </div>

                  <div className="px-7 py-7 flex-1 flex flex-col">
                    {/* Services Included */}
                    <h3 className="text-black dark:text-white mb-4 font-medium">Included Services</h3>
                    <ul className="space-y-2.5 mb-8">
                      {pkg.services.map((service) => (
                        <li key={service} className="flex items-start gap-3 text-gray-600 dark:text-white/70">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="text-sm">{service}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Premium Table */}
                    <h3 className="text-black dark:text-white mb-3 font-medium">Monthly Premium</h3>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 mb-6">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 text-[11px] uppercase tracking-wider">
                          <tr>
                            <th scope="col" className="text-left py-3 px-4 text-gray-500 dark:text-white/60 font-medium">Age Range</th>
                            <th scope="col" className="text-right py-3 px-4 text-gray-500 dark:text-white/60 font-medium">Premium</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {pkg.premiums.map((premium) => (
                            <tr key={premium.ageRange} className="border-t border-gray-100 dark:border-white/10">
                              <td className="py-3 px-4 text-gray-600 dark:text-white/70">{premium.ageRange}</td>
                              <td className="py-3 px-4 text-right text-black dark:text-white font-semibold">{premium.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Counselling Benefit */}
                    <div className="rounded-2xl bg-gray-50 dark:bg-white/5 p-4 mb-8 flex gap-3">
                      <Heart className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-black dark:text-white font-medium text-sm mb-1">Extra Benefit</p>
                        <p className="text-gray-600 dark:text-white/65 text-sm">{pkg.counselling}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg.name)}
                      className="group mt-auto w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-85 transition-all font-medium"
                    >
                      Select Package
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-white/[0.03] transition-colors duration-300">
        <Reveal className="container mx-auto max-w-3xl">
          <div className="rounded-[2rem] bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-400/15 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </span>
              <h2 className="text-black dark:text-white text-3xl font-serif font-medium">Terms &amp; Conditions</h2>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gray-400 dark:text-white/50 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-black dark:text-white mb-3 font-medium">Waiting Periods</h3>
                <ul className="space-y-2 text-gray-600 dark:text-white/70 text-sm">
                  <li>
                    <span className="text-black dark:text-white font-semibold">6-month waiting period</span> for natural death
                  </li>
                  <li>
                    <span className="text-black dark:text-white font-semibold">No waiting period</span> for accidental death
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-10 pt-6 border-t border-gray-100 dark:border-white/10 text-gray-500 dark:text-white/60 text-center text-sm">
              Premiums are subject to annual review. Coverage is subject to full policy terms.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
