import React from 'react'

function About() {
    return (
        <div className='w-[100%] h-[100vh] flex flex-col justify-center mt-10'>
            <div className='container'>
                <div>
                    <div className="text-5xl font-bold text-gray-800 mt-8">
                        Know more <span className="text-blue-600">about</span><br />
                        <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent font-extrabold">Todo.</span>
                    </div>
                    <div className="text-3xl font-semibold text-gray-400 mb-8 mt-4">
                        A productivity tool built with<br /> simplicity and power in mind.
                    </div>
                    <p className="mt-10 text-gray-500 text-lg leading-relaxed max-w-3xl">
                        Todo is designed to help you stay organized and focused throughout your day.
                        Whether you're planning daily routines or managing big projects, Todo keeps your tasks
                        and notes in one beautifully simple interface. With intuitive controls and a minimalist design,
                        you’ll feel less overwhelmed and more in control.
                    </p>
                    <p className="mt-10 text-gray-500 text-lg leading-relaxed max-w-3xl">
                        Built for speed and accessibility, Todo works seamlessly across devices. From writing
                        quick notes to setting deadlines and priorities, every feature is made to enhance your workflow.
                        We believe productivity tools should adapt to your lifestyle — not the other way around.
                    </p>
                    <div className="mt-8">
                        <button className="rounded border-2 border-red-500 px-8 py-3 font-bold text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
                            Explore Features
                        </button>
                    </div>
                </div>

                {/** Optional future image or illustration */}
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default About
