// "use client"
// export default function HeroVideo (){
//     return <div className="flex justify-center pt-10">
//         <video className="max-w-4xl"  controls={false} muted autoPlay
//         src="https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745864783/aiworkflowshomepage.mp4" />
//     </div>
// }


"use client"
import { useState, useEffect } from "react"

interface FlowNode {
  name: string
  icon: string
  color: string
}

interface Flow {
  trigger: FlowNode
  action: FlowNode
  description: string
}

interface Packet {
  id: number
  progress: number
  opacity: number
}

export default function HeroVideo() {
  const [activeFlow, setActiveFlow] = useState<number>(0)
  const [dataPackets, setDataPackets] = useState<Packet[]>([])
  const [glowPulse, setGlowPulse] = useState<number>(0)

  const flows: Flow[] = [
    {
      trigger: { name: "Gmail", icon: "📧", color: "#EA4335" },
      action: { name: "Slack", icon: "💬", color: "#4A154B" },
      description: "New email instantly alerts your team"
    },
    {
      trigger: { name: "Shopify", icon: "🛒", color: "#96BF48" },
      action: { name: "Sheet", icon: "📊", color: "#0F9D58" },
      description: "Orders automatically logged to spreadsheet"
    },
    {
      trigger: { name: "Form", icon: "📝", color: "#FF6B6B" },
      action: { name: "CRM", icon: "👥", color: "#6366F1" },
      description: "Leads instantly added to your pipeline"
    }
  ]

  useEffect(() => {
    const flowInterval = setInterval(() => {
      setActiveFlow(prev => (prev + 1) % flows.length)
    }, 4000)

    const packetInterval = setInterval(() => {
      const newPacket: Packet = {
        id: Math.random(),
        progress: 0,
        opacity: 1
      }
      setDataPackets(prev => [...prev, newPacket])
    }, 800)

    const glowInterval = setInterval(() => {
      setGlowPulse(prev => (prev + 0.1) % (Math.PI * 2))
    }, 50)

    return () => {
      clearInterval(flowInterval)
      clearInterval(packetInterval)
      clearInterval(glowInterval)
    }
  }, [])

  useEffect(() => {
    const animatePackets = setInterval(() => {
      setDataPackets(prev =>
        prev
          .map(packet => ({
            ...packet,
            progress: packet.progress + 2,
            opacity: packet.progress > 90 ? Math.max(0, packet.opacity - 0.1) : packet.opacity
          }))
          .filter(packet => packet.progress < 110)
      )
    }, 50)

    return () => clearInterval(animatePackets)
  }, [])

  const currentFlow = flows[activeFlow]

  return (
    <div className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Watch Automation in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See how data flows seamlessly between your favorite apps
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -translate-x-1/2 -translate-y-1/2 rounded-full">
            {dataPackets.map(packet => (
              <div
                key={packet.id}
                className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2"
                style={{
                  left: `${packet.progress}%`,
                  opacity: packet.opacity,
                  boxShadow: `0 0 ${8 + Math.sin(glowPulse) * 4}px rgba(255,255,255,0.8)`
                }}
              />
            ))}

            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
          </div>

          <div className="flex items-center justify-between relative z-10">
            {/* Trigger */}
            <div className="text-center">
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-2xl transform transition-all duration-1000 hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: currentFlow.trigger.color,
                  boxShadow: `0 0 ${30 + Math.sin(glowPulse) * 15}px ${currentFlow.trigger.color}80`
                }}
              >
                {currentFlow.trigger.icon}
              </div>
              <h3 className="text-gray-800 text-xl font-bold mt-4">{currentFlow.trigger.name}</h3>
              <div className="text-purple-600 text-sm bg-purple-100 px-3 py-1 rounded-full mt-2 border border-purple-300">
                TRIGGER
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <div className="text-white text-2xl animate-spin">⚡</div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-700 text-xs font-semibold bg-gray-200 px-2 py-1 rounded-full border border-gray-300">
                PROCESSING
              </div>
            </div>

            <div className="text-center">
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-2xl transform transition-all duration-1000 hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: currentFlow.action.color,
                  boxShadow: `0 0 ${30 + Math.sin(glowPulse + Math.PI) * 15}px ${currentFlow.action.color}80`
                }}
              >
                {currentFlow.action.icon}
              </div>
              <h3 className="text-gray-800 text-xl font-bold mt-4">{currentFlow.action.name}</h3>
              <div className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full mt-2 border border-green-300">
                ACTION
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-200 inline-block shadow-lg">
            <p className="text-gray-700 text-lg font-medium">{currentFlow.description}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {flows.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFlow(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === activeFlow ? "bg-purple-500 shadow-lg w-8" : "bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
