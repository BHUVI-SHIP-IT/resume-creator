"use client"

import { useState } from "react"
import ResumeBuilder from "@/components/resume-builder"
import ResumePreview from "@/components/resume-preview"
import TemplateSelector from "@/components/template-selector"
import type { ResumeData, Template } from "@/lib/types"
import { defaultResumeData } from "@/lib/default-data"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("modern")
  const [step, setStep] = useState<"template" | "edit" | "preview">("template")

  const handleUpdateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }))
  }

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setStep("edit")
  }

  const handlePreview = () => {
    setStep("preview")
  }

  const handleBackToEdit = () => {
    setStep("edit")
  }

  return (
    <div className="min-h-screen bg-[#0b021c] text-white">
      <header className="border-b border-[#333333] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <span className="font-bold text-xl bg-gradient-to-r from-[#8243ea] to-[#9a5dff] bg-clip-text text-transparent">
            Skillyst Resume Builder
          </span>
          {step === "edit" && (
            <Button onClick={handlePreview} className="bg-[#8243ea] hover:bg-[#9a5dff]">
              Preview Resume
            </Button>
          )}
          {step === "preview" && (
            <Button onClick={handleBackToEdit} variant="outline" className="border-[#8243ea] text-[#8243ea]">
              Back to Editor
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {step === "template" && <TemplateSelector onSelectTemplate={handleSelectTemplate} />}

        {step === "edit" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResumeBuilder resumeData={resumeData} onUpdateResumeData={handleUpdateResumeData} />
            <div className="hidden lg:block">
              <ResumePreview resumeData={resumeData} template={selectedTemplate} />
            </div>
          </div>
        )}

        {step === "preview" && (
          <ResumePreview resumeData={resumeData} template={selectedTemplate} showDownloadButton={true} />
        )}

        {/* AuthPage component can be conditionally rendered here if needed */}
      </main>
    </div>
  )
}
