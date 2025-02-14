import {Layout} from "@/components/shared/Layout";
import {ExperienceCard} from "@/components/shared/ExperienceCard";

export default function MarsPage() {
    return (
        <Layout
            color="#E27B58"
            title="Professional Experience"
            description="My career path and achievements"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
                    {/*{experiences.map((experience, index) => (*/}
                    {/*    <ExperienceCard key={index} experience={experience} />*/}
                    {/*))}*/}
                </section>
            </div>
        </Layout>
    );
}
