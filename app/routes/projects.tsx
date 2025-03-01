const projectItems = [
    {
        id: 1,
        name: "Project 1",
        url: "https://github.com",
        description: "This is project 1 description, and it is very long. What do you think?",
    }, {
        id: 1,
        name: "Project 2",
        url: "https://github.com",
        description: "This is project 2 description, and it is very long. What do you think?",
    }, {
        id: 1,
        name: "Project 3",
        url: "https://github.com",
        description: "This is project 3 description, and it is very long. What do you think?",
    },
]

export default function Projects() {
    return (
        <div className="p-3">
            <div className="flex flex-row gap-4">
                {projectItems.map((item) => (
                    <div className="dark:hover:bg-zinc-800 flex flex-col p-3 rounded-md bg-zinc-100 dark:bg-zinc-900" key={item.id}>
                        <h1 className="text-lg font-semibold">{item.name}</h1>
                        <p className="text-xs">{item.description}</p>
                    </div>
                ))}
                <div>

                </div>
            </div>
        </div>
    );
}