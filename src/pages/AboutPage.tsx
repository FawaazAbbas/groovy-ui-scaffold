export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
          About <span className="font-monoton text-primary font-normal ml-3" style={{ fontSize: 'inherit', display: 'inline' }}>Groovy</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          We are on a mission to democratize artificial intelligence and building the definitive AI workspace for modern teams.
        </p>
      </div>

      <div className="prose prose-invert max-w-none prose-p:text-text-secondary prose-headings:text-text-primary">
        <div className="glass-card glass-shimmer p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2026, Groovy Labs was born from a simple observation: while AI models were getting incredibly smart, the tools to actually use them in a team setting were disjointed, complicated, and hard to govern.
          </p>
          <p>
            We built the Groovy Platform to solve this. By bringing together intelligent agents, robust guardrails, and seamless integrations into entirely fluid workspace, we empower teams to operate at 10x speed with complete confidence and safety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card glass-shimmer p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-3">Enterprise Grade</h3>
            <p className="text-text-secondary">
              Security and compliance are built into our DNA. From explicit guardrails to role-based access control, Groovy is designed for the modern enterprise.
            </p>
          </div>
          <div className="glass-card glass-shimmer p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-3">Design Driven</h3>
            <p className="text-text-secondary">
              We believe enterprise software shouldn't look like enterprise software. The "Liquid Glass" design system ensures joy in every interaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
