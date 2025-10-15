import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Robert & Susan M.",
      location: "Phoenix, AZ",
      rating: 5,
      text: "The team at Nationwide Equities made the entire process so simple and stress-free. We were able to eliminate our mortgage payment and have extra cash for travel. Highly recommend!",
    },
    {
      name: "Margaret L.",
      location: "Tampa, FL",
      rating: 5,
      text: "I was nervous about a reverse mortgage at first, but my specialist took the time to explain everything clearly. Now I have peace of mind knowing I can stay in my home and have the funds I need.",
    },
    {
      name: "James & Patricia K.",
      location: "San Diego, CA",
      rating: 5,
      text: "Professional, knowledgeable, and genuinely caring. Nationwide Equities helped us access our home equity to cover medical expenses. We couldn't be more grateful for their guidance.",
    },
  ];

  return (
    <section className="py-20 bg-secondary" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from homeowners we've helped
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 hover-elevate transition-all"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-card-foreground mb-6 italic">"{testimonial.text}"</p>
              <div className="border-t border-card-border pt-4">
                <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
