const CtaBanner = () => {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary-foreground/70 mb-3">
          LET OUR EXPERTS HELP YOU CHOOSE THE RIGHT PLAN FOR YOUR GARDEN.
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground uppercase tracking-tight mb-8">
          NOT SURE WHERE TO BEGIN?
        </h2>
        <a
          href="https://wa.me/919270993102?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20plan%20for%20my%20garden."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-accent-foreground font-display font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Talk to Our Care Team
        </a>
      </div>
    </section>
  );
};

export default CtaBanner;
