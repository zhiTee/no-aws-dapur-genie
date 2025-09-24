'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Load Chart.js
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
    script.onload = () => {
      initCharts()
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const initCharts = () => {
    const demoData = {
      dailyChats: [34,41,28,39,45,52,48,36,31,44,58,61,55,49,47,53,57,62,59,51,45,42,38,41,46,50,63,60,58,66],
      languageMix: [
        { lang: "BM", pct: 41 },
        { lang: "English", pct: 48 },
        { lang: "中文", pct: 11 }
      ]
    }

    // Daily Chats Chart
    const dailyCtx = document.getElementById('dailyChatsChart') as HTMLCanvasElement
    if (dailyCtx && window.Chart) {
      new window.Chart(dailyCtx, {
        type: 'line',
        data: {
          labels: Array.from({length: 30}, (_, i) => i + 1),
          datasets: [{
            label: 'Daily Chats',
            data: demoData.dailyChats,
            borderWidth: 2,
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }

    // Language Chart
    const langCtx = document.getElementById('languageChart') as HTMLCanvasElement
    if (langCtx && window.Chart) {
      new window.Chart(langCtx, {
        type: 'doughnut',
        data: {
          labels: demoData.languageMix.map(item => item.lang),
          datasets: [{
            data: demoData.languageMix.map(item => item.pct)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf5eaff' }}>
      {/* Header */}
      <div className="shadow-sm border-b" style={{ backgroundColor: '#faf5eaff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" style={{ backgroundColor: '#faf5eaff' }}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Top Questions</h1>
              <p className="text-sm text-gray-500">Demo data • F&B (MY)</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                Last 30 days
              </span>
              <button 
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Customers Approached</h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">1,247</p>
              <span className="ml-2 text-sm font-medium text-green-600">+12%</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Potential Revenue</h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">RM 18.7K</p>
              <span className="ml-2 text-sm font-medium text-green-600">+15%</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Peak Hours</h3>
            <p className="text-3xl font-bold text-gray-900">7-9 PM</p>
          </div>
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Chats Trend */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Chat Volume</h3>
            <div className="h-64">
              <canvas id="dailyChatsChart"></canvas>
            </div>
          </div>

          {/* Language Mix */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Language Distribution</h3>
            <div className="h-64">
              <canvas id="languageChart"></canvas>
            </div>
          </div>

          {/* Keyword of the Week */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Keyword of the Week</h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">pet-friendly</p>
              <p className="text-2xl text-gray-600 mb-4">184 mentions</p>
              <p className="text-sm text-gray-500">
                Spike enquiries about bringing pets after recent policy update.
              </p>
            </div>
          </div>

          {/* Top Questions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Top Questions</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">pet-friendly</span>
                <span className="text-sm font-medium">184</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">delivery</span>
                <span className="text-sm font-medium">152</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">halal</span>
                <span className="text-sm font-medium">129</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">vegan options</span>
                <span className="text-sm font-medium">103</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">opening hours</span>
                <span className="text-sm font-medium">96</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Queries */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Queries</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-500">Time</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-500">Query</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-500">Intent</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-sm text-gray-600">2025-09-18 19:42</td>
                  <td className="py-2 text-sm">Can we bring small dogs?</td>
                  <td className="py-2 text-sm">Pet-friendly</td>
                  <td className="py-2 text-sm text-blue-600">Show policy</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-sm text-gray-600">2025-09-18 18:10</td>
                  <td className="py-2 text-sm">Do you have delivery to KLCC?</td>
                  <td className="py-2 text-sm">Delivery</td>
                  <td className="py-2 text-sm text-blue-600">Suggest pickup + signup</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-sm text-gray-600">2025-09-18 13:22</td>
                  <td className="py-2 text-sm">Halal certified?</td>
                  <td className="py-2 text-sm">Halal</td>
                  <td className="py-2 text-sm text-blue-600">Show certificate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-sm text-gray-600">2025-09-17 20:17</td>
                  <td className="py-2 text-sm">Any vegan mains?</td>
                  <td className="py-2 text-sm">Vegan</td>
                  <td className="py-2 text-sm text-blue-600">Highlight menu</td>
                </tr>
                <tr>
                  <td className="py-2 text-sm text-gray-600">2025-09-17 12:03</td>
                  <td className="py-2 text-sm">Where to park?</td>
                  <td className="py-2 text-sm">Parking</td>
                  <td className="py-2 text-sm text-blue-600">Show parking map</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    Chart: {
      new (ctx: HTMLCanvasElement, config: unknown): unknown;
    };
  }
}