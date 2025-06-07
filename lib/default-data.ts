import type { ResumeData } from "./types"

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "linkedin.com/in/johndoe",
    summary:
      "Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating efficient, scalable solutions and working with cutting-edge technologies.",
  },
  experience: [
    {
      id: "exp-1",
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "01/2022",
      endDate: "Present",
      current: true,
      description:
        "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews.",
    },
    {
      id: "exp-2",
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      startDate: "06/2020",
      endDate: "12/2021",
      current: false,
      description:
        "Developed full-stack web applications using React and Node.js. Collaborated with design team to implement responsive user interfaces. Optimized database queries improving performance by 40%.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "08/2016",
      endDate: "05/2020",
      description:
        "Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems.",
    },
  ],
  skills: [
    { id: "skill-1", name: "JavaScript", level: "Expert" },
    { id: "skill-2", name: "React", level: "Expert" },
    { id: "skill-3", name: "Node.js", level: "Advanced" },
    { id: "skill-4", name: "Python", level: "Advanced" },
    { id: "skill-5", name: "SQL", level: "Advanced" },
    { id: "skill-6", name: "AWS", level: "Intermediate" },
    { id: "skill-7", name: "Docker", level: "Intermediate" },
    { id: "skill-8", name: "Git", level: "Expert" },
  ],
}
