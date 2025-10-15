import { CheckCircle } from "lucide-react";
import seniorCoupleImage from "@assets/stock_images/happy_smiling_senior_40594347.jpg";

export default function About() {
  const benefits = [
    "Over two decades of reverse mortgage expertise",
    "Licensed specialists in all 50 states",
    "Personalized guidance every step of the way",
    "Commitment to transparency and education",
  ];

  return (
    <section id="about" className="py-20 bg-background" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Nationwide Equities?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Nationwide Equities, we understand that your home is more than just a property—it's
              your life's work and your family's legacy. That's why we're committed to helping you
              make the most of your home equity with confidence and clarity.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of experienced reverse mortgage specialists has helped thousands of homeowners
              unlock their home equity to enjoy a more comfortable retirement, pay for healthcare
              expenses, or simply have peace of mind knowing they have financial flexibility.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={seniorCoupleImage}
                alt="Happy senior couple enjoying retirement at home"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
