import { Shield, Home, Award, MapPin } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "A+ BBB Rated",
      description: "Trusted by Better Business Bureau",
    },
    {
      icon: Shield,
      title: "NMLS #1408",
      description: "Licensed and Regulated",
    },
    {
      icon: Home,
      title: "Equal Housing Lender",
      description: "Fair and Accessible",
    },
    {
      icon: MapPin,
      title: "Licensed Nationwide",
      description: "Serving All 50 States",
    },
  ];

  return (
    <section className="py-12 bg-secondary border-y border-border" data-testid="section-trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Built on a tradition of excellence and trusted by homeowners across America.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-xl hover-elevate transition-all"
              data-testid={`badge-${index}`}
            >
              <badge.icon className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
