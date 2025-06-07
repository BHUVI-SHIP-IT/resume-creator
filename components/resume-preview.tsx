"use client"

import type { ResumeData, Template } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import ModernTemplate from "@/components/templates/modern-template"
import ProfessionalTemplate from "@/components/templates/professional-template"
import CreativeTemplate from "@/components/templates/creative-template"
import MinimalTemplate from "@/components/templates/minimal-template"
import { useToast } from "@/components/ui/use-toast"

interface ResumePreviewProps {
  resumeData: ResumeData
  template: Template
  showDownloadButton?: boolean
}

export default function ResumePreview({ resumeData, template, showDownloadButton = false }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return

    try {
      setIsGenerating(true)
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your resume...",
      })

      // Create a high-quality canvas from the resume element
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: resumeRef.current.scrollWidth,
        height: resumeRef.current.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all styles are properly applied in the cloned document
          const clonedElement = clonedDoc.querySelector("[data-resume-content]") as HTMLElement
          if (clonedElement) {
            clonedElement.style.transform = "none"
            clonedElement.style.width = "210mm" // A4 width
            clonedElement.style.minHeight = "297mm" // A4 height
          }
        },
      })

      // Calculate PDF dimensions (A4 size)
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > pageHeight ? "portrait" : "portrait",
        unit: "mm",
        format: "a4",
      })

      // If content is longer than one page, we might need multiple pages
      let heightLeft = imgHeight
      let position = 0

      // Add the first page
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Generate filename
      const fileName = resumeData.personalInfo.name
        ? `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_resume.pdf`
        : "resume.pdf"

      pdf.save(fileName)

      toast({
        title: "Success!",
        description: "Your resume has been downloaded successfully.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} />
      case "professional":
        return <ProfessionalTemplate resumeData={resumeData} />
      case "creative":
        return <CreativeTemplate resumeData={resumeData} />
      case "minimal":
        return <MinimalTemplate resumeData={resumeData} />
      default:
        return <ModernTemplate resumeData={resumeData} />
    }
  }

  return (
    <div className="space-y-4">
      {showDownloadButton && (
        <div className="flex justify-end">
          <Button onClick={downloadAsPDF} className="bg-[#8243ea] hover:bg-[#9a5dff]" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </>
            )}
          </Button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          ref={resumeRef}
          className="w-full bg-white text-black print:shadow-none"
          data-resume-content
          style={{
            width: "210mm",
            minHeight: "297mm",
            margin: "0 auto",
            backgroundColor: "white",
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}
