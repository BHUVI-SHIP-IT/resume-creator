import type { ResumeData } from "@/lib/types"

interface ProfessionalTemplateProps {
  resumeData: ResumeData
}

export default function ProfessionalTemplate({ resumeData }: ProfessionalTemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData

  return (
    <div className="h-full min-h-[297mm] p-8 flex flex-col bg-white text-black" style={{ fontFamily: "Times, serif" }}>
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-2">{personalInfo.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{personalInfo.title}</p>

        <div className="flex justify-center gap-6 text-sm text-gray-600 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  {exp.company}, {exp.location}
                </p>
                {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  {edu.institution}, {edu.location}
                </p>
                {edu.description && <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-sm text-gray-700">
                • {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
