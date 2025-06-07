"use client"

import type { Template } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState } from "react"

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<Template | null>(null)

  const templates: { id: Template; name: string; description: string }[] = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design with a focus on readability",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional layout perfect for corporate environments",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design for creative industries and roles",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant design with focus on content",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[#8243ea] via-[#9a5dff] to-[#8746eb] bg-clip-text text-transparent">
            Skillyst Resume Builder
          </span>
        </h1>
        <p className="text-[#9aa2af] max-w-2xl mx-auto">
          Create a professional resume in minutes with our easy-to-use builder. Choose from multiple templates and
          customize your resume to stand out from the crowd.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-[#9aa2af]">Select a template to start building your resume</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`bg-[#1f2416] border-2 transition-all cursor-pointer ${
              hoveredTemplate === template.id ? "border-[#8243ea]" : "border-[#333333]"
            }`}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-0">
              <div className="aspect-[8.5/11] bg-[#0c070b] relative">
                {/* Template preview image */}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    template.id === "modern"
                      ? "bg-gradient-to-br from-[#8243ea]/20 to-[#9a5dff]/20"
                      : template.id === "professional"
                        ? "bg-gradient-to-br from-[#21ee43]/20 to-[#00d4aa]/20"
                        : template.id === "creative"
                          ? "bg-gradient-to-br from-[#ff6b35]/20 to-[#f7931e]/20"
                          : "bg-gradient-to-br from-[#ffffff]/10 to-[#9aa2af]/10"
                  }`}
                >
                  {/* Template preview mockup */}
                  <div className="w-3/4 h-4/5 bg-white/10 rounded flex flex-col p-2">
                    <div className="h-1/6 border-b border-white/20 flex items-center justify-center">
                      <div className="w-1/2 h-2 bg-white/30 rounded"></div>
                    </div>
                    <div className="flex flex-1">
                      {template.id === "modern" && (
                        <>
                          <div className="w-2/3 p-2 space-y-2">
                            <div className="h-2 bg-white/30 rounded w-full"></div>
                            <div className="h-2 bg-white/30 rounded w-3/4"></div>
                            <div className="h-2 bg-white/30 rounded w-5/6"></div>
                            <div className="h-2 bg-white/30 rounded w-full"></div>
                          </div>
                          <div className="w-1/3 bg-white/5 p-2">
                            <div className="h-2 bg-white/30 rounded w-full mb-2"></div>
                            <div className="h-2 bg-white/30 rounded w-3/4"></div>
                          </div>
                        </>
                      )}

                      {template.id === "professional" && (
                        <>
                          <div className="w-full p-2 space-y-4">
                            <div className="h-3 bg-white/30 rounded w-1/2 mx-auto"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-3/4"></div>
                            </div>
                            <div className="h-3 bg-white/30 rounded w-1/3"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-5/6"></div>
                            </div>
                          </div>
                        </>
                      )}

                      {template.id === "creative" && (
                        <>
                          <div className="w-1/3 bg-white/10 p-2">
                            <div className="h-8 w-8 rounded-full bg-white/30 mb-4 mx-auto"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-3/4"></div>
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                            </div>
                          </div>
                          <div className="w-2/3 p-2 space-y-3">
                            <div className="h-3 bg-white/30 rounded w-1/2"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-5/6"></div>
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                            </div>
                          </div>
                        </>
                      )}

                      {template.id === "minimal" && (
                        <>
                          <div className="w-full p-2 space-y-4">
                            <div className="h-3 bg-white/30 rounded w-1/3 mx-auto"></div>
                            <div className="h-px bg-white/20 w-1/4 mx-auto"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-3/4"></div>
                            </div>
                            <div className="h-px bg-white/20 w-full"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-white/30 rounded w-1/4"></div>
                              <div className="h-2 bg-white/30 rounded w-full"></div>
                              <div className="h-2 bg-white/30 rounded w-5/6"></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                {hoveredTemplate === template.id && (
                  <div className="absolute inset-0 bg-[#8243ea]/70 flex items-center justify-center">
                    <Button className="bg-white text-[#333333] hover:bg-[#f5f5f9]">
                      <Check className="mr-2 h-4 w-4" /> Select
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold mb-1">{template.name}</h3>
                <p className="text-sm text-[#9aa2af]">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
