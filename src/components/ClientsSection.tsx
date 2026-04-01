import spurx from "@/assets/clients/spurx.png";
import redsky from "@/assets/clients/redsky.png";
import lifesaving from "@/assets/clients/lifesaving.png";
import enversys from "@/assets/clients/enversys.jpg";
import planetEnviro from "@/assets/clients/planet-enviro.jpg";
import kalpataru from "@/assets/clients/kalpataru.png";

const clients = [
  { name: "Spurx", logo: spurx },
  { name: "RedSky Hospitality", logo: redsky },
  { name: "Life Saving India", logo: lifesaving },
  { name: "Enversys Greentek Solutions", logo: enversys },
  { name: "Planet Enviro Services", logo: planetEnviro },
  { name: "Kalpataru Regency I", logo: kalpataru },
];

const ClientsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-red mb-2">Trusted By</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.12em]">
            Our Clients
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {clients.map((client) => (
            <div key={client.name} className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-semibold text-muted-foreground text-center max-w-[120px]">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
