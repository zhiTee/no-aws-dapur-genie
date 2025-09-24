export default function Features(){
  return (
    <main className="container py-16">
      <h1 className="text-3xl font-bold">Features</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {[
          ["Instant FAQs","Hours, menu, prices, allergens, halal status, delivery partners, payment methods, parking."],
          ["Smart upsell","Locality-aware value sets vs chef specials; DOSM cost-of-living tone presets."],
          ["Reservations & queue","Quick handoff to Google Form/Calendly; simple queue ETA widget."],
          ["Analytics","Deflection rate, first response time, after-hours usage, top unanswered questions."],
          ["Owner sheet onboarding","CSV/JSON seed pack in S3 → DynamoDB ingestion."],
          ["Security","Cognito auth for merchants, WAF, KMS encryption, least-privilege IAM."]
        ].map(([t, d])=> (
          <div key={t as string} className="card p-6">
            <p className="font-semibold">{t}</p>
            <p className="text-black/70 mt-1">{d}</p>
          </div>
        ))}
      </div>
    </main>
  );
}