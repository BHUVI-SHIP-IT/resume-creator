"use client"

import { useState } from "react"
import type { ResumeData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface ResumeBuilderProps {
  resumeData: ResumeData
  onUpdateResumeData: (data: Partial<ResumeData>) => void
}

export default function ResumeBuilder({ resumeData, onUpdateResumeData }: ResumeBuilderProps) {
  const [activeSection, setActiveSection] = useState<string>("personal")

  const handlePersonalInfoChange = (field: string, value: string) => {
    onUpdateResumeData({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  const handleAddExperience = () => {
    onUpdateResumeData({
      experience: [
        ...resumeData.experience,
        {
          id: `exp-${Date.now()}`,
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    })
  }

  const handleUpdateExperience = (index: number, field: string, value: string | boolean) => {
    const updatedExperience = [...resumeData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }
    onUpdateResumeData({ experience: updatedExperience })
  }

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience]
    updatedExperience.splice(index, 1)
    onUpdateResumeData({ experience: updatedExperience })
  }

  const handleAddEducation = () => {
    onUpdateResumeData({
      education: [
        ...resumeData.education,
        {
          id: `edu-${Date.now()}`,
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const handleUpdateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    onUpdateResumeData({ education: updatedEducation })
  }

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...resumeData.education]
    updatedEducation.splice(index, 1)
    onUpdateResumeData({ education: updatedEducation })
  }

  const handleAddSkill = () => {
    onUpdateResumeData({
      skills: [...resumeData.skills, { id: `skill-${Date.now()}`, name: "", level: "Intermediate" }],
    })
  }

  const handleUpdateSkill = (index: number, field: string, value: string) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    }
    onUpdateResumeData({ skills: updatedSkills })
  }

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills.splice(index, 1)
    onUpdateResumeData({ skills: updatedSkills })
  }

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto gap-2 pb-2">
        <Button
          variant={activeSection === "personal" ? "default" : "outline"}
          onClick={() => setActiveSection("personal")}
          className={activeSection === "personal" ? "bg-[#8243ea] hover:bg-[#9a5dff]" : ""}
        >
          Personal Info
        </Button>
        <Button
          variant={activeSection === "experience" ? "default" : "outline"}
          onClick={() => setActiveSection("experience")}
          className={activeSection === "experience" ? "bg-[#8243ea] hover:bg-[#9a5dff]" : ""}
        >
          Experience
        </Button>
        <Button
          variant={activeSection === "education" ? "default" : "outline"}
          onClick={() => setActiveSection("education")}
          className={activeSection === "education" ? "bg-[#8243ea] hover:bg-[#9a5dff]" : ""}
        >
          Education
        </Button>
        <Button
          variant={activeSection === "skills" ? "default" : "outline"}
          onClick={() => setActiveSection("skills")}
          className={activeSection === "skills" ? "bg-[#8243ea] hover:bg-[#9a5dff]" : ""}
        >
          Skills
        </Button>
      </div>

      {activeSection === "personal" && (
        <Card className="bg-[#1f2416] border-[#333333]">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                  className="bg-[#0c070b] border-[#333333]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                  className="bg-[#0c070b] border-[#333333]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                  className="bg-[#0c070b] border-[#333333]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                  className="bg-[#0c070b] border-[#333333]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                  className="bg-[#0c070b] border-[#333333]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website/LinkedIn</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                  className="bg-[#0c070b] border-[#333333]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
                className="min-h-[100px] bg-[#0c070b] border-[#333333]"
                placeholder="Write a brief summary of your professional background and key achievements..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === "experience" && (
        <Card className="bg-[#1f2416] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Work Experience</CardTitle>
            <Button onClick={handleAddExperience} size="sm" className="bg-[#8243ea] hover:bg-[#9a5dff]">
              <Plus className="h-4 w-4 mr-1" /> Add Experience
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.experience.length === 0 && (
              <div className="text-center py-8 text-[#9aa2af]">
                <p className="text-lg mb-2">No work experience added yet</p>
                <p className="text-sm">Click the "Add Experience" button above to add your work history.</p>
              </div>
            )}

            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="border border-[#333333] rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Position {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                    <Input
                      id={`job-title-${index}`}
                      value={exp.title}
                      onChange={(e) => handleUpdateExperience(index, "title", e.target.value)}
                      className="bg-[#0c070b] border-[#333333]"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                      id={`company-${index}`}
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                      className="bg-[#0c070b] border-[#333333]"
                      placeholder="e.g. Tech Corp"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`exp-location-${index}`}>Location</Label>
                    <Input
                      id={`exp-location-${index}`}
                      value={exp.location}
                      onChange={(e) => handleUpdateExperience(index, "location", e.target.value)}
                      className="bg-[#0c070b] border-[#333333]"
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                      <Input
                        id={`start-date-${index}`}
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(index, "startDate", e.target.value)}
                        placeholder="01/2022"
                        className="bg-[#0c070b] border-[#333333]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${index}`}>End Date</Label>
                      <Input
                        id={`end-date-${index}`}
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(index, "endDate", e.target.value)}
                        placeholder="Present"
                        className="bg-[#0c070b] border-[#333333]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={exp.description}
                    onChange={(e) => handleUpdateExperience(index, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements in this role..."
                    className="min-h-[100px] bg-[#0c070b] border-[#333333]"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeSection === "education" && (
        <Card className="bg-[#1f2416] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education</CardTitle>
            <Button onClick={handleAddEducation} size="sm" className="bg-[#8243ea] hover:bg-[#9a5dff]">
              <Plus className="h-4 w-4 mr-1" /> Add Education
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.education.length === 0 && (
              <div className="text-center py-8 text-[#9aa2af]">
                <p className="text-lg mb-2">No education added yet</p>
                <p className="text-sm">Click the "Add Education" button above to add your educational background.</p>
              </div>
            )}

            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border border-[#333333] rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Education {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => handleUpdateEducation(index, "degree", e.target.value)}
                      className="bg-[#0c070b] border-[#333333]"
                      placeholder="e.g. Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                    <Input
                      id={`institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => handleUpdateEducation(index, "institution", e.target.value)}
                      className="bg-[#0c070b] border-[#333333]"
                      placeholder="e.g. University of California, Berkeley"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-location-${index}`}>Location</Label>
                    <Input
                      id={`edu-location-${index}`}
                      value={edu.location}
                      onChange={(e) => handleUpdateEducation(index, "location", e.target.value)}
                      className="bg-[#0c070b] border-[#333333]"
                      placeholder="e.g. Berkeley, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-start-date-${index}`}>Start Date</Label>
                      <Input
                        id={`edu-start-date-${index}`}
                        value={edu.startDate}
                        onChange={(e) => handleUpdateEducation(index, "startDate", e.target.value)}
                        placeholder="08/2016"
                        className="bg-[#0c070b] border-[#333333]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edu-end-date-${index}`}>End Date</Label>
                      <Input
                        id={`edu-end-date-${index}`}
                        value={edu.endDate}
                        onChange={(e) => handleUpdateEducation(index, "endDate", e.target.value)}
                        placeholder="05/2020"
                        className="bg-[#0c070b] border-[#333333]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`edu-description-${index}`}>Description (Optional)</Label>
                  <Textarea
                    id={`edu-description-${index}`}
                    value={edu.description}
                    onChange={(e) => handleUpdateEducation(index, "description", e.target.value)}
                    placeholder="Describe your studies, achievements, relevant coursework, etc."
                    className="min-h-[100px] bg-[#0c070b] border-[#333333]"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeSection === "skills" && (
        <Card className="bg-[#1f2416] border-[#333333]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <Button onClick={handleAddSkill} size="sm" className="bg-[#8243ea] hover:bg-[#9a5dff]">
              <Plus className="h-4 w-4 mr-1" /> Add Skill
            </Button>
          </CardHeader>
          <CardContent>
            {resumeData.skills.length === 0 && (
              <div className="text-center py-8 text-[#9aa2af]">
                <p className="text-lg mb-2">No skills added yet</p>
                <p className="text-sm">Click the "Add Skill" button above to add your skills.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <Input
                    value={skill.name}
                    onChange={(e) => handleUpdateSkill(index, "name", e.target.value)}
                    placeholder="e.g. JavaScript, React, Python"
                    className="bg-[#0c070b] border-[#333333]"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
