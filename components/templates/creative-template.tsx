import type { ResumeData } from "@/lib/types"

interface CreativeTemplateProps {
  resumeData: ResumeData
}

export default function CreativeTemplate({ resumeData }: CreativeTemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData

  return (
    <div className="h-full min-h-[297mm] flex bg-white text-black" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div className="w-1/3 bg-[#8243ea] text-white p-6 flex flex-col" style={{ backgroundColor: "#8243ea" }}>
        <div className="mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold">{personalInfo.name.charAt(0)}</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{personalInfo.name}</h1>
          <p className="text-white text-opacity-90">{personalInfo.title}</p>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-bold border-b border-white border-opacity-30 pb-2 mb-4">Contact</h2>
          <div className="space-y-3 text-sm">
            {personalInfo.email && (
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-white text-opacity-80 break-all">{personalInfo.email}</div>
              </div>
            )}
            {personalInfo.phone && (
              <div>
                <div className="font-semibold">Phone</div>
                <div className="text-white text-opacity-80">{personalInfo.phone}</div>
              </div>
            )}
            {personalInfo.location && (
              <div>
                <div className="font-semibold">Location</div>
                <div className="text-white text-opacity-80">{personalInfo.location}</div>
              </div>
            )}
            {personalInfo.website && (
              <div>
                <div className="font-semibold">Website</div>
                <div className="text-white text-opacity-80 break-all">{personalInfo.website}</div>
              </div>
            )}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b border-white border-opacity-30 pb-2 mb-4">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white bg-opacity-10 rounded px-3 py-2 text-sm"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-auto text-center text-xs text-white text-opacity-50">
          Created with Skillyst Resume Builder
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 space-y-8">
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#8243ea] mb-4" style={{ color: "#8243ea" }}>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#8243ea] mb-6" style={{ color: "#8243ea" }}>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-6"
                  style={{
                    borderLeft: "3px solid #8243ea",
                    position: "relative",
                  }}
                >
                  <div
                    className="absolute left-0 top-2 h-3 w-3 rounded-full bg-[#8243ea]"
                    style={{
                      backgroundColor: "#8243ea",
                      left: "-7px",
                    }}
                  ></div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[#8243ea] font-medium mb-2" style={{ color: "#8243ea" }}>
                    {exp.company}, {exp.location}
                  </p>
                  {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[#8243ea] mb-6" style={{ color: "#8243ea" }}>
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="relative pl-6"
                  style={{
                    borderLeft: "3px solid #8243ea",
                    position: "relative",
                  }}
                >
                  <div
                    className="absolute left-0 top-2 h-3 w-3 rounded-full bg-[#8243ea]"
                    style={{
                      backgroundColor: "#8243ea",
                      left: "-7px",
                    }}
                  ></div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-[#8243ea] font-medium mb-2" style={{ color: "#8243ea" }}>
                    {edu.institution}, {edu.location}
                  </p>
                  {edu.description && <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
