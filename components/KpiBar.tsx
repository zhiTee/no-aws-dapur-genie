export default function KpiBar() {
  const kpis = [
    { label: "Customers Served", value: "1,247", change: "+12%" },
    { label: "Avg Response Time", value: "0.8s", change: "-23%" },
    { label: "Languages", value: "3", change: "BM/EN/中文" }
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {kpis.map(({ label, value, change }) => (
        <div key={label} className="text-center">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-black/60">{label}</p>
          <p className="text-xs text-green-600 font-medium">{change}</p>
        </div>
      ))}
    </div>
  )
}