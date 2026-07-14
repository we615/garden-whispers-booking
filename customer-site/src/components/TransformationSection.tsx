import beforeBalcony from "@/assets/before-balcony.jpg";
import afterBalcony from "@/assets/after-balcony.jpg";
import beforeSociety from "@/assets/before-society.jpg";
import afterSociety from "@/assets/after-society.jpg";
import afterOffice from "@/assets/office-plants.jpg";
import beforeOffice from "@/assets/rubber-plant-office.jpg";

const transformations = [
  { title: "Balcony Transformation", before: beforeBalcony, after: afterBalcony },
  { title: "Society Garden Revival", before: beforeSociety, after: afterSociety },
  { title: "Office Green Makeover", before: beforeOffice, after: afterOffice },
];

const TransformationSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Before & After
          </h2>
          <p className="text-muted-foreground text-base">
            See the transformations we've delivered across Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((t) => (
            <div
              key={t.title}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={t.before} alt={`${t.title} - Before`} className="w-full h-48 object-cover" />
                  <span className="absolute bottom-2 left-2 bg-foreground/70 text-background text-xs font-semibold px-2 py-0.5 rounded">Before</span>
                </div>
                <div className="relative">
                  <img src={t.after} alt={`${t.title} - After`} className="w-full h-48 object-cover" />
                  <span className="absolute bottom-2 right-2 bg-primary/80 text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded">After</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-foreground">{t.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
