import type { ResumeData } from "@/lib/types"

interface ModernTemplateProps {
  resumeData: ResumeData
}

export default function ModernTemplate({ resumeData }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData

  return (
    <div className="flex h-full min-h-[297mm] bg-white text-black" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Main Content */}
      <div className="w-2/3 p-8 space-y-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#8243ea] mb-2" style={{ color: "#8243ea" }}>
            {personalInfo.name}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{personalInfo.title}</p>
          {personalInfo.summary && <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>}
        </header>

        {experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-2xl font-bold text-[#8243ea] border-b-2 border-[#8243ea] pb-2 mb-6"
              style={{ color: "#8243ea", borderColor: "#8243ea" }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-gray-700 font-medium mb-2">
                    {exp.company}, {exp.location}
                  </div>
                  {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2
              className="text-2xl font-bold text-[#8243ea] border-b-2 border-[#8243ea] pb-2 mb-6"
              style={{ color: "#8243ea", borderColor: "#8243ea" }}
            >
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-gray-700 font-medium mb-2">
                    {edu.institution}, {edu.location}
                  </div>
                  {edu.description && <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-1/3 bg-gray-50 p-6 space-y-8" style={{ backgroundColor: "#f9fafb" }}>
        <section>
          <h2
            className="text-xl font-bold text-[#8243ea] border-b-2 border-[#8243ea] pb-2 mb-6"
            style={{ color: "#8243ea", borderColor: "#8243ea" }}
          >
            Contact
          </h2>
          <div className="space-y-4 text-sm">
            {personalInfo.email && (
              <div>
                <div className="font-semibold text-gray-900 mb-1">Email</div>
                <div className="text-gray-700">{personalInfo.email}</div>
              </div>
            )}
            {personalInfo.phone && (
              <div>
                <div className="font-semibold text-gray-900 mb-1">Phone</div>
                <div className="text-gray-700">{personalInfo.phone}</div>
              </div>
            )}
            {personalInfo.location && (
              <div>
                <div className="font-semibold text-gray-900 mb-1">Location</div>
                <div className="text-gray-700">{personalInfo.location}</div>
              </div>
            )}
            {personalInfo.website && (
              <div>
                <div className="font-semibold text-gray-900 mb-1">Website</div>
                <div className="text-gray-700 break-all">{personalInfo.website}</div>
              </div>
            )}
          </div>
        </section>

        {skills.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold text-[#8243ea] border-b-2 border-[#8243ea] pb-2 mb-6"
              style={{ color: "#8243ea", borderColor: "#8243ea" }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-[#8243ea] text-white px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "#8243ea", color: "white" }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
