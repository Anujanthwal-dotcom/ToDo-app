import React from 'react'
import { GiWhiteBook } from 'react-icons/gi';

function Footer() {
    return (
        <footer className=' bg-gradient-to-b from-white to-orange-100 px-4 py-8 flex flex-col items-center'>
            <hr className='w-[80%] border-gray-300' />
        
            <div className='container mt-20 w-full px-4 flex flex-row justify-between'>
                <div className='flex flex-col justify-center'>
                    <div className='flex items-center mb-8'>
                        <GiWhiteBook className='text-3xl text-black' />
                        <span className='text-black font-bold text-3xl ml-2'>TODO</span>
                    </div>
                    <div className="text-xl font-semibold text-black mb-8">
                        A simple and elegant way to manage<br /> your tasks and notes.
                    </div>
                </div>

                {/* New Footer Links Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-12 text-black text-sm font-medium">
                    <div>
                        <h4 className="font-bold mb-3">Features</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-orange-500 cursor-pointer transition">How It Works</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">For Teams</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Pricing</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Templates</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Resources</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-orange-500 cursor-pointer transition">Download Apps</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Help Center</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Productivity Methods</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Integrations</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Channel Partners</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Developer API</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Status</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Company</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-orange-500 cursor-pointer transition">About Us</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Careers</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">We’re hiring!</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Inspiration Hub</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Press</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Twist</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li className="hover:text-orange-500 cursor-pointer transition">Security</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Privacy</li>
                            <li className="hover:text-orange-500 cursor-pointer transition">Terms</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer