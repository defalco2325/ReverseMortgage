import Step1Form from '../Step1Form';

export default function Step1FormExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Step1Form
        onNext={(data) => console.log('Step 1 submitted:', data)}
        initialData={{
          homeValue: 450000,
          applicantAge: 68,
          existingBalance: 125000,
          spouseAge: 65,
        }}
      />
    </div>
  );
}
