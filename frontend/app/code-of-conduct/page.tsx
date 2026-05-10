import type React from "react"
import Link from "next/link"
import ContentSection from "@/components/content-section"

export default function CodeOfConductPage() {
  return (
    <main className="relative z-10">
      {/* Navigation */}
      <div className="max-w-[820px] mx-auto px-4 pt-8 md:pt-16">
        <Link href="/" className="font-share-tech text-brand-yellow underline hover:no-underline">
          ← Back to Home
        </Link>
      </div>
      
      {/* Content Sections */}
      <div className="max-w-[820px] mx-auto px-4 py-8 md:py-16 space-y-16 md:space-y-32">
        <ContentSection 
          title="CODE OF CONDUCT"
          content="We are committed to creating a harassment-free conference experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, or technology choices."
        />

        <ContentSection 
          title="OUR PLEDGE"
          content={[
            "We pledge to make participation in our conference and community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.",
            "We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community."
          ]}
        />

        <ContentSection 
          title="OUR STANDARDS"
          content={[
            "Examples of behavior that contributes to a positive environment for our community include:",
            "• Demonstrating empathy and kindness toward other people\n• Being respectful of differing opinions, viewpoints, and experiences\n• Giving and gracefully accepting constructive feedback\n• Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience\n• Focusing on what is best not just for us as individuals, but for the overall community",
            "Examples of unacceptable behavior include:",
            "• The use of sexualized language or imagery, and sexual attention or advances of any kind\n• Trolling, insulting or derogatory comments, and personal or political attacks\n• Public or private harassment\n• Publishing others' private information, such as a physical or email address, without their explicit permission\n• Other conduct which could reasonably be considered inappropriate in a professional setting"
          ]}
        />

        <ContentSection 
          title="ENFORCEMENT"
          content={[
            "Conference organizers will enforce these guidelines throughout the event. Conference organizers have the right and responsibility to remove, edit, or reject any content that is not aligned with this Code of Conduct.",
            "Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the conference organizers responsible for enforcement. All complaints will be reviewed and investigated promptly and fairly.",
            "All conference organizers are obligated to respect the privacy and security of the reporter of any incident."
          ]}
        />

        <ContentSection 
          title="CONSEQUENCES"
          content={[
            "Conference organizers will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:",
            "**1. Correction** - A private, written warning from conference organizers, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate.",
            "**2. Warning** - A warning with consequences for continued behavior. No interaction with the people involved for a specified period of time.",
            "**3. Temporary Ban** - A temporary ban from any sort of interaction or public communication with the community for a specified period of time.",
            "**4. Permanent Ban** - A permanent ban from any sort of public interaction within the conference community."
          ]}
        />

        <ContentSection 
          title="REPORTING"
          content={[
            "If you experience or witness unacceptable behavior, or have any other concerns about someone's conduct, please report it by contacting the conference organizers.",
            "When taking a personal report, conference organizers will ensure you are safe and cannot be overheard. We may involve other event staff to ensure your report is managed properly.",
            "All reports will be handled with discretion and confidentiality."
          ]}
        />

        <ContentSection 
          title="ATTRIBUTION"
          content="This Code of Conduct is adapted from the Contributor Covenant, version 2.0, available at https://www.contributor-covenant.org/version/2/0/code_of_conduct.html and the Umbraco Community Code of Conduct."
        />
      </div>
    </main>
  )
}