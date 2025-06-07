import type { ResumeData } from "@/lib/types"

interface MinimalTemplateProps {
  resumeData: ResumeData
}

export default function MinimalTemplate({ resumeData }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData

  return (
    <div className="h-full min-h-[297mm] p-12 space-y-8 bg-white text-black" style={{ fontFamily: "Georgia, serif" }}>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-light tracking-wide text-gray-900 mb-4">{personalInfo.name}</h1>
        <div className="w-16 h-px bg-gray-400 mx-auto my-6"></div>
        <p className="text-xl text-gray-600 mb-6">{personalInfo.title}</p>

        <div className="flex justify-center gap-8 text-sm text-gray-500 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-12">
          <p className="text-center text-gray-700 leading-relaxed max-w-3xl mx-auto text-base">
            {personalInfo.summary}
          </p>
        </section>
      )}

      <div className="w-full h-px bg-gray-300 my-10"></div>

      {experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider uppercase text-center mb-8 text-gray-900">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{exp.title}</h3>
                <p className="text-gray-600 mb-2">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {exp.startDate} - {exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="w-full h-px bg-gray-300 my-10"></div>

      {education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider uppercase text-center mb-8 text-gray-900">Education</h2>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{edu.degree}</h3>
                <p className="text-gray-600 mb-2">
                  {edu.institution} • {edu.location}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && (
                  <p className="text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="w-full h-px bg-gray-300 my-10"></div>

      {skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-light tracking-wider uppercase text-center mb-8 text-gray-900">Skills</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skill) => (
              <span key={skill.id} className="text-sm text-gray-700 border-b border-gray-300 pb-1">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
