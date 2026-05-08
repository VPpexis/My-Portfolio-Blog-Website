import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
 } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import metadata from '@/data/metadata.json';
import Link from 'next/link';

export function Projects() {
    return(
        <section id='project' className='py-20 px-6'>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 text-center antialiased">Featured Projects</h2>
                <div className="grid grid-cols1 mid:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metadata.projects.map((project, index) => (
                        <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map((tag, tagIndex) => (
                                    <Badge key={tagIndex}>{tag}</Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className='flex-grow'>
                            <CardDescription className='text-base'>
                                {project.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button variant='outline' className='w-full' asChild>
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    View Project
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}