import { useRouter } from 'next/router';

export default function ProjectDetails() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-neon-cyan">Project {id}</h1>
            <p className="mt-4 text-white">Details about the project...</p>
        </div>
    );
}