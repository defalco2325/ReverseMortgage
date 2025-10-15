import Step3Results from '../Step3Results';

export default function Step3ResultsExample() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-12">
      <div>
        <h2 className="text-xl font-bold mb-4">No Match Outcome</h2>
        <Step3Results
          outcome="no-match"
          data={{ effectiveAge: 52 }}
          onRestart={() => console.log('Restart clicked')}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Private Lending Outcome (Ages 55-61)</h2>
        <Step3Results
          outcome="private"
          data={{
            effectiveAge: 58,
            homeValue: 450000,
            existingBalance: 125000,
            principalLimit: 103500,
            netProceeds: 0,
            plf: 0.23,
          }}
          onRestart={() => console.log('Restart clicked')}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Successful Estimate (Ages 62+)</h2>
        <Step3Results
          outcome="estimate"
          data={{
            effectiveAge: 68,
            homeValue: 550000,
            existingBalance: 180000,
            principalLimit: 214500,
            netProceeds: 34500,
            plf: 0.39,
          }}
          onRestart={() => console.log('Restart clicked')}
        />
      </div>
    </div>
  );
}
