'use client'

import { useState } from 'react'
import { Play, Download, FileText, Video, Calendar, TrendingUp } from 'lucide-react'

type AutomationTask = {
  id: string
  name: string
  description: string
  icon: any
  status: 'idle' | 'running' | 'completed' | 'error'
}

export default function Home() {
  const [tasks, setTasks] = useState<AutomationTask[]>([
    {
      id: 'metadata',
      name: 'Bulk Metadata Editor',
      description: 'Update titles, descriptions, and tags for multiple videos',
      icon: FileText,
      status: 'idle'
    },
    {
      id: 'thumbnail',
      name: 'Thumbnail Generator',
      description: 'Create custom thumbnails with templates',
      icon: Video,
      status: 'idle'
    },
    {
      id: 'scheduler',
      name: 'Upload Scheduler',
      description: 'Schedule video uploads for optimal times',
      icon: Calendar,
      status: 'idle'
    },
    {
      id: 'analytics',
      name: 'Analytics Reporter',
      description: 'Generate automated performance reports',
      icon: TrendingUp,
      status: 'idle'
    },
    {
      id: 'download',
      name: 'Video Downloader',
      description: 'Download videos for backup or editing',
      icon: Download,
      status: 'idle'
    }
  ])

  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [logs, setLogs] = useState<string[]>([])

  const handleRunTask = async (taskId: string) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, status: 'running' } : t
    ))
    setSelectedTask(taskId)
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting ${taskId} task...`])

    // Simulate automation task
    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Processing video URL: ${videoUrl || 'No URL provided'}`])
    }, 1000)

    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Task completed successfully!`])
      setTasks(prev => prev.map(t =>
        t.id === taskId ? { ...t, status: 'completed' } : t
      ))
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">
            YouTube Automation Suite
          </h1>
          <p className="text-xl text-gray-300">
            Streamline your YouTube workflow with powerful automation tools
          </p>
        </div>

        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <label className="block text-sm font-medium mb-2">Video URL (Optional)</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tasks.map((task) => {
            const Icon = task.icon
            return (
              <div
                key={task.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-600/20 rounded-lg">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{task.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                        <span className="text-xs text-gray-400 capitalize">{task.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{task.description}</p>
                <button
                  onClick={() => handleRunTask(task.id)}
                  disabled={task.status === 'running'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Play className="w-4 h-4" />
                  {task.status === 'running' ? 'Running...' : 'Run Task'}
                </button>
              </div>
            )
          })}
        </div>

        {logs.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Activity Log
            </h2>
            <div className="bg-black/30 rounded-lg p-4 font-mono text-sm max-h-64 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-green-400 mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-lg font-semibold mb-3">Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Bulk video management
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Automated scheduling
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Analytics tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Thumbnail creation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Metadata optimization
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Batch processing
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
