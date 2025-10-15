import Step2Form from '../Step2Form';

export default function Step2FormExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Step2Form
        onNext={(data) => console.log('Step 2 submitted:', data)}
        onBack={() => console.log('Back clicked')}
        initialData={{
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '5551234567',
        }}
      />
    </div>
  );
}
